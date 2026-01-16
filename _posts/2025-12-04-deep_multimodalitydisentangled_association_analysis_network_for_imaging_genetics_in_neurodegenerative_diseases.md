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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666R5IMW3U%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIFxb8yKl%2BIh3YobHsXcOYPXkeHoUrm2DQ5jbpNYPoyPlAiBKIbQTEKqmRZsOHKsJE4QgFkn8FbuiCNgwVIw%2F6yksIir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM0wN8LZL3EvMTDfRzKtwDJ3jxAKeeKeKP9Elg7p8oYbD2N711iO8xAWL4Qkw4K%2Bnf8h7J8JcByL9NQMNorGrJYJuBaXCbN8xuX8rhxzXGjHGiR5Kw%2B%2FSUQVWS0xgwN%2BU65Me60OAFe0Llr0k9j2SAHjNr9Q5A%2BQK8x53CV0kUlK63SKSKmyeL3BxBTEQsNG%2BBXhS%2FuDZzEur0oNuFwYh%2F7Or3lwgmIJKpTb6dvbv6%2Fs2%2BDFEtAdR5S9jQAS4gOgkq1Lzsmp7nWRxVk98ovWMbRrR2opDtW%2B6dF%2BGUVamVmCyqTzTj9P%2FG3QlcWCOtaN%2FnxxggpD2uA%2F4nGy8xW0rkZmjqI6e6Tzun3qQG6R2jTLnsRTsSUxnQWLg7tDIuIyNkaiYmOrKKfxQRTaKA%2B08s9httBoDQb87dMJUQDLo2WXGZkR0aNZ8OL%2F3HkV7%2B7DcN0pz0u%2Bqv18LeBKV0mBRYR8%2Fg4%2FxSjUglopvdH2tOuHmicVm%2BDZBhf6WSXAmUVEODJ28UgnEkM550aAHYwfR77NqLdnP0hjHl1b9Jlw0L4Zw6VF1x3bT%2F3Iih3RbD7DT6MOAbslCtiiw3cHKGeWpg7ht3%2BXPlquluwltUS8cpqe68VP6Pk0qpCIMg4WjDd%2FT%2FI0WNnleBMdL69tYwqrmnywY6pgEkYpw3ZnL%2Ft%2BUNifCVjCQBw3qQ%2BfvRtoJSFATYQ1qeSfhiaaW56cyfsWSl8gkZZh4jnfZlO26Xs5qhZfSpFnC7%2FdRVTBHahGvs9BGQt28ySjsZKxUXs3YD%2BEa19sSxqLMkaqYjUcStcEFFazb0BdHjigOk8mKtpT8sEIPVLUz%2FvOOgM%2ByR68DHmJRtkh9eZaCI6zeI8RV9PLO4gVb9%2BrEPn0MtCPbC&X-Amz-Signature=491d5ff89daf8562e01e04fc802a59554e832c0f3f5aeecd299736093436be79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666R5IMW3U%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIFxb8yKl%2BIh3YobHsXcOYPXkeHoUrm2DQ5jbpNYPoyPlAiBKIbQTEKqmRZsOHKsJE4QgFkn8FbuiCNgwVIw%2F6yksIir%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIM0wN8LZL3EvMTDfRzKtwDJ3jxAKeeKeKP9Elg7p8oYbD2N711iO8xAWL4Qkw4K%2Bnf8h7J8JcByL9NQMNorGrJYJuBaXCbN8xuX8rhxzXGjHGiR5Kw%2B%2FSUQVWS0xgwN%2BU65Me60OAFe0Llr0k9j2SAHjNr9Q5A%2BQK8x53CV0kUlK63SKSKmyeL3BxBTEQsNG%2BBXhS%2FuDZzEur0oNuFwYh%2F7Or3lwgmIJKpTb6dvbv6%2Fs2%2BDFEtAdR5S9jQAS4gOgkq1Lzsmp7nWRxVk98ovWMbRrR2opDtW%2B6dF%2BGUVamVmCyqTzTj9P%2FG3QlcWCOtaN%2FnxxggpD2uA%2F4nGy8xW0rkZmjqI6e6Tzun3qQG6R2jTLnsRTsSUxnQWLg7tDIuIyNkaiYmOrKKfxQRTaKA%2B08s9httBoDQb87dMJUQDLo2WXGZkR0aNZ8OL%2F3HkV7%2B7DcN0pz0u%2Bqv18LeBKV0mBRYR8%2Fg4%2FxSjUglopvdH2tOuHmicVm%2BDZBhf6WSXAmUVEODJ28UgnEkM550aAHYwfR77NqLdnP0hjHl1b9Jlw0L4Zw6VF1x3bT%2F3Iih3RbD7DT6MOAbslCtiiw3cHKGeWpg7ht3%2BXPlquluwltUS8cpqe68VP6Pk0qpCIMg4WjDd%2FT%2FI0WNnleBMdL69tYwqrmnywY6pgEkYpw3ZnL%2Ft%2BUNifCVjCQBw3qQ%2BfvRtoJSFATYQ1qeSfhiaaW56cyfsWSl8gkZZh4jnfZlO26Xs5qhZfSpFnC7%2FdRVTBHahGvs9BGQt28ySjsZKxUXs3YD%2BEa19sSxqLMkaqYjUcStcEFFazb0BdHjigOk8mKtpT8sEIPVLUz%2FvOOgM%2ByR68DHmJRtkh9eZaCI6zeI8RV9PLO4gVb9%2BrEPn0MtCPbC&X-Amz-Signature=491d5ff89daf8562e01e04fc802a59554e832c0f3f5aeecd299736093436be79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662YDLCTVU%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071420Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIFxrImk8ASCV%2BVGtt3%2BhihRxL%2BvDA%2B99Z%2BFIDJum2D61AiBleOSl169RVEUhT9wsVFaaoUtIlbiXEp%2BAmP4BgOFCdCr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMyskAZMmeKDuJ9iKeKtwDvD%2BKltdIvkxS4eRHKYkQ4Nf1k78W4JQZJNHGCKjx3dH2MkU8gUGDrTSkCnlWwRyNidrLsx7V4LMTOsI31PgzVIesRyyZ4YCYqtlfUZzwbEV7gOLlligpQnozzwvd6OdL%2FtnbJFn6ETWIU5TI3QZVf9HSjUhcVi%2FbR2ELY5yKtHExBu6Yp7kjKBuDWxe%2BbPv5Z3fGAzpHxNQ5RLet4dsJEo87xuiWslkKioYbQSPiVc6tqzp3Bkfv97v6RYjtmmkteH%2B%2BS15zarw8F246xin34vbi%2B9kWaFfGawF00GdlsmF8w0oxWhCJEukrxjGgQdOQL6RbJDc5zfn8EIrBGOwk1o95mwdV%2BL2Qtrxsh1jClZjX3fl6EPRK7nONe%2BUPAPRdruq4L0fZtEiPO4FY5QMEPFNp8YE4YkkizpNSUX5jYvMM%2F5DxuMzKez%2BUsSqVdP9RVxsED9VOF3jwkoE%2Bmt0Mkyf7cag2by9zj6sMSLAtErs6lAdY7XWtjIeeX9B2zge63EFkq2s1iRNCpPi1OsTiOmIG7V5hiUEzcrQD3s1N3Xr7Fn5oVN0dfY0W72O8W%2BSm2Z3B17KOKmKsRMyS6Zm3POHmfltwjbmWcVrUyV7BVaGGMB2mjOhiPozNUYswjrqnywY6pgH9VbCIaH4qz32eSDkPBcNSvnVQCCvpoUaiNAmm1SuDkAoo8Am0PZdEI0THrYTx5EnPdX5aURvIPrYMMFCQ9mClH8WFHRBDE%2BnltGleQdL8ZUGSZ3qfzkUvi4tsCS%2Fp3lXPZbR8uMSKEJw3nqgzDIHb594dYYKeiCBM68TJkDcmMe9CYx2Jsu7kK7hQ4fCpIAGg46jGr08t%2BCLDN7Qav0X%2B9hUZ3Emo&X-Amz-Signature=0dd4606fd8e94f0c7058f7b7f04596643c144395531d9a98c8d3a28648a0f12a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVKJYHLW%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIHymd1yJo7AXEYPoPPnc%2BRgFTBZwjbbGokywRbo5VV11AiEAgXT2O7DGS2%2BGhY2p9DZuYuxQKNvFc8nheDMBf%2FYHym8q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDMzW2%2BfJOj7VSst6XCrcA1FX%2BPoWbc%2FxYzKebeAGmXPK1zz27OzXCt%2BEGT6jPdA4SqAquA%2Fjjl4TkJQXqUt8OScgcLfG2O2%2B4vq29By17ZseTqFl%2F5ubEZVcdAnXFXC6xpHWCdqTR%2FmljCNhhLMxdOwnuBE%2B9uYmhSybcRVKP%2BxrH4HLX2OonD%2F3eVwGwwnOh%2Fc957BUWNFaFx1XvzmC1erTBM5TSnvkUevI07YzLEv%2B88beZ4PaATTCstLPOUToFDGxYuZffgHtqwY%2Ba0kkrIeAM3%2BA34w3U17WN5ON51lVY5NzaU8l8HViadxvSpvJWG4bNLH9zaSUeLpy0i31e3NMoFrsbhYZ4xUYrS%2B0%2Fe22TYlQsGmDGtnp4VbapiZfsLuaQ2O8LPDMz0mrFlmK%2F9OEHBVmoR0%2FYGCebarOoOLHMRiqrBR7y5QSCTumsccwy4xnTgnr02%2BeOM4cka%2FKSiKD6oaaql7YLSQB%2F8kH%2B1JUh%2F8igVxPVBFjJW2YSK%2BmVtVdM%2BalRaRGFrigz2CUBC1rWY5q2PvYymzHcEIxwWwO1XGK1H%2B%2BaUjTMF9O4r9lOzi5zku26Bzdno2zn9L8BQfwdAU4mYYAB56Whxsy6sPssgmUaIL55KtF8RuW0a2fTfdm4IUi%2F76njGXoMNS5p8sGOqUB9vWhB8LjKIbaG%2B2yndIQDuKcAxZeIFzqctbLMGDHXJo1XaqbmhFVSrhV1C9V1WkqnFJVJxiHkE2DcV9mQj%2BnpNOQkFGRRETOB%2FBHNa8tMoZSkwS0bIary%2FUizcxkish1GWxuF6ZbVAZLgZWpRSiLkyJrBMgU5QCoDS9%2FNz%2B9xmZIoD4E9KkMGPDWtRFk1i4nvK8uwaHhZbEZRWgYxHH%2BVIxx1jyb&X-Amz-Signature=1547ab134df145896187979ef0f571df9c4cc19ace4c4574c5915f3daa792c88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XVKJYHLW%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071422Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIHymd1yJo7AXEYPoPPnc%2BRgFTBZwjbbGokywRbo5VV11AiEAgXT2O7DGS2%2BGhY2p9DZuYuxQKNvFc8nheDMBf%2FYHym8q%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDMzW2%2BfJOj7VSst6XCrcA1FX%2BPoWbc%2FxYzKebeAGmXPK1zz27OzXCt%2BEGT6jPdA4SqAquA%2Fjjl4TkJQXqUt8OScgcLfG2O2%2B4vq29By17ZseTqFl%2F5ubEZVcdAnXFXC6xpHWCdqTR%2FmljCNhhLMxdOwnuBE%2B9uYmhSybcRVKP%2BxrH4HLX2OonD%2F3eVwGwwnOh%2Fc957BUWNFaFx1XvzmC1erTBM5TSnvkUevI07YzLEv%2B88beZ4PaATTCstLPOUToFDGxYuZffgHtqwY%2Ba0kkrIeAM3%2BA34w3U17WN5ON51lVY5NzaU8l8HViadxvSpvJWG4bNLH9zaSUeLpy0i31e3NMoFrsbhYZ4xUYrS%2B0%2Fe22TYlQsGmDGtnp4VbapiZfsLuaQ2O8LPDMz0mrFlmK%2F9OEHBVmoR0%2FYGCebarOoOLHMRiqrBR7y5QSCTumsccwy4xnTgnr02%2BeOM4cka%2FKSiKD6oaaql7YLSQB%2F8kH%2B1JUh%2F8igVxPVBFjJW2YSK%2BmVtVdM%2BalRaRGFrigz2CUBC1rWY5q2PvYymzHcEIxwWwO1XGK1H%2B%2BaUjTMF9O4r9lOzi5zku26Bzdno2zn9L8BQfwdAU4mYYAB56Whxsy6sPssgmUaIL55KtF8RuW0a2fTfdm4IUi%2F76njGXoMNS5p8sGOqUB9vWhB8LjKIbaG%2B2yndIQDuKcAxZeIFzqctbLMGDHXJo1XaqbmhFVSrhV1C9V1WkqnFJVJxiHkE2DcV9mQj%2BnpNOQkFGRRETOB%2FBHNa8tMoZSkwS0bIary%2FUizcxkish1GWxuF6ZbVAZLgZWpRSiLkyJrBMgU5QCoDS9%2FNz%2B9xmZIoD4E9KkMGPDWtRFk1i4nvK8uwaHhZbEZRWgYxHH%2BVIxx1jyb&X-Amz-Signature=bd02e00616a4cf5f147c48caeae6fcaceb9367a25e4b73502e78d469f6057679&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R4B3FZ74%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDbRkUKLhaqcq99J9oGHcICNixfZxCT2pxE%2BFullEbW0wIhALou6uREG8eB6DHcH9%2FdhXd4ndSkrdFSb7ueVI6co3YlKv8DCEgQABoMNjM3NDIzMTgzODA1IgzhQ1gtNic84PFXb%2FIq3AMQGL4URDmedK3g6QyAVl%2FnyPeqj2mQNdfs%2FYTqIuJz7vkKPvNBLLdlwg3%2FBuM7feAiovdJSnblvs6fKpv92p%2Flq2uXoAUpHxWJLsoUYXhd9pk7ZveiwLMTSH6FhFojUmKgGATVhbNRGlcP%2BDLsYTedwL2tepjsv70L26IhUWDaxu2N2C3076u2yXH8L5CWhy6I1poTrDwbCCtvu1Ir09YtzjLNvEY1Vb%2B6OJszH6oZYSt0k281hQp5%2F6xTgGuLFSL1PpYM%2BMTDm4bm5EN%2B9%2F6dq2FnNR8uBt%2FQgMabpFPnCqdnDex1s9cRNZrc60hhVJHUAWs9ZUheF7QJ8IYWkgFKJuX0%2BgXXImH86fG2%2BTBu%2FxmaZSwN9QNm9mM8UGk%2BV0%2F1yqxtm0kiXaq85%2BhaLQbs706IrUMm6gnLA%2FLi9MSoVIP3G1hddrUS9M3W0sN4zI3DBoys6G3Cbuvtx1BF5KbiXWu0Er1L0HSoCsPJJ%2BVQhwRB40mNqoZsQbsP0NqQpQyYss7vxDq0YyROQ5ct0tmmaj2FkpME87fZjC1BnJCsy0k5Ev6W%2F8xlYWkLd9oEhNNMKka5NxuFUxJjVi317GrAxl1Rc%2Bd4HiJWSLcD6NIKo9zNpY7Bc7B2hgYuKjDIuafLBjqkAaqUM1%2FmseuRI4E%2BxWuBPFoa3gf8BPx6PuqtIwC9V4MfrlYp5knZ4SzQ8QCB8hWHAmk95ueQTZzQP2JWrE9HnjBgCLt3FVAy5fE2ZVNzjacyk970SfUE0qKcjUrvvkGBlRFYig8IcYWhw0lwDPWWEauFEtU85nYI0lf%2BfRbyh2ZAFjTwPOkO9X50lfM56%2BtcIy%2F0TxuTSnRqj6DpjhEK4BADPYl7&X-Amz-Signature=9c2434fe4ee1ba6c9b6f88192254cfe0f057cbd110631ea022139e714c66db98&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VVNDPYZ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071423Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDok9027FpD93DGvurl4VxjBxBqW6nCZvPBkALK04WQBQIgS9QpNgFY3PIjHgY4rxozHNIzb62VyQxFS3jsMhiwYHIq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDH8a2sDiE9l7uFcnyircA%2BFdPgKCut9W7rW83S6CYIEcHzDdHZzXiqWFfePzbtdk87MMyHJjWNkuBwV7EQbLt6dGiD0sbWEt8Mc%2FZTFSy3%2BJkoZZefi46LBssLCzZ7jmwIRz2CqoSyk5DiQJmd1WiFLtqtcSWximpNetN%2BSytVH2A7CabdycmQHJnxSBwPPhuUJGM8v1J0AVhr8noFp2XtBUyn%2FVG0xQltX3HtqxD1Qzz5P1jTqjq%2FzUbIUlbnVZZLTZbkwXqMMzEh4krIm9BNc7TFhF40cxWLTDVkHFKa2fs%2Fll01lT6PIfm0tdxASww8aOSwUtB%2BPp6m0UNCQ3DzDlVqaYfZEWN%2FjI6bQUz7vm8GXIOonRTnN0mRe06w5PQIw1qKHvcodNLIbDts8sFkdUH0zoS%2BUpmIcsy9hEs4jRFuiScXE1uZSHY%2BIvcvDTQy0hmEFuCyWRUgJ1D9D%2FbwxZE6ljhYAKz5OWKEy4ip81snZ5R4GJpJbTVbxtJGqGcYn%2BG2KM1otPxillgVF60JopnxuRrqcKNxo6rpRn%2BKYE2ERZtXggY%2BsS%2FTZBDYLX6FcIvWoBZRP7xoi0%2BnKSYEhu3fbD8QJOtImskPLwZ9%2FkONWpbezzrHoJXarKij3NWA8eUJHZ53hrcspOMN66p8sGOqUBlGodqSTmfI3xWcXgcdunc95PMY%2FEZEZ4%2Bi4UK8q%2BZAGBnqC2GXOtp8cR6f5uRiyUl0zB2pqCCe0ko1eXngLttpgjTMr1KjjlnOY8QzHwGwzPN0P0wgFhTGPb0NlyavDLwSQxmxyx7S3Y%2BvkWKH%2F9mmvncGqOqZaBum4Ft0DlND4jvtY9Uyh4bE%2F6g7jMXBc7gQLLOwsvZ%2FOCQeQC%2FKmeMwgVNRO5&X-Amz-Signature=742a828bb8d48d994c56f931e47c9b667c9e1505cab7c650e08c25d6b116a3e5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZLQ6EZWD%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071424Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCJaGkJ0gRYmxCRcKxmq4Vq7W%2BsKl6IjGn3d74Bz8QwbAIgFTTFlCP5Qm4jkUUkd1ML9PT8ZIEUtPW%2FQjt%2BxaOlcKAq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDHzSuDC3f66Ibq00aircA8ukEg1YU1MTSzUUV7zA%2BcbhM3wrFIn3Ocqnf4dfA56CT73W0sY%2BjPBUrmyHC89P%2BlpIP0cxvEOOsNHkU8QsP7gkZWITh5rWhM4i1ceGompE5Aj9GJlWAWvpemzdcWuhNUU1XHCvqwA%2BKuwN4wM6KYXX2rlkB1LY17N58MIBxrxtx2XOquJjTdFyeRdCJ%2B4DEu6FmnAmzC9tQ5fRVXSlq8d7hIfR%2BuY8%2BA%2F1QXhf7L3n2KPOJfXsx7mLkH8odxFSohxmwBeBDyvgqYjGH2ogqPO2JkjDwbTyJxfA41HgqZEZFO%2FQePyLBzg8GZV6I8fjD%2BM2jnYJ2VBTB4CeAIfE0ly2FILJZ3c3PkXnQK0otSSPfBEQSRJylwj%2Bk9snH1MR4c36SXqMUF1MA0xMo6s9fIBmrYraAxHZ3HEvcbqjzzuq7Y8KM%2F6WH47NxjOvBOxaKSo6qLkKxfFHEhZgwVgJAzEnzUaHDNeIspGAhm5g9T2cRkQxEUrwxbEe5FgdIFGRp19z%2FnKHBHeyMNlVYZy5l1IS7EUSgQv5MRxi5WgZHSmPXjgEaYAuu3ysJUK3APT7Hei3UHm9eSk0vH%2BSIscB0EzcfbbiTgcpd6kJL8%2FZJOS%2F3R%2B%2BaTh6uomv3DE4MOu6p8sGOqUB2aHmXDE%2BYJJ27CcAvUuq4Bh5HnSerJPqzf0baZ8Dpn2coUaWfGFnbNGu5vq6fcPLqCuD26i7gCGQrzppfnQvHzWIuF2CSguC4uZr9a%2ByyaTAsvnJSR2sByePJjb5ZXA30Uw6trb04yXMkNYAr9UyCIHfewOXJiIH62towSD%2FT6UQNGSLq1iUV8uiz9nmp4rKB8ynBN6LGng9%2FP%2F44umR73jjt8%2FW&X-Amz-Signature=6e1e3d76d1c4e635b2e598abebfe2f53b5bc99af1ac2a7dddfbe4b71a96a0f4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWBXUHYU%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIFvEBWsEbyKO4gOp0cuCvWBhf0CwUBXfVXUbjEyMqWN%2FAiBunyn2xc91pFa54iNRg6zJvBn9bF%2F6TfZO3Kj6PAGOPyr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMODnPPlPGRT4prpdyKtwD5iZDG81mRWVSyboQy%2F%2Fz8m2iILwh6AnmgOhc3sRJnNUCB%2FvYk%2F2zS4dAyJCreieeT1y6FvI%2BJnK6hwY9yIF6SnoLoaupbSsf5G6PlvaHeqGGgTQCppbZTDwVdV4L1Qv4FS1B3wOQ4X6geoZ2bXpKMJxEDw1kdDWkyOa4pzbrQORZ956TIG%2Fs%2BVrUQyLYRNDI0Bn2Jsy9Y%2FKm%2BwLce84ua1s7Uuyvh1ZRvrFBhosm12HcQlVFHh9Yx9rjNKAlCFxF2KMNAP2MtWDT68n5QiPi9HwRUQqMSBUG8%2FCMxaA8cIYFHpvJAPgBxZTGVIOFdsEfcb3pBLzIGBCkcpQiY2XcToKCwqqkDFZNDayf9UXTwysIXLYMDWEMVSP%2F472xNspiub9obgPKccpMtWjRMLJGVi49iddlNtCBbj%2FxuBSu0EBJ5TnyucrFP0EMcRXueSKVtlBe9BLkfnAkoq4y5Mf6%2FAfmMgLsH3rDTiJTzDJ5Zd5nLrB%2BlawwXV6WdVbsiF2mQggia8f5VC3a70ppRTxsYU3mwT%2BwdZ7JUs2MU5apbnAlEzbD7mbsyDyoUx7NvipbWJ7R%2B8kWHzMGPgY7yjqlaf21G1StJeIV1zX%2BHWdRVvftE8z7KyW6Q9jUvx0w%2B7mnywY6pgHLfqFkjJ%2BAFHFEzYEKrFacR947PLT%2FkMhuAsDhO5KEQOLDwpZBYCg9QVzrR6A4uyWyhXv%2BCmHi%2FkG5DF0LF0Mh700bSA1yGcGb3VKic4KaLBJoxLi7JDv2gaWaUEirIJWgj1aj4WOBqFlgoMlwQuAfe2OyC%2Fa3BCrdn3Xkcng%2BvuupYXwm6WRlGcHUgT4HpX2WCwCCsQPVPe833q7lK6gWw3dErsgW&X-Amz-Signature=875d5cdc616f97d7300a4b7b66c4545fd42466c6fc36f646bbfdcf8ebd19f8be&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWBXUHYU%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071425Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJGMEQCIFvEBWsEbyKO4gOp0cuCvWBhf0CwUBXfVXUbjEyMqWN%2FAiBunyn2xc91pFa54iNRg6zJvBn9bF%2F6TfZO3Kj6PAGOPyr%2FAwhIEAAaDDYzNzQyMzE4MzgwNSIMODnPPlPGRT4prpdyKtwD5iZDG81mRWVSyboQy%2F%2Fz8m2iILwh6AnmgOhc3sRJnNUCB%2FvYk%2F2zS4dAyJCreieeT1y6FvI%2BJnK6hwY9yIF6SnoLoaupbSsf5G6PlvaHeqGGgTQCppbZTDwVdV4L1Qv4FS1B3wOQ4X6geoZ2bXpKMJxEDw1kdDWkyOa4pzbrQORZ956TIG%2Fs%2BVrUQyLYRNDI0Bn2Jsy9Y%2FKm%2BwLce84ua1s7Uuyvh1ZRvrFBhosm12HcQlVFHh9Yx9rjNKAlCFxF2KMNAP2MtWDT68n5QiPi9HwRUQqMSBUG8%2FCMxaA8cIYFHpvJAPgBxZTGVIOFdsEfcb3pBLzIGBCkcpQiY2XcToKCwqqkDFZNDayf9UXTwysIXLYMDWEMVSP%2F472xNspiub9obgPKccpMtWjRMLJGVi49iddlNtCBbj%2FxuBSu0EBJ5TnyucrFP0EMcRXueSKVtlBe9BLkfnAkoq4y5Mf6%2FAfmMgLsH3rDTiJTzDJ5Zd5nLrB%2BlawwXV6WdVbsiF2mQggia8f5VC3a70ppRTxsYU3mwT%2BwdZ7JUs2MU5apbnAlEzbD7mbsyDyoUx7NvipbWJ7R%2B8kWHzMGPgY7yjqlaf21G1StJeIV1zX%2BHWdRVvftE8z7KyW6Q9jUvx0w%2B7mnywY6pgHLfqFkjJ%2BAFHFEzYEKrFacR947PLT%2FkMhuAsDhO5KEQOLDwpZBYCg9QVzrR6A4uyWyhXv%2BCmHi%2FkG5DF0LF0Mh700bSA1yGcGb3VKic4KaLBJoxLi7JDv2gaWaUEirIJWgj1aj4WOBqFlgoMlwQuAfe2OyC%2Fa3BCrdn3Xkcng%2BvuupYXwm6WRlGcHUgT4HpX2WCwCCsQPVPe833q7lK6gWw3dErsgW&X-Amz-Signature=f6e550c6f8739335a76059c7481974a9998431b7d03be43a22f3caf450e12323&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UDO2KNRB%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071417Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQDGvGsmAQ3aW9Q4nGApEJis%2B5FWkKwlB0luFTYxtAEiTwIgQh4wMoE%2Fg2D4ZwF9e2BLaZ65%2BXMnembbma%2Bf1OUjUfYq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDHQden5zj28SKfb6HCrcAz3XqhacLXyX2nxTWGHjTQjNeSHR%2B9ojPxGmfdoMq9rXpO%2F1UVPPZXEWLw84HKXlbqU7GDK51IvlwiRGqTuFlNUqP4u01duaMvSqlMW3PwEDYFHfdJrxWABEQQ%2BE1Sv36oP3ckRVouDpdGLkIOaG2FgLqpMswG0Ig0ntfvyPbzRylg3LgkiEmZNwZ%2F%2FqXSIClL%2FYOoz%2B8DVhywSiORx7QsQMDk%2BRQ%2BJg0fcPH66QoclgP9On2DBxEf2Q28EgrGs7PUqFbo%2FceQXJ9REsVzTUJQHJheu5wBjUVu2hyHDoBHmR%2BU7VpGSNAYXOSYzE9b7uy73GR82hIduPsK49mcg19RjpwRwXXk8lbvzjUeo3S4oGkYttRSqfTJ%2FDVhjS1sXIoBCxDSgthXEZY%2FEgyPmBxXKQaNWClY6rFy%2FgDkNHTZFGn5qHZsLFSxzY7wDRrEAul7wtqW4AF%2BhPzP%2Ffuslggm8La17zS%2FwYHlFarmZAmFGuOAJbGa%2BULunPHei8oQhyJtRZQ1v%2FZc%2B0sv52uVYYdv5dNvQSYcqFc1Q%2F%2FRYrNl%2BqcflWQ4kNB4wCb5WBUqEtjYx87Csd06EhkWcSyrZ6loARbSvxdVc21BDFMylnfh7nbyzyS6fHo9NQY2GtMJC6p8sGOqUBgEGudGKNYCgK6r8tndg1zT%2Bmks1qbEGSbTTUyGJtKCAIKhqrB25K1Wg21Xn%2FZ1yPOFt78vCLlxg1fSZd4Q%2BAKeUIcy0Fkng6rbAAlDO01n8Qi6DWg6v9V1xz73xpZcHdbuObjcLh26Lc7SuQeLhpcdqgoMg0SnfNLJAuGzfrJIfxzRTGD7xlDJY%2FhNnYXLSb1wmlirOtiCVXfemF8juFpF%2F3%2FM3m&X-Amz-Signature=b775567a1e7dd8ab018d8655ec49418660cd22412a1fabc6ad77112dcb576785&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGRZECFQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCfNrYpWaACnXlxDYhxpgHwmexYk2l6sXpFDzcssR5MKQIgK9YjOZtKOmy7delJkCXvhv5%2FEjbpuC3t5lQy0uX1ZBwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDBapIncJx9LKDd9YRyrcA9EUdmBoc5gMgNRWoJSUxYu%2Fx8u%2FezFnJHNPl44GYM5XvQ92TZcW00KrooH4x2hTg0YJrnkv05pkshta5oiakyJVSIG9G9eOobQaai6S4O%2Bw9pC94ZaIDsYMvLfvuP9fgRdLtglOnEx9rbZZ59XCx38HYEBynvI3RmKXA4ESVm7SonOm3FIPUJAAnoxrazStTqottcLW63gRMRd6T8lzvlAedAZtD3xlp2nWq41Wrmg532vAZ3bbpdNsMc7SBvWLBY4fN5t8wlEDS87osMg8e9SjRxXXf1Bl7XEazBZArurol%2FdQtmGKVuyyxrA1VMaNL1khXiuraJe%2BRfgKu5DFfXpOa08BAHWuKjl1Qi2CJi5KN5szfM%2BczMwsDwm%2FD54ghhYPVJXICFkxhl1M3QfdXFdk18qx0304ufGcu9Acqraz0XYFuJCJxfMuaJAgb4R2LN8GsYmeX0kdZ7Kkb23cOuv%2Bon6PTPX9vnHPxnT%2FTkmmaO4GQgy2WOsTv4Oe3%2BX5WU9YzlS0hWXmSGZ%2BHnVQF78e2WxrtqrGJ7DyhB%2FxiIillXafTDRXNV%2Fo2KxiewAr2VeBtRZQ3jRcklQOSFtb2jQXiESeMQ95aakWe5u%2FlBlNgxR8y89D19k5eXQoMNC5p8sGOqUBpNZftq0s%2B%2FM2CDReogUvFUpvb0k3%2Fe0BeYajKk%2BA1rnMNbVCHOWIohOH063nu4Ws4tqkHrqYUJzvidodKqeP2U66tAPWRkxEgfsifYaHpHuf7HGH557KRyx7UsefpFDXFtzZeiajlZjR%2Bad%2FDqzHiEdpXDablHm7x6ZVUhyTEhXhnRN%2BDPxs719d6%2F%2B2Soz%2BwlNrEAmkkumkPZm1cANcjPmMUoId&X-Amz-Signature=da8a3b6bddc1cba8e9943ed4b4aa38dc809f91c8435798de4b5aef810fadf975&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QGRZECFQ%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJHMEUCIQCfNrYpWaACnXlxDYhxpgHwmexYk2l6sXpFDzcssR5MKQIgK9YjOZtKOmy7delJkCXvhv5%2FEjbpuC3t5lQy0uX1ZBwq%2FwMISBAAGgw2Mzc0MjMxODM4MDUiDBapIncJx9LKDd9YRyrcA9EUdmBoc5gMgNRWoJSUxYu%2Fx8u%2FezFnJHNPl44GYM5XvQ92TZcW00KrooH4x2hTg0YJrnkv05pkshta5oiakyJVSIG9G9eOobQaai6S4O%2Bw9pC94ZaIDsYMvLfvuP9fgRdLtglOnEx9rbZZ59XCx38HYEBynvI3RmKXA4ESVm7SonOm3FIPUJAAnoxrazStTqottcLW63gRMRd6T8lzvlAedAZtD3xlp2nWq41Wrmg532vAZ3bbpdNsMc7SBvWLBY4fN5t8wlEDS87osMg8e9SjRxXXf1Bl7XEazBZArurol%2FdQtmGKVuyyxrA1VMaNL1khXiuraJe%2BRfgKu5DFfXpOa08BAHWuKjl1Qi2CJi5KN5szfM%2BczMwsDwm%2FD54ghhYPVJXICFkxhl1M3QfdXFdk18qx0304ufGcu9Acqraz0XYFuJCJxfMuaJAgb4R2LN8GsYmeX0kdZ7Kkb23cOuv%2Bon6PTPX9vnHPxnT%2FTkmmaO4GQgy2WOsTv4Oe3%2BX5WU9YzlS0hWXmSGZ%2BHnVQF78e2WxrtqrGJ7DyhB%2FxiIillXafTDRXNV%2Fo2KxiewAr2VeBtRZQ3jRcklQOSFtb2jQXiESeMQ95aakWe5u%2FlBlNgxR8y89D19k5eXQoMNC5p8sGOqUBpNZftq0s%2B%2FM2CDReogUvFUpvb0k3%2Fe0BeYajKk%2BA1rnMNbVCHOWIohOH063nu4Ws4tqkHrqYUJzvidodKqeP2U66tAPWRkxEgfsifYaHpHuf7HGH557KRyx7UsefpFDXFtzZeiajlZjR%2Bad%2FDqzHiEdpXDablHm7x6ZVUhyTEhXhnRN%2BDPxs719d6%2F%2B2Soz%2BwlNrEAmkkumkPZm1cANcjPmMUoId&X-Amz-Signature=da8a3b6bddc1cba8e9943ed4b4aa38dc809f91c8435798de4b5aef810fadf975&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667HAIHFXX%2F20260116%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260116T071428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH8aCXVzLXdlc3QtMiJIMEYCIQDm1v3ypkzZnKGnySe1qvf1EU5oWNW4yYHBBX%2BevZsblAIhAOsuEKS8npKeQfifr6lybpFn03U2avG%2BkbU9TfNK37n9Kv8DCEgQABoMNjM3NDIzMTgzODA1IgwAUZCGumYmXEz%2F9vIq3AMRLSuwXLHqiXtuWgN1b%2Bais0ZtKSWk2VgAZD8imn5VZRhsalMYEAOa%2FeBi88AcXJneKpvfoFa8Vnj6ss8K%2FtYgPNYsjRwBAtF36QWon7OW%2BGz%2FAaWOhDIwW16VI9VnODQo%2FBVbszdLB7lQa0icmLYzVfs97I8w3sIGuWXLMyUwiQX29k48JUiOUXR3rvTjl98M1sj05vMwUPg6lwcRc9zSekUlRSo2q5eAUnxAyBMheHhTQ4GG2LInvfgIWhFZff0ep94MBl4v1JGwNUZ3OWlI7gm0Ggp45gzRBUPV2RVbMZC503Ua3MH05Hr49ehAXNleWSgmxjcWgimz3si%2FHI68MBDaKfGWRjS087SR2BgY5C%2BRSkcLtrMmdUoS3GKfTyeZ4%2FGf2Nrz7LBJ2r6jAXcEP34LV1WCz3qQWIf9iejU3Tu%2FHndFrRY7ug5aS0bQ3jLTy4YvfRsfrnd%2BHiIRnZe7PLOffF1h5awYscuGYs%2Bu8aTD0voPkJezBRa1taHG%2BXSRbSFdVpyEQdF1kESqwADugJAfZbQLWCkA89nhK%2FfXX4cx9VDMe%2F11W6BH%2Fdru%2F2rzsIpTWRUScV0HaeNtDExhOcm6w%2BmGsgxJBWJ3S0gXnE5WAM4P%2Faeps4VwQDDMuqfLBjqkAZbIBoLBUcoyW0NQKv5x1lYsx4fH88cxm3mwC8mQiHRTWLd0jnl8PWlkgbcQ7yoVgl6Cpf3XX1E8pJkr7ak7ScJZotlsTGMzCoV3JIRmorKC77mE4zULpqOvguQ%2F8uC1z5gcOP6EnxHRxJ%2FiOog%2F%2B0hVYzHcjJ8WHq2JBGWQTuck2NKiNUXvapt6zcijPaLx6AkMzLK42vnQ2Ebk2qx%2Beae6TuZ5&X-Amz-Signature=b2829f83f8d3fd2873bb08461de0541ec5592669e190986b9a6a2008591dcb75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

