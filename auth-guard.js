(function() {
  // 1) Sin login → mandar a login.
  if (sessionStorage.getItem('gp_auth') !== 'ok') {
    var script = document.querySelector('script[src*="auth-guard"]');
    var src = script.getAttribute('src');
    window.location.replace(src.replace('auth-guard.js', 'login.html'));
    return;
  }

  // 2) Si el role es "envios", restringir las paginas accesibles.
  var role = sessionStorage.getItem('gp_role') || 'admin';
  if (role === 'envios') {
    var path = decodeURIComponent(window.location.pathname).toLowerCase();
    var permitidos = [
      'envios-only.html',
      'talleristas/envios/enviostall.html',
      'prov serv/envios/enviosps.html',
      'calculadora.html',
      'calculadora-basica.html',
      'calcular-cajones.html',
      'login.html'
    ];
    var ok = permitidos.some(function(p){ return path.indexOf(p) !== -1; });
    if (!ok) {
      var script2 = document.querySelector('script[src*="auth-guard"]');
      var src2 = script2.getAttribute('src');
      window.location.replace(src2.replace('auth-guard.js', 'envios-only.html'));
    }
  }
})();
