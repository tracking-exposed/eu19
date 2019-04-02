# API Docs

## Before you start

The main URL to access our API is:
`https://facebook.tracking.exposed/api/v2`.

Remember that URLs reference this values which are variables and can be obtained...
<br><br>`userToken`: is an unique<br>
`paging`: defines etc
## API Index
<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>URL</th>
  </tr>
  <tr>
    <td>Health Check</td>
    <td>[link]()</td>
    <td>/health</td>

  </tr>
  <tr>
    <td>Service Status</td>
    <td>[link]()</td>
    <td>/services</td>

  </tr>
  <tr>
    <td>RSS feed</td>
    <td>[link]()</td>
    <td>/feeds/query</td>

  </tr>
  <tr>
    <td>Personal Summary</td>
    <td>[link](#personalsummary)</td>
    <td>/personal/<$personalToken>/summary/<amount-skip></td>

  </tr>
  <tr>
    <td>Personal Summary Extended</td>
    <td>[link]()</td>
    <td>/personal/:userToken/extended/:paging?</td>

  </tr>
  <tr>
    <td>Personal Summary as CSV</td>
    <td>[link]()</td>
    <td>/personal/:userToken/csv/:dayrange?</td>

  </tr>
  <tr>
    <td>Semantics</td>
    <td>[link]()</td>
    <td>/personal/:userToken/semantics/:dayrange?</td>

  </tr>
  <tr>
    <td>Collective Stats</td>
    <td>[link]()</td>
    <td>/collective/:groupLabel/stats/:dayrange?</td>

  </tr>
  <tr>
    <td>Collective Summary</td>
    <td>[link]()</td>
    <td>/collective/:groupLabel/download/:dayrange?</td>

  </tr>
</table>

****

## <a name="personalsummary"></a>Personal Summary

#### URL
`https://testing.tracking.exposed/api/v2/personal/$YOUR_ID/summary/$AMOUNT-$SKIP`
<br><br>
#### Description
Returns a summary of personal data of an user based on its `userToken`. <br>**$YOUR_ID** is your unique 40 characters ID (you can find it by clicking on "your data" over a Facebook post and copying it from the URL),
**$AMOUNT** is the number of impressions you want to retrieve and
**$SKIP** is the amount of impression you want to skip (starting from the most recent).
For example, if you want to skip 200 posts and get 50 results, you will add 50-200 after the last '/'.

#### Data Specifics

<table>
  <tr>
    <th>Name</th>
    <th>Description</th>
    <th>Format</th>
    <th>Example</th>
  </tr>
  <tr>
    <td>impressionTime</td>
    <td>Time in which the impression was collected/observed.</td>
    <td>string</td>
    <td>`"2019-03-22T08:59:50.000Z"`</td>
  </tr>
  <tr>
    <td>impressionOrder</td>
    <td>Order at which the impression appeared when scrolling the timeline.</td>
    <td>integer</td>
    <td>`42`</td>
  </tr>
  <tr>
    <td>semanticId</td>
    <td>Unique Id for the impression collected, it's the same in other API feeds such as "semantic".</td>
    <td>string</td>
    <td>`"1111a1aa1aa111a11a1a1aa1111a111111a1a1a1"`</td>
  </tr>
  <tr>
    <td>interactions</td>
    <td>Provides a list of every type of reaction with the post at an observed time. Each occurence contains the count for that reaction as `amount`, a `description` and `rtype` (the reaction type as integer).</td>
    <td>nested</td>
    <td>`[{"amount":"13","desc":"13 Like","rtype":"1"},{"amount":"3","desc":"3 Love","rtype":"2"},{"amount":"7","desc":"7 Sad","rtype":"7"}]`</td>
  </tr>
  <tr>
    <td>user</td>
    <td>Pseudonym for the user which is seeing/collecting the impression.</td>
    <td>string</td>
    <td>`"gelato-salmon-strawberry"`</td>
  </tr>
  <tr>
    <td>timeline</td>
    <td>Pseudonym for timeline in which the impression appeared.</td>
    <td>string</td>
    <td>`"pasta-nutella-cabbage"`</td>
  </tr>
  <tr>
    <td>publicationTime</td>
    <td>Time at which the post was first published.</td>
    <td>string</td>
    <td>`"2019-03-18T23:00:00.000Z"`</td>
  </tr>
  <tr>
    <td>postId</td>
    <td>Unique ID for the post (not the impression!)</td>
    <td>string</td>
    <td>`"111111122233341"`</td>
  </tr>
  <tr>
    <td>permaLink</td>
    <td>Permanent link to the public post.</td>
    <td>string</td>
    <td>`"/Testing/tests/111111122233341/"`</td>
  </tr>
  <tr>
    <td>fblinktype</td>
    <td>Type of media. Can be posts, photos or videos.</td>
    <td>string</td>
    <td>`"videos"`</td>
  </tr>
  <tr>
    <td>nature</td>
    <td>Specifies whether is a "sponsored" or "organic" post.</td>
    <td>string</td>
    <td>`"sponsored"`</td>
  </tr>
  <tr>
    <td>images</td>
    <td>Provides two values: `count` and `captions`. Count returns an integer with the total number of images contained in the impression. Captions contains a list of texts that describe the image (the 'alt' text that appears when you mouseover an image on Facebook.)</td>
    <td>nested</td>
    <td>`{"count":1,"captions":["Image may contain: one or more people and text"]}`</td>
  </tr>
  <tr>
    <td>displaySource</td>
    <td>The full string displayed above the post.</td>
    <td>string</td>
    <td>`"Douglas Adams added a new photo."`</td>
  </tr>
  <tr>
    <td>source</td>
    <td>The name of the post publisher.</td>
    <td>string</td>
    <td>`"Douglas Adams"`</td>
  </tr>
  <tr>
    <td>sourceLink</td>
    <td>Link to the profile of the impression publisher.</td>
    <td>string</td>
    <td>`"https://facebook.com/douglas.adams.42"`</td>
  </tr>
  <tr>
    <td>texts</td>
    <td>List of texts for the impression. Contains translations but not comments.</td>
    <td>nested</td>
    <td>`"texts":["Don't panic."]`</td>
  </tr>
  <tr>
    <td>textsize</td>
    <td>Length of the text.</td>
    <td>integer</td>
    <td>`42`</td>
  </tr>
  <tr>
    <td>opengraph</td>
    <td>To be implemented soon.</td>
    <td></td>
    <td>`null`</td>
  </tr>
</table>

#### Sample Usage
Request:
    `https://testing.tracking.exposed/api/v2/personal/1111a1aa1aa111a11a1a1aa1111a111111a1a1a1/summary/1-0`

Response:

    [{"impressionTime":"2019-03-22T08:59:50.000Z","impressionOrder":42,"semanticId":"1111a1aa1aa111a11a1a1aa1111a111111a1a1a1","interactions":[{"amount":"13","desc":"13 Like","rtype":"1"},{"amount":"3","desc":"3 Love","rtype":"2"},{"amount":"7","desc":"7 Sad","rtype":"7"}],"user":"gelato-salmon-strawberry","timeline":"pasta-nutella-cabbage","publicationTime":"2019-03-18T23:00:00.000Z","postId":"111111122233341","permaLink":"/Testing/tests/111111122233341/","fblinktype":"videos","nature":"sponsored","images":{"count":1,"captions":["Image may contain: one or more people and text"]},"displaySource":"Douglas Adams added a new photo.","source":"Douglas Adams","sourceLink":"https://facebook.com/douglas.adams.42","texts":["Don't panic."],"textsize":42,"opengraph":null}]
