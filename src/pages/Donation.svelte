<script>
    import Header from "../components/Header.svelte";
    import Footer from "../components/Footer.svelte";
    import { charities } from '../data/charities';

    export let params;
    let data;

    function getCharity(id) {
        return charities.find((charity) => {
            return charity.id === parseInt(id);
        })
    }

    data = getCharity(params.id);
</script>
<Header/>
<!-- welcome section -->
<!--breadcumb start here-->
{#if data}
<section class="xs-banner-inner-section parallax-window" style=
"background-image:url('/assets/images/slide3.png')">
    <div class="xs-black-overlay"></div>
    <div class="container">
    <div class="color-white xs-inner-banner-content">
        <h2>Donate Now</h2>
        <p>{data.title}</p>
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
                <h2 class="xs-title">{data.title}</h2>
                <p class="small">To learn more about make donate charity
                with us visit our "<span class="color-green">Contact
                    us</span>" site. By calling <span class=
                    "color-green">+44(0) 800 883 8450</span>.</p><span class=
                    "xs-separetor v2"></span>
            </div><!-- .xs-heading end -->
            <form action="#" method="post" id="xs-donation-form" class=
            "xs-donation-form" name="xs-donation-form">
                <div class="xs-input-group">
                <label for="xs-donate-name">Donation Amount <span class=
                "color-light-red">**</span></label> 
                <input type="text" name="name" id="xs-donate-name" class="form-control" placeholder="Minimum of $5">
                </div><!-- .xs-input-group END -->
                <div class="xs-input-group">
                <label for="xs-donate-charity">List of Evaluated Charities
                    <span class="color-light-red">**</span></label>
                <select name="charity-name" id="xs-donate-charity" class=
                "form-control">
                    <option value="">
                    Select
                    </option>
                    <option value="amarokSocity">
                    Amarok socity
                    </option>
                    <option value="amarokSocity">
                    Amarok socity
                    </option>
                    <option value="amarokSocity">
                    Amarok socity
                    </option>
                    <option value="amarokSocity">
                    Amarok socity
                    </option>
                </select>
                </div><!-- .xs-input-group END -->
                <div class="xs-input-group" id="xs-input-checkbox">
                    <input type="checkbox" class="form-control" id="xs-donate-agree">
                    <label for="xs-donate-agree">
                        Agree
                    </label>
                </div>
                <button type="submit" class="btn btn-warning"><span class=
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