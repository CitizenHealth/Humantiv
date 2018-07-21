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

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  NSURL *jsCodeLocation;
//  for (NSString* family in [UIFont familyNames])
//  {
//    NSLog(@"%@", family);
//    for (NSString* name in [UIFont fontNamesForFamilyName: family])
//    {
//      NSLog(@" %@", name);
//    }
//  }
  
  [FIRApp configure];
  [FIRDatabase database].persistenceEnabled = YES;
  [RNFirebaseNotifications configure];
  [[UNUserNotificationCenter currentNotificationCenter] setDelegate:self];
  
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

- (BOOL)application:(UIApplication *)application openURL:(NSURL *)url
  sourceApplication:(NSString *)sourceApplication annotation:(id)annotation {
  
  return [RNGoogleSignin application:application openURL:url sourceApplication:sourceApplication annotation:annotation];
}

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

@end
