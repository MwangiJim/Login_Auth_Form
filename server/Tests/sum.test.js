import sum from './sum.js'

test('properly adds two numbers',()=>{
    expect(sum(3,3)).toBe(6)
})