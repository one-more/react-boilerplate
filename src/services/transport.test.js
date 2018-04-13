import Transport from './transport'

describe('transport', () => {
    it('should have send method', () => {
        expect(Transport.send).toEqual(
            expect.any(Function)
        )
    })
});
