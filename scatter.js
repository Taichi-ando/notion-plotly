const main = document.getElementById('main');
const url = new URL(location.href);
const pX = url.searchParams.get('x');
const pY = url.searchParams.get('y');
const pHover = url.searchParams.get('hover');
const pType = url.searchParams.get('type') ?? "scatter";
const commaToArray = (str) => {
  return str.split(',');
};
const render = () => {
  const x = commaToArray(pX);
  const y = commaToArray(pY);
  Plotly.newPlot(main, [{
    type: pType,
    x,
    y,
    mode: 'markers',
    text: commaToArray(pHover),
    textposition: "bottom center",
    hovertemplate: '<b>%{text}</b>' + '<br><b>CV</b>: %{x}' +
      '<br><b>LB</b>: %{y}<br><extra></extra>',
    marker: { size: 12 }
  }],
    {
      xaxis: { title: 'CV' },
      yaxis: { title: 'LB' }

    });
}
if (!pX || !pY || !pHover) {
  location.href = './index.html';
}
render();
const resizeObserver = new ResizeObserver(entries => {
  render();
});
resizeObserver.observe(main);

