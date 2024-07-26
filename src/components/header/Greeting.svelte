<script lang="ts">
  import { gerGreeting } from "@helpers/getGreeting"

  const currentTime = new Date();
  const currentHour = currentTime.getHours();


  const greeting = gerGreeting(currentHour)

</script>

<h1 class='text-3xl font-bold'>
  { greeting }
</h1>
