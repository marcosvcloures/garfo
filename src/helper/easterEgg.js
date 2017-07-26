const ovoDePascoa1 = e => {
    if (e === null) return

    e.style.backgroundColor = 'rgb(' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ')'
    e.style.color = 'rgb(' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ')'
    e.style.fill = 'rgb(' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ')'
    e.style.stroke = 'rgb(' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ')'

    for (let i of e.children) ovoDePascoa1(i)
}

const ovoDePascoa2 = e => {
    if (e === null) return

    e.style.backgroundColor = 'rgb(' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ',' + Number.parseInt(Math.random() * 255, 10) + ')'
    e.style.transform = 'scale(' + (Math.random() * 4 - 2) + ', ' + (Math.random() * 4 - 2) + ')'

    for (let i of e.children) ovoDePascoa2(i)
}

document.body.ovoDePascoa1 = () => setInterval(() => ovoDePascoa1(document.body), 100)
document.body.ovoDePascoa2 = () => setInterval(() => ovoDePascoa2(document.body), 100)