# Sitecore CDP Guest and Web Experience Demo

This directory has the following Sitecore CDP features which are being demonstrated:
  * If someone signs up for the newsletter or makes a purchase, then we show a prompt to invite friends.
  * If a visitor abandons the cart and returns to the site, we offer a coupon.

## Sitecore CDP Stream APIs events used in this demo

  * ADD
  * IDENTITY
  * ADD_CONSUMERS
  * ADD_CONTACTS
  * CONFIRM
  * PAYMENT
  * CHECKOUT
  * VIEW

## Sitecore CDP Web Experience Real time Audiance for Newsletter Subscribed users
```javascript
(function () {
    var hasInvited = false;
    var hasDismissed = false;
    
    guest.sessions.forEach(function(session) {
      session.events.forEach(event => {
          if(event.type == "Newsletter_SIDE_BAR_DISMISSED")
            {
                hasDismissed = true;
            }
          if(event.type == "Newsletter_CORNER_POPUP_INTERACTION")
            {
                if(event.arbitraryData.interactionType == "DISMISSED" || event.arbitraryData.interactionType == "CLICKED")
                {
                    hasInvited = true;
                }
            }
      });
  });
    
  if(guest.email && !hasInvited && !hasDismissed)
  {
      return true;
  }
  else
  {
      return false;
  }
})();
```
## Sitecore CDP Web Experience Real time Audiance for Newsletter Non-Subscribed users
```javascript
(function () {
    var hasDismissed = false;
    
    guest.sessions.forEach(function(session) {
      session.events.forEach(event => {
          if(event.type == "Newsletter_SIDE_BAR_DISMISSED")
            {
                hasDismissed = true;
            }
      });
  });
  
  if(!guest.email && !hasDismissed)
  {
      return true;
  }
  else
  {
      return false;
  }
})();
```
## Sitecore CDP Web Experience Real time Audiance for Existing Buyers
```javascript
(function () {
    var hasPurchased = false;
    var hasShared = false;
    
    guest.sessions.forEach(function(session) {
      session.events.forEach(event => {
          if(event.type == "CHECKOUT")
            {
                if(event.arbitraryData.status == "PURCHASED")
                {
                    hasPurchased = true;
                }
            }
            if(event.type == "Purchase_CORNER_POPUP_INTERACTION")//corner popup
            {
                if(event.arbitraryData.interactionType == "DISMISSED" || event.arbitraryData.interactionType == "CLICKED")
                {
                    hasShared = true;
                }
            }
            if(event.type == "Buyer_ALERT_BAR_DISMISSED")//Top alert
            {
                hasShared = true;
            }
            
      });
  });
  
    
    
  if(hasPurchased && !hasShared)
  {
      return true;
  }
  else
  {
      return false;
  }
})();
```
## Sitecore CDP Web Experience Real time Audiance for Abandoned Cart
```javascript
(function () {
    var isCartabandoned  = false;
    var hasViewedOffer = false;
    
    guest.sessions.forEach(function(session) {
        if(session.cartType == "ABANDONED")
        {
            isCartabandoned = true;
        }
        session.events.forEach(event => {
            if(event.type == "INTERACTION")
            {
                if(event.arbitraryData.interactionType == "DISMISSED")
                {
                    hasViewedOffer = true;
                }
            }
        });
    });
  
    
    
  if(isCartabandoned && !hasViewedOffer)
  {
      return true;
  }
  else
  {
      return false;
  }
})();
```
