<script>
    import router from 'page';
    import {charity, getCharity} from '../stores/store';
    import {params} from '../stores/routes';
    import Header from "../components/Header.svelte";
    import Preload from '../components/Preload.svelte';
    import Footer from "../components/Footer.svelte";

    let amount, name, email, agree = false, isClick = false, contribute = 0;
    getCharity($params.id)

    $: if ($charity) {
        contribute = Math.floor((parseInt((!amount ? 0 : amount)) / $charity.target) * 100);

        if (isNaN(contribute)) {
            contribute = 0;
        }
    }

    $: if (agree || !agree) {
        isClick = agree;
    }

    function handleClickDonate() {
        console.log('click')
    }

    async function handleSubmitForm() {
        isClick = !isClick;
        $charity.pledged += parseInt(amount)
        
        try {
            await fetch(`https://charity-api-bwa.herokuapp.com/charities/${$params.id}`, {
                method: 'PUT',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify($charity)
            })

            // redirection
            const resMid = await fetch('/.netlify/functions/payment', {
                method: 'POST',
                headers: {
                    'content-type':'application/json'
                },
                body: JSON.stringify({
                    id: $params.id,
                    amount: parseInt(amount),
                    name,
                    email
                })
            });

            const resMidtrans = await resMid.json();
            console.log(resMidtrans)
            window.location.href = resMidtrans.url;
        } catch (error) {
            console.log(error)
        }
    }
</script>

<Header/>
<!-- welcome section -->
<!--breadcumb start here-->
{#if !$charity}
    <Preload />
{:else}
    <section class="xs-banner-inner-section parallax-window" style="background-image:url('/assets/images/slide3.png')">
        <div class="xs-black-overlay"></div>
        <div class="container">
        <div class="color-white xs-inner-banner-content">
            <h2>Donate Now</h2>
            <p>{$charity.title}</p>
            <ul class="xs-breadcumb">
            <li class="badge badge-pill badge-primary">
                <a href="/" class="color-white">Home /</a> Donate
            </li>
            </ul>
        </div>
        </div>
    </section><!--breadcumb end here--><!-- End welcome section -->
    <main class="xs-main">
        <!-- donation form section -->
        <section class="xs-section-padding bg-gray">
        <div class="container">
            <div class="row">
            <div class="col-lg-6">
                <div class="xs-donation-form-images"><img src=
                "/assets/images/slide2.png" class="img-responsive" alt=
                "Family Images"></div>
            </div>
            <div class="col-lg-6">
                <div class="xs-donation-form-wraper">
                <div class="xs-heading xs-mb-30">
                    <h2 class="xs-title">{$charity.title}</h2>
                    <p class="small">To learn more about make donate charity
                    with us visit our "<span class="color-green">Contact
                        us</span>" site. By calling <span class=
                        "color-green">+44(0) 800 883 8450</span>.</p>
                        <h5>
                            Your donation will be contributing
                            <strong>{contribute}%</strong> 
                            of total current donation.
                        </h5>
                        <span class="xs-separetor v2"></span>
                </div><!-- .xs-heading end -->
                <form on:submit|preventDefault={handleSubmitForm} action="#" method="post" id="xs-donation-form" class=
                "xs-donation-form" name="xs-donation-form">
                    <div class="xs-input-group">
                    <label for="xs-donate-amount">Donation Amount <span class=
                    "color-light-red">**</span></label> 
                    <input type="text" name="amount" id="xs-donate-amount" class="form-control" 
                        bind:value={amount} 
                        required="true"
                        placeholder="Your donation in rupiah">
                    </div><!-- .xs-input-group END -->
                    <div class="xs-input-group">
                        <label for="xs-donate-name">Your name <span class=
                            "color-light-red">**</span></label> 
                            <input type="text" name="name" id="xs-donate-name" class="form-control" 
                                bind:value={name} 
                                required="true"
                                placeholder="Your name">
                    </div><!-- .xs-input-group END -->
                    <div class="xs-input-group">
                        <label for="xs-donate-email">Your email <span class=
                            "color-light-red">**</span></label> 
                            <input type="text" name="email" id="xs-donate-email" class="form-control" 
                                bind:value={email} 
                                required="true"
                                placeholder="Your email">
                    </div><!-- .xs-input-group END -->
                    <div class="xs-input-group" id="xs-input-checkbox">
                        <input type="checkbox" class="form-control" id="xs-donate-agree"
                            bind:checked={agree}>
                        <label for="xs-donate-agree">
                            Agree
                        </label>
                    </div>
                    <button type="submit" on:click={handleClickDonate} class="btn btn-warning" disabled={!isClick}><span class=
                    "badge"><i class="fa fa-heart"></i></span> Donate
                now</button>
                </form><!-- .xs-donation-form #xs-donation-form END -->
                </div>
            </div>
            </div><!-- .row end -->
        </div><!-- .container end -->
        </section><!-- End donation form section -->
    </main><!-- footer section start -->
{/if}
<Footer/>

<style>
    #xs-input-checkbox{
        display: flex;
        align-items: center;
        margin-top: -10px;
    }
    #xs-donate-agree{
        width: 20px;
    }
    label[for="xs-donate-agree"]{
        margin: 0;
        margin-left: 10px;
    }
</style>