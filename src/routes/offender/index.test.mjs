import chai from 'chai';
import chaiHttp from 'chai-http';

import offenderRoutes from './index.mjs';

// Configure chai
chai.use(chaiHttp);
chai.should();

// eslint-disable-next-line no-undef
describe('GET /', () => {
  // eslint-disable-next-line no-undef
  it('should return 200 status', (done) => {
    chai.request(offenderRoutes)
      .get('/')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
