---
layout: post
date: 2025-12-04
title: "[논문 리뷰] Deep multimodality-disentangled association analysis network for imaging genetics in neurodegenerative diseases"
tags: [MLMM, Alzheimer's Disease, MedIA]
categories: [Paper Review]
---

Adversarial Autoencoder를 이용한 representation imputation 논문이다. AD와 PD 두 종류의 신경퇴행성 질환을 대상으로 연구했으며 metadata와 SNP 데이터를 이용해 imputation을 진행한다.


임상에서는 SNP데이터가 없는 sample이 대부분이라 실적용에는 한계가 있어보인다.


---


---



## Introduction

- 신경퇴행성 질환, Neurodegenerative diseases (NDs) 는 비가역적 신경계 질환으로 명확한 원인과 치료 방법이 부재
- Multimodal image data는 상호 보완적으로 진단 향상에 도움줄 수 있음

> **Image data**

- sMRI는 뇌의 구조적 변화를 파악하는데 효과적
- PET은 amyloid beta, tau 파악에 효과적 (AD)
- DTI는 white matter 변화 파악에 효과적이며 PD에서의 인지, 보행 및 자세 등에 관련
- 이전 연구들은 IDPs, ROI 기반 feature extract 방법 사용
	- IDPs 추출의 경우 전처리 비용 높음
	- ROI 기반 연구들이 주를 이룸

> **Genetic data**

- NDs 는 유전적 요인과 관련이 있음

_**→ Multimodality로 image, genetic 사용**_


> **Challenges**

- MLMM (Multimodal Learning with Modality Missing)
- Common and complementary information in multimodal data → 데이터에서의 공통, 상호보완적 정보

	_**→ modality-shared, modality-specific biomarker 탐색이 multimodal imaging genetics의 핵심 과제**_

- image와 genetic data간 관계의 복잡성
	- multi-genetic, multi-imaging
	- correlation among genetic data, correlation among imaging data

> **Proposal of DMAAN**

- Deep Multimodality-disentangled Association Analysis Network
- End-to-end framework
- 3개 module로 구성
	- `Multimodality-disentangled module`
		- multimodal image data가 encoding되어 서로 다른 modality의 latent representation 얻음
		- latent representation은 common과 specific으로 분리
		- self, cross attention 통해 유용한 정보 추출
	- `Association analysis module`
		- potential genetic representation 탐색
		- imaging data 와의 연관성 분석
	- `Disease diagnosis module`

> **Contribution**

- multimodal imaging, genetic data의 비선형 관계 모델링 framework
- MLMM 문제 처리 위한 learning strategy 적용 → disentangled representation learning
- 외부 dataset 이용한 결과 제시 → 일반화 능력 향상

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EFJYDI3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRoDr5JKDn4CPnVTs8RrzSVeaM0d3wRnAdESye2KMK5QIhAJv9N0s8%2FLmFJBsrkp59ipA7HDYBRYfT%2BSQothY6OWrDKv8DCGAQABoMNjM3NDIzMTgzODA1IgyQE7BuJjsKsgY4DDMq3APOJyRC90GIold0ty4IYT%2BO9QY16XlUvgly2ILuPUGye3hvA9hpqQgxR%2BR22pgCQn18BhlUng2sX6U0jJ6MClC7gh5c0iuGjkkGdM2qLj4doQKNW%2BL1afucMFsfLDjtsMYBfLGpuK9eKzPk7szB0sW3lEAc7gc3W0Yrj75Jnjw1fjgFTVYzDzNANcAq%2FZcZbeYiQA3cd7nk%2Bx63og7DwU06JXX7jIapD8zHeZ7YSFQScPROnrdqGW%2Fb4mOi5AMSuk9wcsZ0Z5b7gfl6oZrLpBNDhjBjGhRLoKIdiyZVh6ikktz80C5EJcvAXf5itvFAvtwXlV1MhQwNdrCITo88K9MvburdSQ8Q2%2FgJzB0kqIvR59SlrTPY9OMoM55tf4VOiNtqijIk0dOUVjYA46xB8iTTfCvFkArgzLhhXPdjcZDomwIt%2Bvq%2BdYMkGs5KHCwZF6UyZJkcrIXrVV9T0LbMqrxmJkCw4v3MQb6p5yeC%2Fpkk0F1NyfHMjpFgvGSa8wVvCV75fHwcG7xtl8c5QU7ocVC9zoazaD2fgkbOrn81XVK9VzSVd4vHI6v5QW2t9o5WES6cfGTcWLCT9%2BPuGNBopc1L0%2Fvzz8UaZYKBlrl6McI2g8gdKYlPSgxdVuS%2FAzC1%2B8XNBjqkAXenDNCxvb4JEwKle8Fzc4PC8J%2BEkaCsiOSmtFBXUq9YRGuIHiA5iiu9H3xc2vvQgqA%2BYqUMvY80CeGZHwCQp933gsD6UFjfdH7zRo9Kab1aHGdH5I%2F4bggMU%2B9KppfnVsju9aP9n3wSsFC1hHPYbW%2BlNPzHQkpvRDbHYxQRxIeWenMUwhTZOEfFRRDkUOVLPGvHQLTwH0rYUho84XSELd2n6dxE&X-Amz-Signature=db4c84b846ac9814096c005eba3f571f9a19bc5ed0ea1dba129e2573b5978745&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667EFJYDI3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163601Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDRoDr5JKDn4CPnVTs8RrzSVeaM0d3wRnAdESye2KMK5QIhAJv9N0s8%2FLmFJBsrkp59ipA7HDYBRYfT%2BSQothY6OWrDKv8DCGAQABoMNjM3NDIzMTgzODA1IgyQE7BuJjsKsgY4DDMq3APOJyRC90GIold0ty4IYT%2BO9QY16XlUvgly2ILuPUGye3hvA9hpqQgxR%2BR22pgCQn18BhlUng2sX6U0jJ6MClC7gh5c0iuGjkkGdM2qLj4doQKNW%2BL1afucMFsfLDjtsMYBfLGpuK9eKzPk7szB0sW3lEAc7gc3W0Yrj75Jnjw1fjgFTVYzDzNANcAq%2FZcZbeYiQA3cd7nk%2Bx63og7DwU06JXX7jIapD8zHeZ7YSFQScPROnrdqGW%2Fb4mOi5AMSuk9wcsZ0Z5b7gfl6oZrLpBNDhjBjGhRLoKIdiyZVh6ikktz80C5EJcvAXf5itvFAvtwXlV1MhQwNdrCITo88K9MvburdSQ8Q2%2FgJzB0kqIvR59SlrTPY9OMoM55tf4VOiNtqijIk0dOUVjYA46xB8iTTfCvFkArgzLhhXPdjcZDomwIt%2Bvq%2BdYMkGs5KHCwZF6UyZJkcrIXrVV9T0LbMqrxmJkCw4v3MQb6p5yeC%2Fpkk0F1NyfHMjpFgvGSa8wVvCV75fHwcG7xtl8c5QU7ocVC9zoazaD2fgkbOrn81XVK9VzSVd4vHI6v5QW2t9o5WES6cfGTcWLCT9%2BPuGNBopc1L0%2Fvzz8UaZYKBlrl6McI2g8gdKYlPSgxdVuS%2FAzC1%2B8XNBjqkAXenDNCxvb4JEwKle8Fzc4PC8J%2BEkaCsiOSmtFBXUq9YRGuIHiA5iiu9H3xc2vvQgqA%2BYqUMvY80CeGZHwCQp933gsD6UFjfdH7zRo9Kab1aHGdH5I%2F4bggMU%2B9KppfnVsju9aP9n3wSsFC1hHPYbW%2BlNPzHQkpvRDbHYxQRxIeWenMUwhTZOEfFRRDkUOVLPGvHQLTwH0rYUho84XSELd2n6dxE&X-Amz-Signature=db4c84b846ac9814096c005eba3f571f9a19bc5ed0ea1dba129e2573b5978745&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YQ4HS4A3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163603Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5kT5v8%2FvqHMpM%2FBsBmgMsQ5l2i11uNYHnIuBVsD4HygIgE%2B%2F8P9n6UFmtXVYA0ZCRuSZ5c%2FJlQAw7eT39atSe7fsq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDNbL4zwyF5D2oeL61SrcA6LLXyULu2sO2IaejK2bmF9WL4mvXIKBoD%2BrwZP%2F4q7dMt135kHqe75wYwcM07FI45rQutyleio9OHZKGv%2FL92qYKys3Hh9cPwD9IzNm2Ma4LK8NXoZGKQe6Moxl5apvKH9xmx%2FoX76qEK9h7Jend7jQ6I6imRqkJl%2ByUpTV14hlbULc15YxakJvtjlkBBXRSi1fThXVsexL81n23vk9CAxdqIJZJAcc%2FqSC0Kj9jPKKhgLGVEbZyhHrEVJTfG8XAJxyPLmjPv9sMgO0mImcGSdacQVVHNUaI8g%2B3PvKjdC61r4u231nHaMJPpf0MWfWn90XVD%2FKx6pcqN%2Bz6q8pQ8rSE8ijg6IRwTK2M31MVf3gDwt4GG13KuNEMvYqM6VUf8r9gHXc8tSaHq73ul7wT%2FPy3ZXja%2FCxZwLmh%2BYaH2NSQV7ciwo9Bftvbf1ADNs2F9iTpGjZsRD5nzL%2FW6gGt7IbQLvuBtKri%2B6N0wBlqthrfX0tJjm4NwKryOnp6TDdD80ofRVHFXQGCWugjNt63GaHG3scFXfmah%2FlvjrRet0F1oKHWzSexUhOUbZ%2F7WXKhW6wZaJfmZe5k5gJ%2F0z3PQuyxi2sv6HLCCM%2FtCW4lVb57dsF4aJUXhmf%2BWytMNv6xc0GOqUBhsQTb1%2BXZjCcs40NQWoZ4f4ncOQDexWu3F6izZgamr%2BNPHEK3SPRtrlyvXjNmFtmS5dnJ%2F3rLQhsG2nS9iIzKQTF6Eb5Jq8eCf%2BeQUtzyNEJrazxRJdKaiP%2FzNMfx%2Fnz%2BYZuPtA%2F5MpQ6SxCVfOJm1UKBvq6uO9ueH5SHEyyFbMphJ65D%2FIqL5UZEKqmdJYA%2Fl4wiVFOZbdongeEajEt%2FYKICJXU&X-Amz-Signature=80569c72b637cd9df9e5ebfe8c3d354a95a44ac7595f3e9468e8b9d2d2789b46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Multimodality-disentangled module

- `Adversarial autoencoder, AAE`
	- data의 posterior distribution을 pre-defined된 prior distribution에 가깝도록 강제 

		→ prior distribution의 data는 쉽게 disentangle 될 수 있기 때문

	- VAE, AAE 모두 distribution 일치하도록 허용 

		→ AAE는 prior distribution의 정확한 형태 얻을 필요 없어 채택 (data manifold 포착 능력 높음)

	- Encoder, Decoder, Discriminator(shared MLP) 로 구성
undefined
> **Flow**

1. `Encoder`
	- Modality data \{x\_i\}\_{i=1,...,M}, encoder E^{Img}\_i 로 입력, latent imaging representation \{v\_i\}\_{i=1,...,M} 생성
	- v\_i = E^{Img}\_i(x\_i)
1. `Discriminator`
	- _**Adversarial learning & Discriminator learning**_
	- representation은 Discriminator에 의해 prior distribution(Gaussian)에 근사하도록 강제
	- Discriminator는 MLP로 구성
	- multimodality에 대해 shared parameter 가짐
	- v\_i가 prior distribution 따르는지 판별

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVVYY5Y3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiLwLHnMOhnTGnjwcIwLi8N1KuULIVGD%2BbLVQ%2FR1PPnwIgUh%2FDcqczKlzSD9J9Y3YDM4gHTIX5M7S7sPNznTuV0kcq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDLY7RDQveB8LznL1QCrcA20TI6Z0kYCCChhX178HCUo6QvZke8a%2BaJLsaLBBoN688%2BUpcslo%2FqTgtasps222q2%2B1ldIzUGl%2Felk%2FiWswJV09JlkcKuzbtKBpFT38twCkYvlriiXF7KbP9oJFR33xhud3dDRCyT3OEyibP1h5nWOakKJdONn5gjci3cEv6AVQRKvjmUgk78BfOHjacBgp89KkfyTv3DZBbzGxadMQFE%2BGESld1YcewVwItOfO9ppHJylBV%2FjcWKvEOVQe3V6B%2Bw6VtMGv5tzhioMbkpIY4PwKOxWobfdE2Q6hsvaV5TSS6gyt1QruArqNAHOC8vQg7E9mo6xzTyQnhAHhftwgeZtjKQJmQTzPnU8xKyO1Djd0WeOtJCCLMxujtAz5xZvnGUZT02NUFHh5mg1JtLzvD1tcUaq1FFB8NQ5hLnfVakG36UcT5Rnxp%2F6i30mbNTem9VFobfSoIKK0%2FURRhEgO0i48EQMMhsEqv7tz262h6ce5l42cAD9ZKxhTo8FrbVllGlN%2BU7kyblmeb85hN9lB5ozfZatt%2F6yeHfHbvTfUAmLnPeR4l%2BsN40TRZbG2Yh8tLmq0zu956AO%2BSPNLrxP7XDb9kH8FemW8tkI2tfENq0DcIYsndbNB2WXT6HZyMMX8xc0GOqUBcCLSEIkPLttUPvIO0L7PvEoHYxbKj%2FFzVupIvBWpAtnNIjurE8FaQ8egWJMZtP%2FL90vhcK9NTyjFwlRGzGMyoF3dNn95Wz53BvL214iKDL8ink2nKU9pL3mNVIk1Y78z3NCK5FC%2Fj7uQvRnP741JUPJhpVxy34RchNP7w5kw7ZZOLVF49taXSp%2FxoGQ8FJdYkvuwjxAqk8ynJsRehgyJoxfdTmfp&X-Amz-Signature=658bd648693314afe2b83fd65e30a2123a18e8f3bc6181d49e6d1735b5ef1a2d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WVVYY5Y3%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163606Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDiLwLHnMOhnTGnjwcIwLi8N1KuULIVGD%2BbLVQ%2FR1PPnwIgUh%2FDcqczKlzSD9J9Y3YDM4gHTIX5M7S7sPNznTuV0kcq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDLY7RDQveB8LznL1QCrcA20TI6Z0kYCCChhX178HCUo6QvZke8a%2BaJLsaLBBoN688%2BUpcslo%2FqTgtasps222q2%2B1ldIzUGl%2Felk%2FiWswJV09JlkcKuzbtKBpFT38twCkYvlriiXF7KbP9oJFR33xhud3dDRCyT3OEyibP1h5nWOakKJdONn5gjci3cEv6AVQRKvjmUgk78BfOHjacBgp89KkfyTv3DZBbzGxadMQFE%2BGESld1YcewVwItOfO9ppHJylBV%2FjcWKvEOVQe3V6B%2Bw6VtMGv5tzhioMbkpIY4PwKOxWobfdE2Q6hsvaV5TSS6gyt1QruArqNAHOC8vQg7E9mo6xzTyQnhAHhftwgeZtjKQJmQTzPnU8xKyO1Djd0WeOtJCCLMxujtAz5xZvnGUZT02NUFHh5mg1JtLzvD1tcUaq1FFB8NQ5hLnfVakG36UcT5Rnxp%2F6i30mbNTem9VFobfSoIKK0%2FURRhEgO0i48EQMMhsEqv7tz262h6ce5l42cAD9ZKxhTo8FrbVllGlN%2BU7kyblmeb85hN9lB5ozfZatt%2F6yeHfHbvTfUAmLnPeR4l%2BsN40TRZbG2Yh8tLmq0zu956AO%2BSPNLrxP7XDb9kH8FemW8tkI2tfENq0DcIYsndbNB2WXT6HZyMMX8xc0GOqUBcCLSEIkPLttUPvIO0L7PvEoHYxbKj%2FFzVupIvBWpAtnNIjurE8FaQ8egWJMZtP%2FL90vhcK9NTyjFwlRGzGMyoF3dNn95Wz53BvL214iKDL8ink2nKU9pL3mNVIk1Y78z3NCK5FC%2Fj7uQvRnP741JUPJhpVxy34RchNP7w5kw7ZZOLVF49taXSp%2FxoGQ8FJdYkvuwjxAqk8ynJsRehgyJoxfdTmfp&X-Amz-Signature=638f1530e58574487c710bf76212dcfa962b6394ce19bd30a16ce6e0d7e418fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WSZI6KZR%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCU%2BLSTzUxxdqRr295ObhiN3%2FlLMqPkKXDBBd%2BvZIbFwwIhALuzRaPN2Wpbu2jLBbWXp5E33TJ5viNBPPp7srsFaIOkKv8DCGAQABoMNjM3NDIzMTgzODA1Igze5y4E5F4bumVrOUYq3APiqc37RZymscRApP7DJrxdWUSykYE%2FIXbHLRrWjOhuDGIwAXdDkVEOJbOXOjxUsBZY%2ByPF13BqGbG3y1vJaafs%2BRyZBPqVDP%2FSZk1RBU7lWyMu0TUdDbnwzVDrTGenQJkMvLxgUNrH8dPEnFnEIiSc2QTxTyKwxYyKKHdUlIWrLbNHrv5evmte6Q9qBETNjG2fppn8Vio%2Bg6lV%2FE7Z4S1lIYJ9a45OD2%2B6Bem2ReMJEeBj0%2FYeanwAVDx%2F1NMjZA9LliCXSPMbAw%2BB3wP7pRJdppuOked6c1ibXsImRFIJJiBK6VMi159AwYeds8Afij%2Bgo7lNDxkwkjNODEf8Ze%2BPnKxiChwSUWeUV2v%2FKfv6uE6dBFqd7sL%2B94jOrXGaNsO9Juatp7wTlp3P3tz0qzX2HHNO5co6pFAgv%2F63X4BlkiF2MUyI8Yc09bkG6bZCF%2BR2MrYoU8iPDvTslmfDv79i6hdsYaKQhgLIA17QYu9kqfklIj9OT5n7dq5bOTiCbZjD86GDzLBArE0SAA5V4TobiIpiS87hHPCaU1NqK%2F9z18W9VlD7sIOo%2BXslr8Bg1B%2B4xqca4TihO1jDynREpKIIUgU8sv9%2BgDFhnx4Ac7q6kqEWG8VFM5XAGBQYjDC8%2B8XNBjqkARU0vZ9d2KTbbUhnUu4WJQfE1hDX8qg4OEkI36zw4S0l3jcG8nnHrKlinf88pk8UkUx%2BZ6NyX%2BCZ5a%2BUUd4G61W%2FJo%2Bm%2FB8mNpshSw3p6Q1lH0BkQX05dWIf%2F5Sq5yVPalWh%2FOf2NOMU%2BJM0eWic2r4n4TURl9JNm3MPBhID0X3Nz0xpXJKwNU4mtM%2BlxyDBEBdYRTt5tu%2B%2BWJLaIX3T2DMwB8O4&X-Amz-Signature=e759bff9050bfde4f5699b57717476f22aa0ad8ded6f63c852090d9ff39a75e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RXTDIIVK%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAWEHxZwgv%2BmhsPC2IUj1Rvb%2BgSaVdQuNHFG3b4gC9pGAiEAqFOUlXKtEhb1A6wvRaksqVstlamxVclkJZBUnE%2FY%2B4sq%2FwMIYRAAGgw2Mzc0MjMxODM4MDUiDEeJKwJtIf6yfu7ZoircAwjksTx%2B8OtUUgb8bigObGOR4UMO2%2FJnzmF%2BOKMcXGo3jev4PLK1nvVIMGAMbyZ3fQ8%2BRB2dcp%2Ffl5wbMu8%2BaXsI2pD7gDRtu2reJaLAygb7DbaJSGP9zfpYmXuEzD9YvizJ8d2csB5jHnBIP11moF8KlFYmNcy3rkPzj92gY2vXCKlmdwrrVPptgInRtFGitHpRExBH0LubAZvFRBPNQvxrd06FwIewIbfHS26P4BCfVLOfwSYef1tDyc7ZB7MZE9WalGnvRzp8G1%2FMaq38rm37o2gRN8MFusX7TDaoQUgj0%2BIbdoh0%2BvA5Abk7JqBbbjuLLvzZjPYn%2BfoKRHkRQIKdPBNQRwozV0vYxil2VUQhVCsrmoyW%2B34%2FJHyNH2V7XxpQwdkD9GJtyV1rzOG1%2Bq0df9MSHhdVZabctBfXwfHV0hBaNksvdJ96zxTS5%2Bmvn7%2Fuzjhe%2FMxRMBQEZDnrYTnicByNY9k%2Bu0NvRpENfMi9RY2YWXwMZOBzs8JvZUPfhfTP2QckPuyJrFg%2BLY1Dl90JWyvAHqKX6UVIUVG8jsKmNcJnYoiGTS1%2BeFRoIRetfmB%2FdJB0KazUUBrhzib5ZL4UFds%2B4b28vT7pBth%2BBe1S9L%2FZJva9Yrb%2FwZNuMM%2Bpxs0GOqUB69PuWRWlpwCBz0kGKjCh5QNZRG4GzrByq5OEH%2B0jegGY9MuUu%2F4oVDPFzCTkvDWssUSnYuB9KkdbwaZc60KSXkm7FbU3ICOdfHd%2BPcQ%2FW5vIfLWN8%2F2tG0JjVP7UASfqEBnDd4Utg0kWYiF301ZEvAsoxK4CYQEHWnATjPkOoVF1o4iFcMnButwyQMq4PJoBo60cO0Rxzj2KnmVt%2FEh6AUAr4ncE&X-Amz-Signature=9720b28f9e6d6aa5588a30a88cfa32c075dc3d33f86fee593b13476e41882538&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- modality 별로 존재하는 common representation과 현재 specific representation을 입력으로 reconstruction

		→ modality 수가 2개라면 2회 reconstruct 진행됨



### Association analysis module


AAE와 2개의 association network로 구성 (network는 imaging modality 수 만큼 존재)

- `Adversarial autoencoder, AAE` 
	- prior distribution 내 제약된 genetic latent representation 생성
	- adversarial learning, gene representation reconstruction
- `Association network` 
	- genetic representation을 imaging representation에 mapping
		- 각 network는 imaging data의 common, specific representation과 각각 mapping

		> ⚠️ **Mapping?**


			imaging data의 latent representation과 유사한 representation 출력하도록 학습하겠다는 의미 (objective)


			_**→  image representation과 어떠한 연산을 하는 개념이 아님**_

		- imaging data와 genetic data의 association 분석

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666IRKPWAT%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC0Q9T1chPbZS50naVhCouHHMtffHu3F1%2BoHaYWxhYoywIgDAHeZnD8ibmcsFydji8%2F0Pv%2BoOFmwzCW4roMCZdlB6Eq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDOXSDyCJIDCd3%2BOxEircAyfnYuLYzWKMRReR4DgKh4zX8QOCFoxnscVdWKysyzk%2FvqFguyNuW1Nf1DgV36RxADMTZ6jXzNR6P5KkWKIJyfyUFnZRklSpZxWyeo7vTrKnDHUUakV1zfSyiDm7JHc%2BbpZhlUGK1RUrXN9AnZaxbBS7r6JXBJ365Z%2BoP80G%2FVk8jRDtCoh85Mf42%2F5zyFLdhugRTnCV72KA7j0XXJjMejDrb7rLoxS0V38xtLWPH%2Br%2BZhhptVPDJLG0tSwGjJuMi6RRNpFiPWFg8vsUlLPsbfSpmekrFIHgu15diLV7zNjJsOw8UMOXFmkYeHgKvop5pciVuw2BOgg372j3nmCQmbljVI1TEkfpTcxWHo099Q%2FE2FiNZHmwn0vMcb%2FTRQ9izf%2Bu%2B9VvUqc0PLohIW3m5UIj4UPrHv0%2BKe7vx9ICNNlVqbe2Ba1pAE66sM4O4xHb%2By4KXjv1AZeKb3n%2B9EHh1nGZQ8ikFCk79RdIcxZ7g1hApBikkBGXnAd6IjPhqH3zaYpHmZjkKIBYPDltl9jR1QhmxW85Z4dbtbKBHM39wHmHDYzkbvA8b%2B4jk%2FF5T97lcHA2CFAV7WZyl64C%2B0W8JTwKnbPyBOiz8%2B0qeY%2FynHEYaquU8xw5p0ai2uknMOX8xc0GOqUBKMZvEevJiSy%2FU%2F%2BVDF6zG58GKKn74l1e3guY2LXZLxgTx0zuK%2FmG%2FWpnGCqyLaahfJmCG7cj2xqSVnUT3VAnlRwt%2FTRG5CSjEHk8fHdMaKsINVmmaTX0Uyb0MEvfHSswadL7GZOGm%2BippvvjdCaZGGVFGqf7oN0IWXQVmdAoEg1SKc2wNQb7dpBy%2BRYwiMFsGau2cLk0N67Z1RHSJSqvNWGzhTLQ&X-Amz-Signature=96e024f0632db4aff0f1e71fdaca45d4a42d4b7a1facb8f7e9e6cae3d4de314f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

	- mapping 시킨 representation은 missing modality의 representation imputation으로 사용됨
	- mask의 경우 diagnosis module에서 representation에 가중치 부여하는 역할

> **Flow**

1. `Feature embedding`
	- SNP의 0/1/2의 categorical 표기 → population에서의 발생 빈도에 따라 0~1 사이 값으로 embedding

	> 💡 **e.g. **


		trainset에서 한 SNP locus에 대해 dosage가 0/1/2 나올 확률이 각각 0.1/0.7/0.2 라고 할 때


		→ sample의 dosage 값이 1인 경우 0.7로 embedding

1. `Adversarial learning`
	- Multimodality-disentangled module과 같은 방법으로 adversarial learning
	- genetic AAE의 경우 disentangle layer 없이 전형적인 AAE 형태

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUJBX3UL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5EZgoF%2By8T0ZvU2XznSi2WGVZtvxdqBLms7P5kEZq3gIgTCI7b%2BvEucyJzdgNihkNdWq59Kak3RuZ1zZxUik2ipAq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDAoXwUInsGGFEoSXjSrcA3rqoJG%2FRfD16pWSj3X9miSXVwFKm406ifHZ%2FUxx3wW4qPam5QQeYfhQbea5cy8rYWsAgSxfKphwBCKoqdcluO1lu5k4Tw1X7VwZblbM5zeX%2BUDHRxZE0nLx5CdZH6XQ32kh4NFIM1gfuJxRSNk5iJuSlTw7bp%2F5m9zC5%2FPKlg9sfO2gmScF9KAO7R66RB2gxGHBcbFwB%2B2f%2FPpthXA2ddmwOliy%2Bp7ymdBiBOAqPS28cAQT00zHS3ty1VunhRIigvpMJAoiGoa66FFE1ESpCmcfhwVCnmvqOG%2BgubSYvmE13Xw%2B0lihfyCn3R0ix4TeHPDeRrhq6yaVJNjhuaT6nk5X5Dj7IdW4t9%2FEX%2F22yqQd8YLQLvpu862KtDNHDfq9ZVWuIVFK0%2BuopNx5Onre4GwEOIYNOs2%2BwxHkZ1mLtMo%2FmACAaKzomdlG0uTSDm9jT1SqTb6iWu5kc0jxMOrqYKsynJeHaBa7En0qJEIWjTeiT5vPcBoat%2Frjj8fC%2F07fOSxWhwOp%2B8odklN8W2VL4OqLAHKv5i2Qv4OHPWfJBFy9uLvFv9zCksSjZ1CPAOtciF95di0MaM1va0hZTJGpyB50QRQQvC6bpzYLMdCKhm1tKbe9PdftgD70znlpMML8xc0GOqUBe7nnELVEA8ytn33zyBqL5R6s0AAcsF6d5C7RxtaB2mC0pcMdqsf1wKDNshM3z4ETRrm%2FvFy7wff9z8lD95sWy%2BduU0T4vf6oGLMT%2F48IeR4CSJnUpTmwRB2564OhR%2FIIXOrcWNan6G%2FpuEF6mTNgpfqP2Sw0%2BczLca2plBzM0xui5dXvBixDSlnrzr8Asc4%2BLXTj3r8OYx9qL02iGyFV94D%2F6Em%2B&X-Amz-Signature=d34b08b49952a3b57a0dd9a781a3f216f9c1ccb06f993d7a6076253c0aa242ef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XUJBX3UL%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQD5EZgoF%2By8T0ZvU2XznSi2WGVZtvxdqBLms7P5kEZq3gIgTCI7b%2BvEucyJzdgNihkNdWq59Kak3RuZ1zZxUik2ipAq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDAoXwUInsGGFEoSXjSrcA3rqoJG%2FRfD16pWSj3X9miSXVwFKm406ifHZ%2FUxx3wW4qPam5QQeYfhQbea5cy8rYWsAgSxfKphwBCKoqdcluO1lu5k4Tw1X7VwZblbM5zeX%2BUDHRxZE0nLx5CdZH6XQ32kh4NFIM1gfuJxRSNk5iJuSlTw7bp%2F5m9zC5%2FPKlg9sfO2gmScF9KAO7R66RB2gxGHBcbFwB%2B2f%2FPpthXA2ddmwOliy%2Bp7ymdBiBOAqPS28cAQT00zHS3ty1VunhRIigvpMJAoiGoa66FFE1ESpCmcfhwVCnmvqOG%2BgubSYvmE13Xw%2B0lihfyCn3R0ix4TeHPDeRrhq6yaVJNjhuaT6nk5X5Dj7IdW4t9%2FEX%2F22yqQd8YLQLvpu862KtDNHDfq9ZVWuIVFK0%2BuopNx5Onre4GwEOIYNOs2%2BwxHkZ1mLtMo%2FmACAaKzomdlG0uTSDm9jT1SqTb6iWu5kc0jxMOrqYKsynJeHaBa7En0qJEIWjTeiT5vPcBoat%2Frjj8fC%2F07fOSxWhwOp%2B8odklN8W2VL4OqLAHKv5i2Qv4OHPWfJBFy9uLvFv9zCksSjZ1CPAOtciF95di0MaM1va0hZTJGpyB50QRQQvC6bpzYLMdCKhm1tKbe9PdftgD70znlpMML8xc0GOqUBe7nnELVEA8ytn33zyBqL5R6s0AAcsF6d5C7RxtaB2mC0pcMdqsf1wKDNshM3z4ETRrm%2FvFy7wff9z8lD95sWy%2BduU0T4vf6oGLMT%2F48IeR4CSJnUpTmwRB2564OhR%2FIIXOrcWNan6G%2FpuEF6mTNgpfqP2Sw0%2BczLca2plBzM0xui5dXvBixDSlnrzr8Asc4%2BLXTj3r8OYx9qL02iGyFV94D%2F6Em%2B&X-Amz-Signature=7a8d7dc8c102819e5c7018dbda2523c718638575695f6b607473b3e7adf98515&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WXQXTLAX%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163600Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIEHpg4%2F0%2FCFAr6mtZN9F42feUUj7ixuNZG%2BsP8%2FffoqLAiEA%2FMqM0Cv0oYeQ0%2ForcH66sBv4AyC6z3zByRDRmw0DyLcq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDMH5OWZp5FZkOVd3DSrcA4aznIr1ykiPLDBB4FcXxReSMBB0L93Dyi58b1f560AoZNlcLHC56VjrOFOQccyR83cOkRa44ZacPGcTvdMF6rXJG9x3dIocaIy4%2BzBCEVd%2Bd3%2Fwv80%2BlV05KAGZ67FQ16yKCT0P4FwN8W8WSNl5bcofCHWfaOrCvQ9McOgbsOqhsCJavj%2BNfTEiIU%2BNBGUhW8lTsQkAMtROjNs0JQwNx2YTJFWDZKnDyWr8Az20auTVVjfVGbZ%2BwVV2V%2F7su7dXzzCni8ZqAMVVUnXs4yjpM2q8aPAUYNRBzAi0G21HTe0bw4ImFKSUAarQByTrcc6x6XRjzQLxBV9NDi3agmPpF68XGxZ%2FriQqwVd83vUnokU8PJCipE8Rc16NPQCX2G0RPn0ElmeJGPuKHG73H9NEOxD7Q28%2FtOAGvVOsw7VpDKdD21cUDo8mkeHTibKLiTk0cqTqDOIg4TtV%2BJCL5Uquv0z26lUoI56zVd3yK%2BmbmML4JWZTrsLWcFcm12WkreCpUskmqPnn2N%2BfcuhpfnuSqjdoRwDUelAY206hjQN%2B9Nt0R8BJL0DndvGK%2BW4zWX0wDVcKNxRcA07K6uG3HByMAtl1YlblrpY5cfXaeHH5Z3KcOnRgreXrlgZYgJsIMOT8xc0GOqUBSVRjqsRyT03v0ujyaCgo%2B9HvtDVFZ%2FUP13YW3xBxayzsG7kApo5fdia272Z8UEB55lVEzxeQQGpCbb9ZR%2FiQb9Js6oYZOApI4GuzOX4fQ%2FHihIi8T6Vlq7AuPfZr1Bx4nl%2Fv9s3kiQq6cHIVxF6k6emmXk%2FPOuKjTA%2B3HXNwd2Pb6fHte%2FCxo1AemJqODItCHBJqLL%2Btqwyl1MNXYgZUwuXQ1Z6Y&X-Amz-Signature=a545fa22b7c4c6c55330d5cb1f115093c3930f451d930d98acb75c662b134089&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQXR4PSW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDpbpGaMAJaVMJLaAegUktpipO0R6yYXK5PNCrdVeoqsgIgXxo8h16ciRCmNjzsDu7NyQ7TRBMXheY9edu5BWGFYO8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDF9HB21JbtGz%2BNj5JSrcA4E1KNlCN%2F7iHLeuv7DGgPr5H6OyRUsEG3U1AMigYy5I7Coij%2BrOcQjwGP87aIYdVGmIiZjVnKZoKJrLznyo%2FB%2F9FjrWNLKWPlr%2BnVH9nI05xnzK6E2btQcpVSBmQ0AaSPxOVfCq%2FgRbNJqxeVXaslwJGs3cNV7LsTL7zac%2FxyozvS01MHR%2FSZn1DFBzOOYoxY1375pqRh1xrMQdjaF0wTGQ4J%2B5DO%2F%2FHhEBssktFkFI6QFp99AyFg9%2FJFp8qO5TYcvXzD1oSJKOrbYX2Ye%2Fxsh5eECREoQGnr65Ud3Wyf5nXLWyT9%2FKhpGiOfPX%2FrTiOskmnUIokXVemrz%2FAmPRzFWVioyMo8EEdeljZtLSbMuC23S9nlv%2B%2BPPfH1s2XVsGvm8o51hFDNH01wbpvGs48FNxi01boBhnDnkLUtBz1piIngY5Ul%2F%2BYARRDabfJstAL%2BPbRRQr9JQiP1qtbSsx2tvRCClOmCCuWGSReqjBqZhn8uCY2UGNza9G0ncQK0YKFmierHUmrOWD%2F8LxOlg0t6aeM2NNOVwe9fuxzA1Lotleh9rJVxHvgFh3ZN3EAoSBJZN5zwXjy8kdx4z52l1lAY4hMjthY1%2Fmfn3SEXSWptmN8DR5D63MsIXOMUYDMP77xc0GOqUBNqRSfIVvwkVmtTem2bnAAoX%2B28yDc5APL42YmBu0uvURHvrCak7OeBgvxirQ%2BTSKRsvdBXQIurBhCUT19RoIjZfnTn0XF1%2BhecjzCFZLC%2FV7TLcwVJUcRpSwTo7UgeHMcK673W5bnVrKjmWXXTT4FSgf2nLNNvAlYE5L3Mijp0hXVEu%2Fv%2B7%2BRk7Ian7UhDiL9Skgbex8oia3ofTvzgsIAjp8xbPi&X-Amz-Signature=18e9b6e173f7d244cc147aa72c926a614b79cde9e7ac61f3db61685f2830dd95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQXR4PSW%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163622Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDpbpGaMAJaVMJLaAegUktpipO0R6yYXK5PNCrdVeoqsgIgXxo8h16ciRCmNjzsDu7NyQ7TRBMXheY9edu5BWGFYO8q%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDF9HB21JbtGz%2BNj5JSrcA4E1KNlCN%2F7iHLeuv7DGgPr5H6OyRUsEG3U1AMigYy5I7Coij%2BrOcQjwGP87aIYdVGmIiZjVnKZoKJrLznyo%2FB%2F9FjrWNLKWPlr%2BnVH9nI05xnzK6E2btQcpVSBmQ0AaSPxOVfCq%2FgRbNJqxeVXaslwJGs3cNV7LsTL7zac%2FxyozvS01MHR%2FSZn1DFBzOOYoxY1375pqRh1xrMQdjaF0wTGQ4J%2B5DO%2F%2FHhEBssktFkFI6QFp99AyFg9%2FJFp8qO5TYcvXzD1oSJKOrbYX2Ye%2Fxsh5eECREoQGnr65Ud3Wyf5nXLWyT9%2FKhpGiOfPX%2FrTiOskmnUIokXVemrz%2FAmPRzFWVioyMo8EEdeljZtLSbMuC23S9nlv%2B%2BPPfH1s2XVsGvm8o51hFDNH01wbpvGs48FNxi01boBhnDnkLUtBz1piIngY5Ul%2F%2BYARRDabfJstAL%2BPbRRQr9JQiP1qtbSsx2tvRCClOmCCuWGSReqjBqZhn8uCY2UGNza9G0ncQK0YKFmierHUmrOWD%2F8LxOlg0t6aeM2NNOVwe9fuxzA1Lotleh9rJVxHvgFh3ZN3EAoSBJZN5zwXjy8kdx4z52l1lAY4hMjthY1%2Fmfn3SEXSWptmN8DR5D63MsIXOMUYDMP77xc0GOqUBNqRSfIVvwkVmtTem2bnAAoX%2B28yDc5APL42YmBu0uvURHvrCak7OeBgvxirQ%2BTSKRsvdBXQIurBhCUT19RoIjZfnTn0XF1%2BhecjzCFZLC%2FV7TLcwVJUcRpSwTo7UgeHMcK673W5bnVrKjmWXXTT4FSgf2nLNNvAlYE5L3Mijp0hXVEu%2Fv%2B7%2BRk7Ian7UhDiL9Skgbex8oia3ofTvzgsIAjp8xbPi&X-Amz-Signature=18e9b6e173f7d244cc147aa72c926a614b79cde9e7ac61f3db61685f2830dd95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665IJEHYGA%2F20260311%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260311T163625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCGfnl3ftazo0vezy%2BnbOXvzhI5uTyKHZbvTdmII9huCAIgQbAOZ%2BHSRO1%2FMScZVXh1kDGZA80hr3PFCN5W9FQu%2Fewq%2FwMIYBAAGgw2Mzc0MjMxODM4MDUiDPn8%2B0eyh2X0I4eYHCrcAxCyFJB6mr%2BYnoTlBbKHdVmj7VZ5qqM3No9bPuX%2BqF6GbrOWJ7TMtqJyg%2F%2FVRXGidNojt4lGNs9pCU2l4rJ7Efg6b3JDkYQofMYspUppX8TPSnHMeX0q4uW%2F8AAOtupxQJ41%2BDwWZT34i%2F1jY8DItqI2%2FhYwlvDw%2FiF1xV5SJ54H6c9wn4RHDBfRiW1hgqiktL4tdjwradd4BsoOY0tMw%2B1vo69Eu2842iKV13OKCoy0GfNpdz7APlq%2FamO%2BmdG8pPX5aRSZ09az5Jb8MSHJ%2Fg8xB0V55JKcM7q9QrReBWYQwAqcB3HsuojFYp9lFYHtdHtzeufDoityYhBRvqE8zds9yle8p3ufm3XE2UBcpQ9LZ1w%2B8KxrnVL%2BamkJV0bxKlnfLBwmFN7EBX43mA8%2BqNzvVXAjGoWXB73rBmr4Eu4ozDgKwUwBNzZgxA7ZAC%2BK8fDpqB1P5ghRd7kGcc6%2B01LXlIYyQDpvVBbO9Zvwpd01%2FroX1OvX8GEBkBlwOZl6Z3F%2BUwIdZugZU6NVMIPveybfqvCQex%2BNpCl1onHunE4wJ1fXJH2SJZFkb9WvbPlc0ol5hVRWMqlUpgmgKgZ7p5Yc2pi8Z06GxSrPAwAh18Pz3NowiNYvWXbdEa0WMNH8xc0GOqUBITN9rQaiscqOJ3omDfMt19tF%2FHrrKLIZbXjRem8%2Fy21WVVaH9Zk%2FbVmi%2FZPdkqZOXaOIKdL8RZfnhFe7QPKElQns9uqsgHhQt0x6r7RGM5zRDxkNblACo6Io2S1Pax0niu8MpSprlCN2JLyG5Ifw4vx78OxnD3M5LIOOT%2BX4CLAtaYEqLRN4u54Ey5Pg00q0wE0VvTznJIeY%2Fs2sLCZpOZg66BPq&X-Amz-Signature=5f2d91a1ed42e2d52649c72d76d47dbced65caf4c761dca7f145e996490e0766&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

