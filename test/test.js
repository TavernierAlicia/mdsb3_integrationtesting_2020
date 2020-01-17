const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../index')
const should = chai.should()
const expect = chai.expect

chai.use(chaiHttp)

// ---> DEBUT
/**
  * Génération des nouvelles couleurs et enregistrement de ces
  * couleurs dans un tableau.
  */
const newValues = []
const colorKey = 'NEW_COLOR_'
let nextCursor = 0;
const payloadColor = () => {
  const nextColor = `${colorKey}${nextCursor}`
  newValues.push(nextColor)
  nextCursor++;
  return { 'color': nextColor }
}
const getCurrentCulor = () => {
  return nextCursor > 0 ? `${colorKey}${nextCursor - 1}` : `${colorKey}O`
}

//tests

//1
it('Response should be 200 and JSON, object and array', function(done) {
  chai.request('http://localhost:8080')
  .get('/colors')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    res.should.be.json;
    res.should.be.a('object');
    //res.should.be.an('array');
    done();
  });
});



//2
it('Response 404 in case of bad path', function(done) {
  chai.request('http://localhost:8080')
  .get('/colorfull')
  .end(function(err, res) {
    expect(res).to.have.status(404);
    done();
  });
});



//3
it('Response should be 201 with POST, object and array', function(done) {
  const param = {
    color: 'turquoise'
  };
  chai.request('http://localhost:8080')
  .post('/colors')
  .send(param)
  .end(function(err, res) {
    expect(res).to.have.status(201);
    res.should.be.json;
    res.should.be.a('object');
    //res.should.be.an('array');
    res.body.color.should.eql(param.color);
    done();
  });
});

//4
it('Response should be 200 and JSON, object and array', function(done) {
  chai.request('http://localhost:8080')
  .get('/colors')
  .end(function(err, res) {
    expect(res).to.have.status(200);
    res.should.be.json;
    res.should.be.a('object');
    //res.should.be.an('array');
    done();
  });
});



// <-- FIN