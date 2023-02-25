export const getState = (state) => {
    const keys = Object.keys(state)
    const values = Object.values(state)
    let data = {}
    keys.map((item, i) => {
      data = {
        ...data, [item]: values[i].value
      }
    })
    return data
}