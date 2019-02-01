import { port } from '../config';

describe('testing port value', () => {
    test('port should be 6001 for prod build', () => {
        expect(port).toEqual(6001);
    });
});
