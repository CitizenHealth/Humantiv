/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
#import "Firebase.h"
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#if __has_include(<React/RNSentry.h>)
#import <React/RNSentry.h> // This is used for versions of react >= 0.40
#else
#import "RNSentry.h" // This is used for versions of react < 0.40
#endif
#import <RNGoogleSignin/RNGoogleSignin.h>
#import "RNFirebaseMessaging.h"
#import "RNFirebaseNotifications.h"
#import "Intercom/intercom.h"
#import "RNFirebaseInvites.h"
#import "RNFirebaseLinks.h"
#import <FBSDKCoreKit/FBSDKCoreKit.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
  [[FBSDKApplicationDelegate sharedInstance] application:application
                           didFinishLaunchingWithOptions:launchOptions];
  [FIROptions defaultOptions].deepLinkURLScheme = @"com.googleusercontent.apps.847047929311-ibked2hj6k5263b55bcjfnpiemrbpans";
  [FIRApp configure];
  [FIRDatabase database].persistenceEnabled = YES;
  [RNFirebaseNotifications configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  // Intercom
  [Intercom setApiKey:@"ios_sdk-41400f9122c34e1651f2202b7e59ed24c1d5eb61" forAppId:@"tkfzhske"];
  [Intercom registerUnidentifiedUser];
#ifdef DEBUG
  jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Humantiv"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
[RNSentry installWithRootView:rootView];

  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            sourceApplication:(NSString *)sourceApplication
            annotation:(id)annotation {
  
  return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

- (BOOL)application:(UIApplication *)application
            openURL:(NSURL *)url
            options:(NSDictionary<NSString *, id> *)options {
  return
    [[RNFirebaseLinks instance] application:application
                                openURL:url options:options]
  
    ||
    [[RNFirebaseInvites instance] application:application
                                  openURL:url options:options]
    ||
    [RNGoogleSignin application:application
                    openURL:url
                    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]]
    ||
    [[FBSDKApplicationDelegate sharedInstance] application:application
                    openURL:url
                    sourceApplication:options[UIApplicationOpenURLOptionsSourceApplicationKey]
                    annotation:options[UIApplicationOpenURLOptionsAnnotationKey]];
}

- (BOOL)application:(UIApplication *)application
continueUserActivity:(NSUserActivity *)userActivity
 restorationHandler:(void (^)(NSArray *))restorationHandler {
  return
  [[RNFirebaseLinks instance] application:application
                              continueUserActivity:userActivity
                              restorationHandler:restorationHandler]
  ||
  [[RNFirebaseInvites instance] application:application
                                continueUserActivity:userActivity
                                restorationHandler:restorationHandler];
}
//- (BOOL)application:(UIApplication *)application
//            openURL:(NSURL *)url
//            options:(NSDictionary<NSString *, id> *)options {
//  return [[RNFirebaseInvites instance] application:application openURL:url options:options];
//}
//
//- (BOOL)application:(UIApplication *)application
//            continueUserActivity:(NSUserActivity *)userActivity
//            restorationHandler:(void (^)(NSArray *))restorationHandler {
//  return [[RNFirebaseInvites instance] application:application continueUserActivity:userActivity restorationHandler:restorationHandler];
//}

-(void)application:(UIApplication *)application didReceiveLocalNotification:(UILocalNotification *)notification {
//  [RNFirebaseMessaging didReceiveLocalNotification:notification];
  [[RNFirebaseNotifications instance] didReceiveLocalNotification:notification];
}

- (void)application:(UIApplication *)application didRegisterUserNotificationSettings:(UIUserNotificationSettings *)notificationSettings {
  [[RNFirebaseMessaging instance] didRegisterUserNotificationSettings:notificationSettings];
}

- (void)application:(UIApplication *)application didReceiveRemoteNotification:(nonnull NSDictionary *)userInfo
fetchCompletionHandler:(nonnull void (^)(UIBackgroundFetchResult))completionHandler{
  [[RNFirebaseNotifications instance] didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}

- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken {
  
  // Intercom
  [Intercom setDeviceToken:deviceToken];
}

- (void)applicationDidBecomeActive:(UIApplication *)application {
  [FBSDKAppEvents activateApp];
}
@end
