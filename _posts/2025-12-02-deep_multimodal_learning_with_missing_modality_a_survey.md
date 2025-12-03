---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6SPEBHI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQCsexEBFoxvf8i9QNtTpRsVr6SpnsoMeGjXReMT%2BVEHNwIhAJAjMmroHrZiuh6BrV0b%2FrxXmlL%2FsAzcQxjCTnwD0t1hKv8DCCYQABoMNjM3NDIzMTgzODA1Igw8vACVyTrVo9BVRuoq3AMwdJEHJTpgEO6FDwOMjqUFFeLxCM8O7X5mGaUrA0ePSKbKCxqCUn%2BahGp7Ne1OVAyW%2F7YMPRv9DAddJjV2pElmy6MDKN9pSK5jCAijAY1AaEpOt%2BPW7PvtYtUHnBlrJOJwxs41eHJ1XTNaxpbRrLmxqShvCNhXYGD1ZKYBXIRCKnv6DmAMi05Z%2BBwpjFqWSeDVOwkNrqmL37tIrxk5hmFlG0khiQeFBysB6z9FImTxmulhBnJtjuBtaPXI%2FYLQHXfvQrcfeEvYpIXSf5%2Fz%2Bugg5DnP3Wdh6D3VEMBE9gV4mh5qxuOtqBJyR1Fh8LTYes%2FIAjBYe%2FUEvwr6HAhGxN0sehOWFHSanbvsUgveiVlFyNQERdMs8M%2BjLttfk8hrScR5G0eOc%2FRslBrlib303%2F2QOqfsu94aqi2Ld12vYeNjscdWT36e8J1%2FSxBZcBxX%2BLesquhZs3vOGZCq9g0hPHDuedcyQ44mqnE38jVdlqHLM1gw68AVfeM%2Fbrz6Pc%2F%2B%2B5uJKG%2FTDv17LH%2B3rGeediBRvtNJPr5JUJaB2ecy%2F5%2Bj4sR8dXvrd358rapLN0BqCCSr7rRDsqC7lJqhNhidr6w8MbWgifJqdkkl7vjenqcjei0nnRj3WNhuR%2F9XUDDdg7%2FJBjqkAYxqFFYqv0An6cpN9ST%2B9KLb%2BGDbD5Pf4Fzp9VtUOh%2FOLwhOo0keMuvKfHF3lTUjbcjP0bQDUZrHdR7csHV3Ex2oKW9t1%2BKjmubr5FEL5tOqW2oEN%2BKEl7e4GeOFm7tvTYBTEA3rcGQalScjKkaGTIFC401JynCK8aWb8eqYppUF9Lv96%2FZj69qPkcdImpcXzo3Gkjshflr48pnBMyg7EkhUzKeA&X-Amz-Signature=8b2485908501e229f6c24fe24aafe440f67e2fe34ec45c6d857950799c187c9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T6SPEBHI%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQCsexEBFoxvf8i9QNtTpRsVr6SpnsoMeGjXReMT%2BVEHNwIhAJAjMmroHrZiuh6BrV0b%2FrxXmlL%2FsAzcQxjCTnwD0t1hKv8DCCYQABoMNjM3NDIzMTgzODA1Igw8vACVyTrVo9BVRuoq3AMwdJEHJTpgEO6FDwOMjqUFFeLxCM8O7X5mGaUrA0ePSKbKCxqCUn%2BahGp7Ne1OVAyW%2F7YMPRv9DAddJjV2pElmy6MDKN9pSK5jCAijAY1AaEpOt%2BPW7PvtYtUHnBlrJOJwxs41eHJ1XTNaxpbRrLmxqShvCNhXYGD1ZKYBXIRCKnv6DmAMi05Z%2BBwpjFqWSeDVOwkNrqmL37tIrxk5hmFlG0khiQeFBysB6z9FImTxmulhBnJtjuBtaPXI%2FYLQHXfvQrcfeEvYpIXSf5%2Fz%2Bugg5DnP3Wdh6D3VEMBE9gV4mh5qxuOtqBJyR1Fh8LTYes%2FIAjBYe%2FUEvwr6HAhGxN0sehOWFHSanbvsUgveiVlFyNQERdMs8M%2BjLttfk8hrScR5G0eOc%2FRslBrlib303%2F2QOqfsu94aqi2Ld12vYeNjscdWT36e8J1%2FSxBZcBxX%2BLesquhZs3vOGZCq9g0hPHDuedcyQ44mqnE38jVdlqHLM1gw68AVfeM%2Fbrz6Pc%2F%2B%2B5uJKG%2FTDv17LH%2B3rGeediBRvtNJPr5JUJaB2ecy%2F5%2Bj4sR8dXvrd358rapLN0BqCCSr7rRDsqC7lJqhNhidr6w8MbWgifJqdkkl7vjenqcjei0nnRj3WNhuR%2F9XUDDdg7%2FJBjqkAYxqFFYqv0An6cpN9ST%2B9KLb%2BGDbD5Pf4Fzp9VtUOh%2FOLwhOo0keMuvKfHF3lTUjbcjP0bQDUZrHdR7csHV3Ex2oKW9t1%2BKjmubr5FEL5tOqW2oEN%2BKEl7e4GeOFm7tvTYBTEA3rcGQalScjKkaGTIFC401JynCK8aWb8eqYppUF9Lv96%2FZj69qPkcdImpcXzo3Gkjshflr48pnBMyg7EkhUzKeA&X-Amz-Signature=8b2485908501e229f6c24fe24aafe440f67e2fe34ec45c6d857950799c187c9c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZHNHEOD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQC0PCMmCN52dx0YA0NXSaiRgV7CRXIZ0M4D3Up1GPP9igIhAIAb3AsREdh41545IIfMOGmZEd90dqSnP97IyA85JQA1Kv8DCCYQABoMNjM3NDIzMTgzODA1Igzuy8aJ9TAGehgesLMq3ANip7ejL9sm7YzdvrlSF5BxzzdQ9u61t0EUMQDmKvrEhthhq5MER6cRhaE4LDvdaSzPO%2FMOdSEG5fBma24yGYX85mvZdlHqgmT3FRF1OekSKhSJYbSBJqTYvxiZSbbrxQtest03Sd3TXAOYPStWcmHWZWagLc2%2F3nJe8UaK0v0FFcAmoclK4RCa9eNjrd1WiGRFwsG90SzhrZ3g9uIiN8b%2By%2BoQ1yvWHxEIRelr8xEyiAKoskR38kkDFbomDgfdcc2fgEsasnA1CnfnuptWaxpWY5R6ujB%2Fwj8yd8FC2pIWpCAQErQQfK6HIYSzA0sW8b0AvKeTlmlchdf4H6tixgc0yK2PuE1Tt0opbpOAd4h%2FeHBRYYTo7B5ZM8jGspU0iblvHDj9xGJ6O%2Fef8xqigJatgZHGLcx0F8lCrY7ioKnfl7ijsqi5JnntyOdijGDobnOdCIQnEKhV5rWS456s8jt5BNXkQMkQdJgFZRHxRxTIRYiYF0sOEivK1ih34x6%2BbmiLbHB1RJu2OgiOobHrThBlx49f3wUSzv4aTnm0t6wsP3di9pTc6wfuOtQeB5G1kUmNiogaXzlm%2FDB7ae3d%2F9MOg3w6ADvRcYDmfJLECi03to98ztxxRj7yyFBcIDDGhL%2FJBjqkAarvH8PbAGHbg0ycA951pHBkqh2gZ9gSfZ1WSWT2XpxKuPfZrm7oUJzJ9K2khjhh6wsfjT6INMK0lDsoAOz8hlHjH%2FJXh3l1OLH4XpfE%2FamMCr4EN7Hfn6AgE%2ByO0WAIoBz7ZIPnDVtt32v75CEoEnRZGReoTnQyDuKlrowQusjaxH4WyE5lD9A0Wg%2BK5tmR5tmtmNSYm%2BnUmikXwv8%2FXxojsIn2&X-Amz-Signature=0000e556ad3b7e26dee495c3d9bf66d6b2a88338502b768955f2c72ee8685dae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YZHNHEOD%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJIMEYCIQC0PCMmCN52dx0YA0NXSaiRgV7CRXIZ0M4D3Up1GPP9igIhAIAb3AsREdh41545IIfMOGmZEd90dqSnP97IyA85JQA1Kv8DCCYQABoMNjM3NDIzMTgzODA1Igzuy8aJ9TAGehgesLMq3ANip7ejL9sm7YzdvrlSF5BxzzdQ9u61t0EUMQDmKvrEhthhq5MER6cRhaE4LDvdaSzPO%2FMOdSEG5fBma24yGYX85mvZdlHqgmT3FRF1OekSKhSJYbSBJqTYvxiZSbbrxQtest03Sd3TXAOYPStWcmHWZWagLc2%2F3nJe8UaK0v0FFcAmoclK4RCa9eNjrd1WiGRFwsG90SzhrZ3g9uIiN8b%2By%2BoQ1yvWHxEIRelr8xEyiAKoskR38kkDFbomDgfdcc2fgEsasnA1CnfnuptWaxpWY5R6ujB%2Fwj8yd8FC2pIWpCAQErQQfK6HIYSzA0sW8b0AvKeTlmlchdf4H6tixgc0yK2PuE1Tt0opbpOAd4h%2FeHBRYYTo7B5ZM8jGspU0iblvHDj9xGJ6O%2Fef8xqigJatgZHGLcx0F8lCrY7ioKnfl7ijsqi5JnntyOdijGDobnOdCIQnEKhV5rWS456s8jt5BNXkQMkQdJgFZRHxRxTIRYiYF0sOEivK1ih34x6%2BbmiLbHB1RJu2OgiOobHrThBlx49f3wUSzv4aTnm0t6wsP3di9pTc6wfuOtQeB5G1kUmNiogaXzlm%2FDB7ae3d%2F9MOg3w6ADvRcYDmfJLECi03to98ztxxRj7yyFBcIDDGhL%2FJBjqkAarvH8PbAGHbg0ycA951pHBkqh2gZ9gSfZ1WSWT2XpxKuPfZrm7oUJzJ9K2khjhh6wsfjT6INMK0lDsoAOz8hlHjH%2FJXh3l1OLH4XpfE%2FamMCr4EN7Hfn6AgE%2ByO0WAIoBz7ZIPnDVtt32v75CEoEnRZGReoTnQyDuKlrowQusjaxH4WyE5lD9A0Wg%2BK5tmR5tmtmNSYm%2BnUmikXwv8%2FXxojsIn2&X-Amz-Signature=0000e556ad3b7e26dee495c3d9bf66d6b2a88338502b768955f2c72ee8685dae&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RRL6445%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050931Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIFVDUE6Dai4zlQTUzSCTszZk2dafZ%2Bhb9HaVKzQOAovSAiEAjKBUNERkjQFox3fvUYX%2BkML8u4AFdk%2BAlmDJSzn5qXwq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDCBsJpikc01iBzrdjircA6uK5I5BHaM9cYn4qB30MHwAA0mwFSTi%2F9CvsnnegPyk45EyT%2FLti9Psb7w0eQGHCF%2B39sskw3%2F%2FDut8P52%2Ftb4t80fldTkJSnb9OI%2Bu5n5Vc%2BRG2nH6WYFAatjrLp3xijeR7gU7Ryf2IiKRmixyUoEclBKG1m2%2F3u6uSZiR79nQsOtceVwtP3sE%2FJTDo1C2pWgRpZc8v1pV%2FW8BrvZUBx8eHAP5V48g62CeGXBczyWc2C1vHSBvSdkF3ZMpvFKETzxNTTWAcM8C082qCNMyGLx7D15VcrByPz3zIfZgxmuA5e9Qk0UyPuchrnEWSJK73C%2BD2JnfN1NPC34Q6bK7gB%2BDSfocIcNtxNoqV%2B%2FWPM5e6%2BOA03ER88jN5KMiKISM4wWua9DvoVwEs5snHtjNbeN9IU4yk21upeILyv4nQrN3pSg%2FS9z6aupgPIpc1sZ0b58oV1tjKU2coFhrP9UlFkMqhtv6s43L1gwto7QqqyVC%2BbUkjBPkm9hroIhqLjI8dBj2hu3rO7qX9OSM9Hn9bw0vvzLGQbdrqcYX9w7meqG8VUG0nqKgDjlrtSr34kKqLbxwa26g0%2BZzRWEjCS8RY5KhV30UumbuNCBFN%2BYoiEhWKkfNhE3SgNVPEU9CMPuEv8kGOqUBssLUlTlro3kmzCoiEpVerJm7BlRMKHu1gbh90NUTwlwmAP5ynkuWrT3ZGinQm3KIe61hxQRUNNovP%2BFsuP2omuebJ5re%2FOYtKlNU7s2cViThEH%2FOIDMPivEQkW%2FyGmXIpm56HDQoRClGE9jNSDDCharHPMJSJ8RF1e6z69AtIelWmlw4K%2Fqvpg3MJGinq63%2BwcZvrpMKFm4%2Bq%2Bjn8uiFb3QgsT%2Fv&X-Amz-Signature=bdc83d5dbeb205dad085277b1e001b050a5d0e91b0449140ee45c7842bcd0348&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTFKBDCW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQDOz53OqukNNvFTmFXNZ3c20TY%2Fr1Qw9tp4Nx2D3hNBRQIgP2KpnENF92hF8ZMr3lVsdViB%2BjeKjCETzGx6dV5K%2F7Uq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDHrGIlY86tI0vYIzBCrcAxnlNCH6hfY41mypV7XRif1EcrkdINK2Dl0sp6%2BJOoSgnYyf0pW9eU0zyP9wxMBq6gkLicHzEndfI61m9WoTPcvhISzoOhap5BeuTpdcNgzWr6zjOmeaT41Kug455UQaHIkA6nVGu1PZR1vlaGlZKVsj2n6VXxKIlWwwqwxsW8eXSSISdsvCfeqrvm1R9maSNAh%2F51FQ1kqhnn7irZhX4%2F7S8gFmdINhS4B3lv%2Fibn2E8PTAY%2FMEbzTzK8YThYNkYh%2F%2FAISDNlucCl3TxVoMBT0yyvWrDCGELRD1xEaGINYb0Usw2i%2BWiVpr1e4APm86Mq9g%2B4B11uv%2F7UzQ5jaA46oWXJiiUu%2FWRvikUv9KXQY01RNefsy12ie4fMy2H1DyDwie6Ra%2F0Shq865G%2FHKspTpZFPFOzn7P3rrj6Pt0QlQ5u5gKm7z391qXwO2FYjq1jx8rIHeKZkDhUrU%2B%2FmW3d8EQQVltDMxgUjYoxm4ZUiA97qqFbFceH3QiYyFFmx8kjRsHZbDkU8%2ByVccTZPOmqkjhqfGJFNegDSu9GlseKIkmYEerMO6ji40QW3E2TQXkuj6A3t0KQs63AvQvBuMNcehNKI5ILRuXDZerjWjjtfTv0ZmTPfVrjwGivM4jMPeDv8kGOqUB9B%2F1KRdbd5x%2Fhyvy3GH6Y0fQO13%2Ffm%2BB8wV0zhSTaa6GT3xItPwNMNb6nbB%2FxqAF9KpHm%2Bsb98r73F49BfYGYW4Y9rzKxAww9KZCAqNFuxRh6B9jzfsS9oUs%2Bhi%2FsvhrlsFQHUMgkbi%2FkbZSA8yACCJIt9gid7oo%2Bzxjo2ZhiURmdh9V0eWUPi2bQRqSr17iS%2FW4garU1QiZnFRxoqbuooGO8pnL&X-Amz-Signature=3aba7dd49ef665d90a36791a9c960e8f6afb15fb75f39fd35afa2bdef34b3bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZTFKBDCW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T050942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEF0aCXVzLXdlc3QtMiJHMEUCIQDOz53OqukNNvFTmFXNZ3c20TY%2Fr1Qw9tp4Nx2D3hNBRQIgP2KpnENF92hF8ZMr3lVsdViB%2BjeKjCETzGx6dV5K%2F7Uq%2FwMIJhAAGgw2Mzc0MjMxODM4MDUiDHrGIlY86tI0vYIzBCrcAxnlNCH6hfY41mypV7XRif1EcrkdINK2Dl0sp6%2BJOoSgnYyf0pW9eU0zyP9wxMBq6gkLicHzEndfI61m9WoTPcvhISzoOhap5BeuTpdcNgzWr6zjOmeaT41Kug455UQaHIkA6nVGu1PZR1vlaGlZKVsj2n6VXxKIlWwwqwxsW8eXSSISdsvCfeqrvm1R9maSNAh%2F51FQ1kqhnn7irZhX4%2F7S8gFmdINhS4B3lv%2Fibn2E8PTAY%2FMEbzTzK8YThYNkYh%2F%2FAISDNlucCl3TxVoMBT0yyvWrDCGELRD1xEaGINYb0Usw2i%2BWiVpr1e4APm86Mq9g%2B4B11uv%2F7UzQ5jaA46oWXJiiUu%2FWRvikUv9KXQY01RNefsy12ie4fMy2H1DyDwie6Ra%2F0Shq865G%2FHKspTpZFPFOzn7P3rrj6Pt0QlQ5u5gKm7z391qXwO2FYjq1jx8rIHeKZkDhUrU%2B%2FmW3d8EQQVltDMxgUjYoxm4ZUiA97qqFbFceH3QiYyFFmx8kjRsHZbDkU8%2ByVccTZPOmqkjhqfGJFNegDSu9GlseKIkmYEerMO6ji40QW3E2TQXkuj6A3t0KQs63AvQvBuMNcehNKI5ILRuXDZerjWjjtfTv0ZmTPfVrjwGivM4jMPeDv8kGOqUB9B%2F1KRdbd5x%2Fhyvy3GH6Y0fQO13%2Ffm%2BB8wV0zhSTaa6GT3xItPwNMNb6nbB%2FxqAF9KpHm%2Bsb98r73F49BfYGYW4Y9rzKxAww9KZCAqNFuxRh6B9jzfsS9oUs%2Bhi%2FsvhrlsFQHUMgkbi%2FkbZSA8yACCJIt9gid7oo%2Bzxjo2ZhiURmdh9V0eWUPi2bQRqSr17iS%2FW4garU1QiZnFRxoqbuooGO8pnL&X-Amz-Signature=3aba7dd49ef665d90a36791a9c960e8f6afb15fb75f39fd35afa2bdef34b3bda&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

