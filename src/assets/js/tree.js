var chart = new OrgChart(document.getElementById("tree"), {
    mode: 'dark',
    mouseScrool: OrgChart.none,
    nodeBinding: {
        field_0: "name"
    }
  });
  
  chart.load([
    { id: 1, name: "Denny Curtis" },
    { id: 2, pid: 1, name: "Ashley Barnett" },
    { id: 3, pid: 1, name: "Caden Ellison" }
  ]);
  