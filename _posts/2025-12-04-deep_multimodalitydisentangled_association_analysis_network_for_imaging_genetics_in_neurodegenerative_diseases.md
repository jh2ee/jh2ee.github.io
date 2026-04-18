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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVX3CPCW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCxrF9NbDAbbX%2FdObCHq5qF%2FYu4%2BgmamJ0PWsDprYc2sQIhAKPlZe5UYLDB40REO5tbVSHBuUb1dtocohHPdWbP1x0oKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNV70%2FkV5Djsd7GI4q3AMc1x8v3QrVljYL492Z6Y4CRwkHd22wjb9HlKpcwp9XVXMWyq5ZpS2JEv%2FTRlrRSzAwDkevCnzxgbjf1t9TCqkc2aPTR%2BiF9keyNWMQk2E8ZpSfNgwDxAKUe%2BjneTHyGdNr5cfs%2FxWuP2YFOeLy4JSBO2YF4UwhMHZf0ir1T9tHiI5AlLQK5mlYav8PArrYf%2BQVLoGwU%2BTe8Y63E%2FSXsKBq4lgu4f7IWIdJMVE3XVTCSS6hMZDb44SjNMK12aoVyCwIR6%2BdZLFE8X42tM5A3g5FclN8rnXF49SJ3NQP4YQXRIqOcD8AIkb3TqQhFN%2BA0VcmtCNhtUSW7gaxMYv3utzOHXO00SZVO%2Bmr53x7sqd8e84V7nlddXrepnAeRBc0if2Z6TOn7EVIqfheFEbNWUguoAROPiRTsjl%2BnvR3Pyptzpw17Gljg%2FDyj2HC1yrogc9xXhUqy2qIAw9iPJoQtFmHllknPh3%2BgFCbKM%2F7dcAuns4gYNza45ZLahUBYlGifW%2BUjHPGEWxjMJi2JWokJnAxMgfO0CCXA1DpbxW9dxlwcI6iVEf4XOgmeKR0m4Je4lU6kST70InbKkYM0oW12wrarvfunlmdQSz16lSd41YLfhxGMTJ4TQ5ajFAWzTCVt4vPBjqkAfSbZv2TduM9AFzip7vhX3AawKNFcH%2B3PL37JPSHbudmrpV5iFl6I3q4HQH8nyPoUVYpcUun21J5wdw0cXSqBubmiPYNO5P7jEQyGQG9C1ysAUDlFWvXnKl0NuawJLH%2B1LUaSPekneGYdqv8tn4ViIfcCJIeyHXjSnoBJTLytUHhjq3uyESEu0MsuryAj1CTF5DV3fACn3extuV1NEzXNtNy1TZE&X-Amz-Signature=c333819bd9ac49f3dc65b7213f27f30bd281cb0ba996b23108e7f8005632c600&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YVX3CPCW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQCxrF9NbDAbbX%2FdObCHq5qF%2FYu4%2BgmamJ0PWsDprYc2sQIhAKPlZe5UYLDB40REO5tbVSHBuUb1dtocohHPdWbP1x0oKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzNV70%2FkV5Djsd7GI4q3AMc1x8v3QrVljYL492Z6Y4CRwkHd22wjb9HlKpcwp9XVXMWyq5ZpS2JEv%2FTRlrRSzAwDkevCnzxgbjf1t9TCqkc2aPTR%2BiF9keyNWMQk2E8ZpSfNgwDxAKUe%2BjneTHyGdNr5cfs%2FxWuP2YFOeLy4JSBO2YF4UwhMHZf0ir1T9tHiI5AlLQK5mlYav8PArrYf%2BQVLoGwU%2BTe8Y63E%2FSXsKBq4lgu4f7IWIdJMVE3XVTCSS6hMZDb44SjNMK12aoVyCwIR6%2BdZLFE8X42tM5A3g5FclN8rnXF49SJ3NQP4YQXRIqOcD8AIkb3TqQhFN%2BA0VcmtCNhtUSW7gaxMYv3utzOHXO00SZVO%2Bmr53x7sqd8e84V7nlddXrepnAeRBc0if2Z6TOn7EVIqfheFEbNWUguoAROPiRTsjl%2BnvR3Pyptzpw17Gljg%2FDyj2HC1yrogc9xXhUqy2qIAw9iPJoQtFmHllknPh3%2BgFCbKM%2F7dcAuns4gYNza45ZLahUBYlGifW%2BUjHPGEWxjMJi2JWokJnAxMgfO0CCXA1DpbxW9dxlwcI6iVEf4XOgmeKR0m4Je4lU6kST70InbKkYM0oW12wrarvfunlmdQSz16lSd41YLfhxGMTJ4TQ5ajFAWzTCVt4vPBjqkAfSbZv2TduM9AFzip7vhX3AawKNFcH%2B3PL37JPSHbudmrpV5iFl6I3q4HQH8nyPoUVYpcUun21J5wdw0cXSqBubmiPYNO5P7jEQyGQG9C1ysAUDlFWvXnKl0NuawJLH%2B1LUaSPekneGYdqv8tn4ViIfcCJIeyHXjSnoBJTLytUHhjq3uyESEu0MsuryAj1CTF5DV3fACn3extuV1NEzXNtNy1TZE&X-Amz-Signature=c333819bd9ac49f3dc65b7213f27f30bd281cb0ba996b23108e7f8005632c600&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SLTADTXE%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041846Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIAt1rUUsYJRy1JU%2F106LXnP6C6WcijPbQpHANH752KJHAiB1zOJMhQCWSRUh%2BWGvtKksg4H%2Fuc8kyZvIKlf48DmnIiqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMWXm2jGuigP2g76CnKtwDDm4MoQCAbNNZSofuxwKbg3bQ8667ERK00Jnw5jHMPSk4b%2B%2FWp8HLjnWnbvn0oVRkpQ7Z5AVku2bUdGgmfp%2FMLPUqqJBuxlSRdQNfAoVwx1q785nIMhA2DhnuxNxIhfPovFqoA0kmSvghfJf2vtkyxUMTO2YawTNbxmAmI8KC8hNOBBtkmsYrsEWZgzeXvONvL0%2FGrQwoxG0%2BB%2FTu%2FxrqWiz97%2BxO5N4q29Q8Glne%2FqT%2Foz5WVyDQmWAdTVLXK3%2B8ZJamG8cvxqr3SI2ObW30UmbigjzaosFr%2BOnyOw6uMAsWvgllPtg4ZErURDj4L00tMEUVEwhUjc6fORBwmGPuwZS7ONRqSIZcGnXzG1aB6pDfu4SRaqCR6LOzA8SQSSixzxHMy0jepKX8THM11NWlAiWJKdBHIROU5cMaASG43MESqJWrmD3tDXyXh8gpgiv3Kvrmv7fdyVzQajjR2L%2B1uQOfHm0FpYERWsg0KTr%2Fzui5VCTuPDXrP%2F%2BZzGb8waDGKyDb0fCwnc4ior2rbXo6frY%2FOTx9ZPenKCmNC8AdqPns%2BNEE3E%2BA7jpTiakrDatJ%2FFGl8KR%2BVgFHN8RPHUZphQ2XbrVkvfcTcjGjqtn8c8MN2jc68pia2jHUiQYwtbWLzwY6pgEuuxwl%2Fz5ExdnesDiSZ2ESccyKKWk8iFKNoRncNY0dsg0sOta6c0bGpCDPSAlBiK6FKu0nTYqYO3g7sL2jWAC8q91YBFnLBN0W1%2BmWDjUiNmni06%2BGqsyjDg5w0uPDaLoCMh0Djba4EqEwke1YUBuKeHWQVfa35enrpH4JnShu4Hem5dP9wO7zH5969jcTxnPNiuC4Cs8zekcAbYYZAZNEaeperBA4&X-Amz-Signature=392adeb10b1492c4976519896e3f19d524fa60149c683fea3571ee44ac3c348a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5RANGTR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD3wkqPElqpuLSnpyBGJu8C%2FyvJ5a6yix5XRJNoLobSRQIhAObkb661SuVCZiOMZZHcNjiZ%2BR0hnR15V5Y1U68p8WFpKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyxvPxMtfRLBYubqnIq3AMujSAQVjCycZoxKmgpgfRGxQYaMtRvkmNZqXcGHqchiSC7%2FY1QpJgPzwGcmOhoofP4pzm%2Bzgpnd81fDNLHcUBo%2FDUVQdtfQDAjBKzrXabUTzKSduMfp2D7KNVlgrM47IEL%2Fp%2FJlWSNHMjNX3ZgTDicvQ2wvOb4CQ8AhqQeKpV54oolrBrQcJSGMxWQyTiuwE8OdtuXILFWKeidN2ooa4Yn2ymdqEZ1o31qqQKH%2FkuYVtHVuabaaP9huhFJcQhaMLmqjV0DU1WhxaE88cbSI6DMOeKv1BoKneL1oVSVLoqBu5pi43a74N9RsNr2N6xrLjLzj%2FcFaxEW6cO%2Blu0uLZwO%2FgBgOozwfi6qRAyzEtjOTXkM6pJzDYfUL%2BQj7PhP61NjUboPxox2fHJk950ubZnjpOeuWNjIsjILhRmDxIHgmF8ItMy57DsWOJ5nmFzjTwNTR9Rz9XpLex9HZXChLkFskRjjYiotinvnnNFhIUjb6dlOJJr8lYd21Cdjk%2F1GNGxEm%2B7lhJhbbEqRofjQD27kQYK3kjS7FGGlSLl%2FVw0hLbl04bOyWtufkk%2FbrP253oZXCSmAwxN9lWnwkt%2FJronSdbDtaY4UmUsws4eByT5Cg2MmlN8qSVCZ0%2BU2JjCUtYvPBjqkAQq2eLMjLX1IB%2BcZyz%2FbnnaQ3LP5YMMGB3GBTZCl7lS%2BuGFEHFZJQcmYIp9HhqAEk%2FKxK8%2BgyA0OCsTWuDATBJqUNYTNY2no2NmuOgNwBrsL3JmJWDiH3nYbjVragV8%2BPmTYL8RSMdjozhLBBCrWpZ3qpQF4ExtLB9p7miPmDPq70OM9suvcMCulPWrb2fUEyyesovEPNHFKCBXqEg7I9aIL1n%2FG&X-Amz-Signature=cd3abe7a23f279ff77e4eef278f7ed083e69dbad5b10a9381f433351e811f2da&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X5RANGTR%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041851Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJIMEYCIQD3wkqPElqpuLSnpyBGJu8C%2FyvJ5a6yix5XRJNoLobSRQIhAObkb661SuVCZiOMZZHcNjiZ%2BR0hnR15V5Y1U68p8WFpKogECOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyxvPxMtfRLBYubqnIq3AMujSAQVjCycZoxKmgpgfRGxQYaMtRvkmNZqXcGHqchiSC7%2FY1QpJgPzwGcmOhoofP4pzm%2Bzgpnd81fDNLHcUBo%2FDUVQdtfQDAjBKzrXabUTzKSduMfp2D7KNVlgrM47IEL%2Fp%2FJlWSNHMjNX3ZgTDicvQ2wvOb4CQ8AhqQeKpV54oolrBrQcJSGMxWQyTiuwE8OdtuXILFWKeidN2ooa4Yn2ymdqEZ1o31qqQKH%2FkuYVtHVuabaaP9huhFJcQhaMLmqjV0DU1WhxaE88cbSI6DMOeKv1BoKneL1oVSVLoqBu5pi43a74N9RsNr2N6xrLjLzj%2FcFaxEW6cO%2Blu0uLZwO%2FgBgOozwfi6qRAyzEtjOTXkM6pJzDYfUL%2BQj7PhP61NjUboPxox2fHJk950ubZnjpOeuWNjIsjILhRmDxIHgmF8ItMy57DsWOJ5nmFzjTwNTR9Rz9XpLex9HZXChLkFskRjjYiotinvnnNFhIUjb6dlOJJr8lYd21Cdjk%2F1GNGxEm%2B7lhJhbbEqRofjQD27kQYK3kjS7FGGlSLl%2FVw0hLbl04bOyWtufkk%2FbrP253oZXCSmAwxN9lWnwkt%2FJronSdbDtaY4UmUsws4eByT5Cg2MmlN8qSVCZ0%2BU2JjCUtYvPBjqkAQq2eLMjLX1IB%2BcZyz%2FbnnaQ3LP5YMMGB3GBTZCl7lS%2BuGFEHFZJQcmYIp9HhqAEk%2FKxK8%2BgyA0OCsTWuDATBJqUNYTNY2no2NmuOgNwBrsL3JmJWDiH3nYbjVragV8%2BPmTYL8RSMdjozhLBBCrWpZ3qpQF4ExtLB9p7miPmDPq70OM9suvcMCulPWrb2fUEyyesovEPNHFKCBXqEg7I9aIL1n%2FG&X-Amz-Signature=51768093ce9c8d8efe0df136e52c9bb1bf2691eaa400d2d229ccc4ac8476269c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYC5MSLW%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCB17JGLjsp%2BQzZwy1riyu3chPgkMd6jJKYaxAoBXAQBAIgEW1x%2FKszJmbWQki8%2FAwmEwzx5ZXSFokaqh%2F7UeYPov0qiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHR%2FyaXIZ%2BardDm4NircA7uuaOXgFB1xpg4w%2BNJT0ZuxZH4F%2BRIJYWl1MBgNbcDva7nbkSAVx%2BoZtRf%2Ft5pxw%2Fj3wVSe2s5Ke3tvVCFzUCNlBVDnNLVr9iSlpSfF%2FI3RDARm%2BZ%2B1HuX3qLvopOWM6OETJaakXSYs3ljvZ5F2lPr%2BJHAHEtazzDcNWi6ZRjgFbvDYb0tt3bhdIVAX35I0LYCp1XBJAHxhU3mphXB%2BSzn93Axe0WJ71lKLNNSdjV1pZLQPk2DWZd1LRQj4smb4xM%2FKW7HDDV5qOUY3EHr9h6iQjupBfonmW0nguv%2FbjpCxHeMTW%2BOJJ2h3v9LUYPlkTqSJQwxdp6WhsRn3Iam7XPve2D8bfzlDj2JBDU3KfDXezUl0FRYAElMpq9toKiZytoqrdlG20O1JrXfqv76%2BvROPD1AW8t9Wbcy4jyvpmNMdmFzACr%2BZSRHQoe%2F0qqQxdj1MvxLZkTSoQlBUtSKlAaqy14pTaOjWT5JdziaXBhuouR49wQShd7brnbVuAdeOR4n0wbyhpsMW1wY%2Bi6Gk%2BwYv6Saiaxsgr89Il1pa%2BtOWCcfgTO3QTJNNBcZ7MtP%2FYZmSMOwJGbs8M1oUSG0ucyiao4b0qdBcf%2BX4xsNplVHoEfqFuYWAjFfAy6DbMJW3i88GOqUBM6PWABtGufSvgL0aYPj4i68FwR0xgkjgjLn53IDHKJCMblxoWBsIDIpr8R8WLPdkWjfn4IOjxyg6VAUvp19cSBwQtjlmTszZjOz12oQEvVoGjqhHC4GEEHtMz%2FZPJvUp5GoRA1Px0nZY%2FM1FH%2B6yxbgbv%2FTXsJzfPrd4YDIfOlesgxvdhshoNIknVxyaxQ25WpEdcm9XG7ls%2FODcOVPUkKX94MoW&X-Amz-Signature=0e16746d90539bbae79b38886b5ea97592a4db4b113b2444fa8c6c0ebf321dcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RQCZGGHX%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIFSxS5poMiwYZINEsyuzg8fZCKvIK4noL7s6enawd2%2BFAiEAj1PLOjuf7fgZCZ%2BBq9mkKJdFtq7CmZLzldccO0fgXbYqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFojmrKGp%2BmJhjlOoyrcA5wXeEkb%2FRO%2BMW8i6BkoKmPR9u9L96FIhUjx9QXjkDU0apKKe%2BgrJIUblcwo3lIC2ky4EJ1TO5wsBmtvkJi3QPqa3jKiizojeH4o2ldNu4G7WuXWIEYhKPYaAEfH5yLXAmKbXOWB721lU27gyd42KEq%2FG6egIj0l4HW3WF2DcKhW8LLVlA5kBv5knMdS1vSMhCjAPxOHN9n9Y72kXSsV2x1b5hkNDMubnEEEsIHRiohAUjZTge1KwxeehDH2rn%2Fk5IWXCUoAg%2B5pldi6yFgssXgogpnBS9mu3YviK%2Fgfh8wsGjQJuqcN0c74kE6WsqJqVupKWQVOdjc3dxdbq4zBsvLQYDImB2Ej1ibIm44GGI7iN7pUHW8aKhNHWoqTzPzk2QIA%2FYkxrzngDveJYDiYK4hdUO8sP6fY3OFKDf00i0S3DaA%2F4bnZzchNzr82BdLBnVwF%2BWjw35K1tx2qxpaIIAUG5phbS0MoWkYlacWsH8uJCc5PGBMb31t%2B%2BKiN%2FCxqkiOc0VkWtboMcq0VoMDzu1VN%2F20ezs3NzVM7npAj%2FjpTfeN8N9bdN5PIXs116oAx%2FpFjsfIImk8gCHGSPk0jlf7IiSRRCS4fwq3Ho0cWvVUsJ2qws27tmbyPXi31MPy1i88GOqUBFFOe2Oy29LFmqU58SbFvosvfRp5n0ys2N2poqYKDh%2B0n%2FDEzUZ%2BquakWAQBwaw3gcfxG6Pg8j%2Bm8rEkMiywa6hQT0cqfJdmVT6MtycLQv62SLzLemr%2F8xlfTAA7oUBDTeR%2BjS7mwEgR07aAas%2Fel7dFm4KLqYHYm01DDU9d2QexzV97hQRUJSug6exxv5%2BfWd0RO0KTk6RKsrg5JnC1xZmZXwtRj&X-Amz-Signature=bfc588488940fffb8a8e513b04b3012d9dd41c70d9d7c7178a42691cd2e9a3d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UZ5UNG2C%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIDFn2U4oGEiLZFmlp4Yl%2FDwZGasLYmRoy75Ic06Mq3QrAiEAsKxy0jBAhQGYY2jox%2BX%2Bb%2FrfnTdZbgonfNquC%2FRyluEqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDPXMY%2FN3R2ICfF87CrcA8lyyyVDXaY0BVhnrCgQYBQ%2FbZjDdhy%2FsIXZMKNa2PjrlIcVBubP3IlRqU%2FenyKVwCmqsKkQMcYeiz%2BR0gi8lWEZZcSHnCYyOpr9to2eMSIc0DBQid5VW65qRZuswbG4Pl7y1KE6ZkVAkECr6FElc2mm01jZFfGym8cXZ0mq%2BtfBGCPCl8x0ePgGKf9KM5SvkE%2BsLHHM%2F1EhDi3qRzp8aJGWXduOZan0gJjf31aKM%2BLIYjzcOoffcD2OXqSi4RC1jvwR4CcaUrK25vTZbRrGqsDtRxBUkEr3dr5E02A2ZVAnkR4hyM3%2FyQ49amVmmHiGjm3tORqoRLss8tSLxU9MPVlxmSODyVe5OAuxJU%2FGvZCJkeBK3%2FCA1Bmajy8yGYpVXqomeHSNFAIwaRiSKOHmGYVg8IEPtRthdB90%2FAxxnexdvc%2BK0XL9UJcum375CivQedZM0%2FIYCr%2BtQryWyB3zBrn6xG%2F%2FHCN6R1xwdW%2F6eQ4bZrji3%2FfwgISMzlYShcgG5fWIQPacrM5DP%2FqFrHAr1zI24FonMrnyp113AReskUoyjqAuXY2nXMVRLoAarFwImDxMLUWqT5UvdQiYdjBW4Nc%2F6fm4LXfG%2FytZPUfywz%2BilA5XOJK5mlzPlXp%2BML23i88GOqUB76HWvbe8ic7sYXYgd8CeOmDZr8wpEKHbt95BjFZHMhCs%2F2gSh%2Bp%2FLU5Z%2Bi5mIaNXChVTligooLqsvXWksuQImgAeY%2B8kIPDppMNtLXyuPQBB7AOCls8f0BYEobCVUUSaitU%2BiCdwtHmcD%2BJrmph0FCRklCCdZLJ3%2BqidIikTbh%2BRpNsj4NWpz%2B7j%2FFbARfjiwOwjgiy0ADPri5yFOI2%2Bl7yuwVmx&X-Amz-Signature=b8469a8de0a6d44a653d2e29e19fd466f2aeec248958f8cc2eaf97cf1b31c657&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQN4GAVI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCrcsHUMWihGNQAa0NK9Q79xA%2BVvBA1mrtOh3pgR8FYBgIgRMTdGLoZEXRi6GaN4VDd0dPo%2BXyEgTc%2B1cjn9iSew%2BUqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAE3qPgIPr%2Bpl5T3hSrcA19YR3UKYqxjGLLq3vncaveUvcFBJsD5Pu39PV%2FPH57th770RnFwQzj6DH017siSou%2FrUmH26BF8YR9t9vy3wGD4cqzYFsTZzDY1mQHPR2EFDjO8TgL55zhcMBGIS%2FyXvnClGcctkLSC3SU%2BsJuHyue8qxbe15LVjR4gx5h9WnFsBAcwi6vNr%2FXANAlGOV1NpRvGHCBVhNuM5%2FLytv4iVAUFRYKmdNrI4cV56%2FS9JxVLol5%2BzMNxBj5yjfo8fUnrtUdxOwnbaxJLMVOQo6JOkCpK2gTMU8qYjSW0x1r9Ig%2FrKOVedao%2FO67yQQfNQov0UbUFxhBYNcrHLGx6EWU%2FfjiiEW%2B5H0YiatDhg%2B1bq%2B13G0f3%2F5vwE2QECiWOAB5WdJAEhqR%2BwmQ9fKUAN6c%2FGG9dVFud0cE2Z6pJAGwjQj%2B7OEreT%2FVrERnWkZeCHG%2BnXkCU4mnUfnSMrn35u7a5XOLEiokF293Iwo9adUV7PCZsvGJ4d6c5%2BZlNa2xwhBRELn5eyMysWCQxKRrYlwWI%2Bh42l7nOmyIWyVdySeodFF5GY42dWyeYEadhB5I%2B8fEHBFn5%2F8%2B9jHfl2DqpKu94sIONChrX%2F%2BzAKkO5gA3G%2BJVdyFSBPTK5NJLyhVtyMLy0i88GOqUBpOaZtmk21c38uWvK7F4K%2Ftu8RerJ7GYxNubFCcP9HKqybJzvZwhT%2Fkejfhq2WSUmDQh5WrUErsOwEwtsewNshWEQrm5%2FY1NaRxJrthrpW%2FSPquO5hTA5nqVNzfJa0xlvd%2FuQZvGQ5C4ZRrRYLz7OFkMq1DkaumxcBXHnZxQnbPpWZNFfqeuxCN7jj5JZP6V3rI9pRs9KGSFvVgiaci3JBmMcXxiP&X-Amz-Signature=499ea557fe18da7670fd224ee68db80a3de84556c3bd9296c1e2192547f3ad1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQN4GAVI%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCrcsHUMWihGNQAa0NK9Q79xA%2BVvBA1mrtOh3pgR8FYBgIgRMTdGLoZEXRi6GaN4VDd0dPo%2BXyEgTc%2B1cjn9iSew%2BUqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDAE3qPgIPr%2Bpl5T3hSrcA19YR3UKYqxjGLLq3vncaveUvcFBJsD5Pu39PV%2FPH57th770RnFwQzj6DH017siSou%2FrUmH26BF8YR9t9vy3wGD4cqzYFsTZzDY1mQHPR2EFDjO8TgL55zhcMBGIS%2FyXvnClGcctkLSC3SU%2BsJuHyue8qxbe15LVjR4gx5h9WnFsBAcwi6vNr%2FXANAlGOV1NpRvGHCBVhNuM5%2FLytv4iVAUFRYKmdNrI4cV56%2FS9JxVLol5%2BzMNxBj5yjfo8fUnrtUdxOwnbaxJLMVOQo6JOkCpK2gTMU8qYjSW0x1r9Ig%2FrKOVedao%2FO67yQQfNQov0UbUFxhBYNcrHLGx6EWU%2FfjiiEW%2B5H0YiatDhg%2B1bq%2B13G0f3%2F5vwE2QECiWOAB5WdJAEhqR%2BwmQ9fKUAN6c%2FGG9dVFud0cE2Z6pJAGwjQj%2B7OEreT%2FVrERnWkZeCHG%2BnXkCU4mnUfnSMrn35u7a5XOLEiokF293Iwo9adUV7PCZsvGJ4d6c5%2BZlNa2xwhBRELn5eyMysWCQxKRrYlwWI%2Bh42l7nOmyIWyVdySeodFF5GY42dWyeYEadhB5I%2B8fEHBFn5%2F8%2B9jHfl2DqpKu94sIONChrX%2F%2BzAKkO5gA3G%2BJVdyFSBPTK5NJLyhVtyMLy0i88GOqUBpOaZtmk21c38uWvK7F4K%2Ftu8RerJ7GYxNubFCcP9HKqybJzvZwhT%2Fkejfhq2WSUmDQh5WrUErsOwEwtsewNshWEQrm5%2FY1NaRxJrthrpW%2FSPquO5hTA5nqVNzfJa0xlvd%2FuQZvGQ5C4ZRrRYLz7OFkMq1DkaumxcBXHnZxQnbPpWZNFfqeuxCN7jj5JZP6V3rI9pRs9KGSFvVgiaci3JBmMcXxiP&X-Amz-Signature=e4e4345e59c86762f4846a720f48bcb583d46edf33c93080c996c2fe385249f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466R6PHXCJQ%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041845Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQDBPbYUXqUaHdtllKyNu626F4Lbp0HYwPoOr6d34tV%2BMgIgN6NUXYT%2BiwyvoVNRkxwwY0R1r9aosDWRhMYSjylG9xoqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHOLaHbK%2FfvxeauFiCrcAxinbrYCm6iT3lVYNjmTwvoP%2Fv3jKSkVaX647L0e0ab3fYdohIWiNGmCmm7uU%2B7ITVYaNLBZYikZ%2FmgNz6A70K86e2OBYdOi2LmspzyjhuKOkV0327RFDTgyP%2FcuO1%2FUqmZd3lTKY8Srzr8%2FXzVaNRkqfZFrT0cFiOLs8%2B8s6q48gJIW4%2BEJmsE6seQQPOUqApBjoW%2FRAMzXoDk4VJxK9QIunz8C03hpDB9W1TIxhJWHyDjhKqIqFVUaCW1OeTXPiz96Gy4NP%2BfNU4IizfBERTIEuFdY0odXENHNDJXkAfIAUV94xROYiw1M54%2Bi90aGbpk3NfQpZR0QQ%2BkgXjDmuipJMrHP0a4PgYUiZ2%2FigNocpzpfkbNKXXVNoWWGNJ%2FE9aNv2na4nkWh2rI04hYnVG6Z%2FvR4M13v%2BUjVSTfltbFzPmn9f4NFnuCmfxMV5H5oNg8zVZhCVAfbX3nF%2FMZnnOmZ8D0SRsBYlKiReNh8IVKgdfkXE9hVRznn7UR0MlMWNr2rJQ1fSWX950dDC%2FRjQxMaJO6xp7KeLzwHxsFdrq8GxSHl2Y3RL8j6EnGY5DVA8ZK%2BQDtFgbeRwnZf0v%2BevdF2GAZ70EfpkO5Mfpd5%2BYSqbD3o%2FZW8Q4RcyOjRMJa2i88GOqUB3FDD66byY%2FK5IWc2LcxTEGRF16R%2FxNYl4yYT5xJlNmPm%2B5WaqUfSkEo376oUsBvWgN0o%2FZ2%2FZbdqD%2FUZIkk%2FAxC357kXFDBIGAibiGH1l%2BVHDy3UJtYd4sCmPdvFrOhbXe6On4ApjLHCf6slAQ%2BETVXh6HeX8aiLGea%2BB6oAHsH8RFu1Y0b73osfyKD81Jbvq8JXc%2FC1e%2BS5Zg06KXeC0KFq%2BC7S&X-Amz-Signature=5a8dc6a366cd337812db322091e87b114ea006ed20ec01eb1ca3b0eb3201198e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNAUTG7O%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCJPliRFvJz6Eph7SIZeZnsGkIb6nC38aDwGFw1WivGaAIgFDyWHXnD66BJAb9qaIw65YWFwcsVwDSb7QdRJTY2%2FbMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDE8HO1rl863VNWMmyrcA3S3K7r3QbwzH50U9lJDsVFI64ne6ClRFEfaPGtGZTclH3hfKHsu8qAfI%2BTXLI1iceWb0UT%2BqC6QTeRvuzwopcuiVCrSkrNsBR8N8oe1LCjJfN1GmxjiFXzh2K4g2tY2sXu1yON8z93baxyzyhGL6FNQWoZ0lPnTYa7CirEvMpCoA8EhGOqfZ432w%2FL46aPF9oOR4I7P3YfqP%2BoEkjzJVoa0oQaq2sIplaTVuXwOPHOTzTtVxt7X9cBJBbO6%2FC%2FxqCikDIzNXT2xnbmk8B0wan5EY3h50mpXY0BDpv5gADqomuxvIvDd6428iUo%2FA23sGZCNfnWUjg%2F40m0j6tAPDcNY8eiSVJVWNiH3aTUszlqATmt6z5LOWPSRkhVBZhV56kqIwydNuppQyMmcVtVCB9CgZYJhFkI4HZA%2BqHITWUfBQNyFA%2BEaFrWPzG9iKb%2BDJ8XAmX%2BtRhoUvzboWKk9gCq0RbGjq76Yi4rBoAFptH2nZb%2BqSjHefP0qbUssFff480APfSai28PT%2Br78on7VDFWXSuFn%2Bzg3WJZPt4eXZHe%2FUTuBNvjXrvASpsSeNoSBc24WLtrYDlIeKdViCzKyTs1u1zbcwyMRnLO99Q1cc9CkQaRvUayxpyBBT0msMJq1i88GOqUBAxYOpgKMq1OAAPVZ8aF0fdtc3zrMadFqxsn7RHBHEpdWNyaRKBW1c28o5SpuL4HejxxPBrdMyApgzviWFIK5pO%2Fbrt0GNPZE47WLYeeClqrriU1akutgRXKf1Ef02cEGs%2FD11LeKQ%2Bgl2ulLz8ONqXWVI7MXGrqUoYrgY6q3ZBh3%2F79hJs2k2QWlW%2BJTuPgxdioz8pH0v7LzOMx%2FbFkfkC3lwY27&X-Amz-Signature=58c14bd7da68ad27f9599c9bd3949742c4ac8695c7159f2ff03c6fada3302d17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RNAUTG7O%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJHMEUCIQCJPliRFvJz6Eph7SIZeZnsGkIb6nC38aDwGFw1WivGaAIgFDyWHXnD66BJAb9qaIw65YWFwcsVwDSb7QdRJTY2%2FbMqiAQI4v%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDDE8HO1rl863VNWMmyrcA3S3K7r3QbwzH50U9lJDsVFI64ne6ClRFEfaPGtGZTclH3hfKHsu8qAfI%2BTXLI1iceWb0UT%2BqC6QTeRvuzwopcuiVCrSkrNsBR8N8oe1LCjJfN1GmxjiFXzh2K4g2tY2sXu1yON8z93baxyzyhGL6FNQWoZ0lPnTYa7CirEvMpCoA8EhGOqfZ432w%2FL46aPF9oOR4I7P3YfqP%2BoEkjzJVoa0oQaq2sIplaTVuXwOPHOTzTtVxt7X9cBJBbO6%2FC%2FxqCikDIzNXT2xnbmk8B0wan5EY3h50mpXY0BDpv5gADqomuxvIvDd6428iUo%2FA23sGZCNfnWUjg%2F40m0j6tAPDcNY8eiSVJVWNiH3aTUszlqATmt6z5LOWPSRkhVBZhV56kqIwydNuppQyMmcVtVCB9CgZYJhFkI4HZA%2BqHITWUfBQNyFA%2BEaFrWPzG9iKb%2BDJ8XAmX%2BtRhoUvzboWKk9gCq0RbGjq76Yi4rBoAFptH2nZb%2BqSjHefP0qbUssFff480APfSai28PT%2Br78on7VDFWXSuFn%2Bzg3WJZPt4eXZHe%2FUTuBNvjXrvASpsSeNoSBc24WLtrYDlIeKdViCzKyTs1u1zbcwyMRnLO99Q1cc9CkQaRvUayxpyBBT0msMJq1i88GOqUBAxYOpgKMq1OAAPVZ8aF0fdtc3zrMadFqxsn7RHBHEpdWNyaRKBW1c28o5SpuL4HejxxPBrdMyApgzviWFIK5pO%2Fbrt0GNPZE47WLYeeClqrriU1akutgRXKf1Ef02cEGs%2FD11LeKQ%2Bgl2ulLz8ONqXWVI7MXGrqUoYrgY6q3ZBh3%2F79hJs2k2QWlW%2BJTuPgxdioz8pH0v7LzOMx%2FbFkfkC3lwY27&X-Amz-Signature=58c14bd7da68ad27f9599c9bd3949742c4ac8695c7159f2ff03c6fada3302d17&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46667KETAGH%2F20260418%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260418T041855Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEBkaCXVzLXdlc3QtMiJGMEQCIHVnHLWvV1nVZxfwbmt3Ua3USK4jzJX0LQGGneYa%2FrFIAiAYcW5bd7xuqaxdyK%2F3J%2FW3oz2bo7%2FDmD4Hwqyc9pUItCqIBAji%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOI6XPu6aElmQQT5XKtwDnM%2Bgq88cUA%2BJ%2F8stmdiZhZMj75uqdH7kniS0YALtO%2FCA%2FeM2qsR043m%2B9birfCYIYUTeQ%2FBpxiuulIpaawMj9cf5F98IGg5QFj3vO90Ogl4KJ2D7Sdfd%2FPUhvTssGo4IPNvFvf98Bw8EQmlSWbn1y7HXCN0tzqcDFDbPUAgT1CqWvzvl5X%2BrtlcJHA03SD8KRr1wBdmWkv2XpDIaiI8MEqKnJXARTeIasRa41tGN%2FmVum6XQeJEAbQVIf4hA2Gyd9hG%2Fg%2BJuA1Iw6BmKFM%2F01F%2B7sZddAZkcnGCeJ9sfzHETv6k3TM600XFmE%2FbZPwHvHUYKlmsPea84XQkVCRQpnzaPfkKqNMlJzUUu1d8bPeShAP%2FJpoBCPFLAfRm3NbN8XRfeil9YPdUqjJRxScAfmbrF5%2BnD3OOl6lRpm2NFGlVjCinQ7TpOZmzLlrYNby5fZOlrOcSDsFcgu%2BXoTe%2BABTw98e%2Fmgzt63LczZR3qC9FsDLywhGhFAwNKJtH914DxEv75lZlSZKxuT2yomPGPzzta56X8yqFksyc81s7GbvBMGjfWgUHOgCtNytkFhwpOhHr3%2BRV%2FDdMELBRS1uOQTu9BCq9cMEbhRahtsK8T1Csa%2B6g6b2voHCweCwgw1bWLzwY6pgE8dBFOyhG7DxEedqGOT1lH8UEuiRMfvGW4OqfN26WUPTSyMyxBC7gTel7CF5F4LKugJkvU%2B2Xg2%2B7IoJqk25NA7QqE1UyDNJU63YQ1SjmSMudiVgzK9qXvBwwBAiNUz7nIFhd%2B%2F6Z%2FtWbWo8YeWJQnrS4JZU%2FgwE%2B6zPM6ipN8cS%2FSUjq5eOGReeqTBFtbqOASJfuUWRMOcZGLLSIl9bwn3smZ8zDQ&X-Amz-Signature=e761698950b3da22495e685eb8a02e2097027c5ca2224f9795f579cbb347da4e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

