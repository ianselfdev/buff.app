import { port } from '../config';

describe('testing port value', () => {
    test('port should be 6002 for prod build', () => {
        expect(port).toEqual(6002);
    });
});
