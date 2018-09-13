package io.citizenhealth.humantiv;

import android.app.Application;
import android.content.pm.PackageManager;
import android.support.v4.app.ActivityCompat;

import com.BV.LinearGradient.LinearGradientPackage;
import com.facebook.CallbackManager;
import com.facebook.appevents.AppEventsLogger;
import com.facebook.react.ReactApplication;
import co.apptailor.googlesignin.RNGoogleSigninPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.reactnative.androidsdk.FBSDKPackage;
import com.facebook.soloader.SoLoader;
import com.google.firebase.database.FirebaseDatabase;
import com.horcrux.svg.SvgPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.robinpowered.react.Intercom.IntercomPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.apsl.versionnumber.RNVersionNumberPackage;

import java.util.Arrays;
import java.util.List;

import io.citizenhealth.RNReactNativeHgraphPackage;
import io.citizenhealth.humanapi.RNReactNativeHumanApiPackage;
import io.intercom.android.sdk.Intercom;
import io.invertase.firebase.RNFirebasePackage;
import io.invertase.firebase.analytics.RNFirebaseAnalyticsPackage;
import io.invertase.firebase.auth.RNFirebaseAuthPackage;
import io.invertase.firebase.config.RNFirebaseRemoteConfigPackage;
import io.invertase.firebase.database.RNFirebaseDatabasePackage;
import io.invertase.firebase.fabric.crashlytics.RNFirebaseCrashlyticsPackage;
import io.invertase.firebase.invites.RNFirebaseInvitesPackage;
import io.invertase.firebase.links.RNFirebaseLinksPackage;
import io.invertase.firebase.messaging.RNFirebaseMessagingPackage;
import io.invertase.firebase.notifications.RNFirebaseNotificationsPackage;
import io.invertase.firebase.perf.RNFirebasePerformancePackage;
import io.invertase.firebase.storage.RNFirebaseStoragePackage;
import io.sentry.RNSentryPackage;

public class MainApplication extends Application implements ReactApplication {

    private static CallbackManager mCallbackManager = CallbackManager.Factory.create();

    protected static CallbackManager getCallbackManager() {
        return mCallbackManager;
    }

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            if (ActivityCompat.checkSelfPermission(this.getApplication(), android.Manifest.permission.READ_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED ||
                ActivityCompat.checkSelfPermission(this.getApplication(), android.Manifest.permission.WRITE_EXTERNAL_STORAGE)
                    != PackageManager.PERMISSION_GRANTED) {
                // TODO: Consider calling
                //    ActivityCompat#requestPermissions
                // here to request the missing permissions, and then overriding
                //   public void onRequestPermissionsResult(int requestCode, String[] permissions,
                //                                          int[] grantResults)
                // to handle the case where the user grants the permission. See the documentation
                // for ActivityCompat#requestPermissions for more details.
            }
            return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                new RNSpinkitPackage(),
                new LinearGradientPackage(),
                new SvgPackage(),
                new RNVersionNumberPackage(),
                new RNReactNativeHgraphPackage(),
                new RNSentryPackage(MainApplication.this),
                new RNReactNativeHumanApiPackage(),
                new RNGoogleSigninPackage(),
                new RNFirebasePackage(),
                new RNGestureHandlerPackage(),
                new FBSDKPackage(mCallbackManager),
                new RNFirebaseAnalyticsPackage(),
                new RNFirebaseAuthPackage(),
                new RNFirebaseCrashlyticsPackage(),
                new RNFirebaseDatabasePackage(),
                new RNFirebasePerformancePackage(),
                new RNFirebaseRemoteConfigPackage(),
                new RNFirebaseStoragePackage(),
                new RNFirebaseMessagingPackage(),
                new RNFirebaseNotificationsPackage(),
                new RNFirebaseLinksPackage(),
                new RNFirebaseInvitesPackage(),
                new IntercomPackage()
            );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    FirebaseDatabase.getInstance().setPersistenceEnabled(true);
    Intercom.initialize(this, "android_sdk-1660208d9812b6cb93f37fe6d20b6e021e3d58a7", "tkfzhske");
    Intercom.client().registerUnidentifiedUser();
    AppEventsLogger.activateApp(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
