<template>
    <Slack :object="object" v-if="object.type === 'slack'"></Slack>
    <Email :object="object" v-else-if="object.type === 'email'"></Email>
    <Drive :object="object" v-else-if="object.type === 'drive'"></Drive>
    <GitHub :object="object" v-else-if="object.type === 'drive'"></GitHub>
</template>
<script>
import Slack from "./FeedItems/Slack";
import Email from "./FeedItems/Email";
import Drive from "./FeedItems/Drive";
import GitHub from "./FeedItems/GitHub";

export default {
  props: {
    object: {
      required: true
    }
  },
  components: {
    Slack,
    Email,
    Drive,
    GitHub
  }
};
</script>
