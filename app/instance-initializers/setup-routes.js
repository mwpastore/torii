import bootstrapRouting from 'torii/bootstrap/routing';
import { getConfiguration } from 'torii/configuration';
import "torii/router-dsl-ext";

export default {
  name: 'torii-setup-routes',
  initialize: function(container, registry){
    const configuration = getConfiguration();

    if (!configuration.sessionServiceName) {
      return;
    }

    var router = container.lookup('router:main');
    var setupRoutes = function(){
      var routerRouter = router._routerMicrolib || router.router;
      var authenticatedRoutes = routerRouter.authenticatedRoutes;
      var hasAuthenticatedRoutes = !Ember.isEmpty(authenticatedRoutes);
      if (hasAuthenticatedRoutes) {
        bootstrapRouting(container, authenticatedRoutes);
      }
      router.off('willTransition', setupRoutes);
    };
    router.on('willTransition', setupRoutes);
  }
};
