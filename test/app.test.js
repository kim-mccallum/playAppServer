const supertest = require('supertest'); //what does supertest do exactly? 
const app = require('../app');
const { expect } = require('chai');

describe('GET /playstore-apps', () => {

    it('it sorts correctly when sort by Rating is supplied', () => {
        return supertest(app)
            .get('/playstore-apps')
            .query({sort:'Rating'})
            .expect(200)
            .expect('Content-Type', /json/).then(res=> {
                expect(res.body).to.be.an('array');
                expect(res.body).to.have.lengthOf.at.least(1);
                //sorted correctly - take res and check to see that previous rating < next rating 
                let sorted = true;
                let i = 0;
                while (i < res.body.length -1){
                    const appAtI = res.body[i];
                    const appAtIPlus1 = res.body[i + 1];
                    if (appAtI.Rating < appAtIPlus1.Rating ){
                        sorted = false;
                        break;
                    }
                    i++;
                } 
                console.log(sorted)
                expect(sorted).to.be.true;      
            })
    })
    it.only('filters correctly when given genre = Action', () => {
        return supertest(app)
            .get('/playstore-apps')
            .query({genre:'Action'})
            .expect(200)
            .expect('Content-Type', /json/).then(res => {
                expect(res.body).to.be.an('array');
                // loop over the array, get the genres, make them into a list and make sure 'Action' is in there
                let filtered = true;
                let i = 0;
                while (i < res.body.length){
                    const appGenres = res.body[i].Genres
                    console.log(appGenres);
                    if(!appGenres.includes('Action')){
                        filtered = false;
                        break;
                    }
                    i++;
                }
                console.log(filtered)
                expect(filtered).to.be.true;
            })

    })

    it('returns 400 if request params are incorrect', () => {

    })
})