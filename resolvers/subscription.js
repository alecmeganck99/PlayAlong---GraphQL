/**
 * The Subscription Resolvers
 */

module.exports = {
  Subscription: {
    extentionAdded: { subscribe: () => pubsub.asyncIterator("EXTENTION_ADDED") }
  }
}