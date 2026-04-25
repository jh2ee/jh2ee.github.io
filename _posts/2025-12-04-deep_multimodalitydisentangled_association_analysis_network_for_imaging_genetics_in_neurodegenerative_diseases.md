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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQKDGVRL%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAm0Mys%2F10Rx3HPOe3PaXj%2Fe6O9qsj4SNbigZLl5Qe6QIgBigHpkVmQvTpkPVDEsDIqwl5zBauKAGErGPP2T8Y%2F34qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBqpW0Vp1Ehq9li5ZSrcAyeqYCfPxWaK%2FC6%2FtvhEdI7lzIPVBDgolgIfyR3Y2YHI5o1DRGl9CLUbIwo3j22TzOPuSDy67LJzU2A20zDY5kq8%2FCUfU8XtOQRRbgwlUyuFjh7Zt1LHfhZN6hBFEYt1E7ZPFQ74OTEuXbJmWJhTHpYPB68WNvQWgN2%2Br%2BUXOw8vEcXVHnU%2BoZFL4wD6hAFPyPE%2Bhti%2FKNpZ7HbLNclKyLUGO7qHspF%2BNB4A%2BIxCVtiT%2BJ2A1Q5o456wUrtMUHideOFawj4suK8ekxo38TA1Vm5qk9ojFghNJ68kDWynkwOeNs2oVQhfjLpVmKnv9PpPdR1RCDsedIQB9EiwjbfAkAZltDoaiuYyDjBtkAKc5aZrdFKNmdvXHh0aPuGNftlGFFDTX8Bt3i%2FcZIrGHEWrOFEgl2po9TJccNAkEJ8nZFTtEe6PZTBaz8D7GPUtCj%2BApdn1C2RHslDOB7gmcx%2Fj0vQ8wKIe5TwI6x%2FQtPt36X6FMNfwbrTqm2NA5QPtsiXlNTZpga83bzAnE4OV4TDuVnJ%2BqAlgzckGSeyqabehxndww%2BCdxEO1967AuLu4IpVO3yLmxgC7O5hD%2F0SnCXVGl7DSTfTF8Ap2GqjFkdlgettCatIclmxkehWS0C38MPm4sc8GOqUBMnf1yrBFArL3%2BNFyNmClU9EwjgvknyrzcOCRgpZD8Wyjf%2F8tfORo%2Bh9Wkq64eAIpc95V9UHmocAP0dUo1XFoKsG6YkXgbTH9QebYV6og4kylvhzITaGv7Zd6tLYxvauxmtOKuXf21PUjT0w6NJcCoXDQQTtF%2BJmwu%2BBiUL2%2FowiVxvsfPdPwAz%2BQ%2FpBSoATsVRMPfpTA2W1aWxFobPkIlZSFjTnI&X-Amz-Signature=524d89accaa8ead4feb81e520944c6929c18a85b377ff9dd94c303ea94be0aba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QQKDGVRL%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCAm0Mys%2F10Rx3HPOe3PaXj%2Fe6O9qsj4SNbigZLl5Qe6QIgBigHpkVmQvTpkPVDEsDIqwl5zBauKAGErGPP2T8Y%2F34qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBqpW0Vp1Ehq9li5ZSrcAyeqYCfPxWaK%2FC6%2FtvhEdI7lzIPVBDgolgIfyR3Y2YHI5o1DRGl9CLUbIwo3j22TzOPuSDy67LJzU2A20zDY5kq8%2FCUfU8XtOQRRbgwlUyuFjh7Zt1LHfhZN6hBFEYt1E7ZPFQ74OTEuXbJmWJhTHpYPB68WNvQWgN2%2Br%2BUXOw8vEcXVHnU%2BoZFL4wD6hAFPyPE%2Bhti%2FKNpZ7HbLNclKyLUGO7qHspF%2BNB4A%2BIxCVtiT%2BJ2A1Q5o456wUrtMUHideOFawj4suK8ekxo38TA1Vm5qk9ojFghNJ68kDWynkwOeNs2oVQhfjLpVmKnv9PpPdR1RCDsedIQB9EiwjbfAkAZltDoaiuYyDjBtkAKc5aZrdFKNmdvXHh0aPuGNftlGFFDTX8Bt3i%2FcZIrGHEWrOFEgl2po9TJccNAkEJ8nZFTtEe6PZTBaz8D7GPUtCj%2BApdn1C2RHslDOB7gmcx%2Fj0vQ8wKIe5TwI6x%2FQtPt36X6FMNfwbrTqm2NA5QPtsiXlNTZpga83bzAnE4OV4TDuVnJ%2BqAlgzckGSeyqabehxndww%2BCdxEO1967AuLu4IpVO3yLmxgC7O5hD%2F0SnCXVGl7DSTfTF8Ap2GqjFkdlgettCatIclmxkehWS0C38MPm4sc8GOqUBMnf1yrBFArL3%2BNFyNmClU9EwjgvknyrzcOCRgpZD8Wyjf%2F8tfORo%2Bh9Wkq64eAIpc95V9UHmocAP0dUo1XFoKsG6YkXgbTH9QebYV6og4kylvhzITaGv7Zd6tLYxvauxmtOKuXf21PUjT0w6NJcCoXDQQTtF%2BJmwu%2BBiUL2%2FowiVxvsfPdPwAz%2BQ%2FpBSoATsVRMPfpTA2W1aWxFobPkIlZSFjTnI&X-Amz-Signature=524d89accaa8ead4feb81e520944c6929c18a85b377ff9dd94c303ea94be0aba&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZRIBP6MB%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093838Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBZJuKDNv%2BCYskE6OW6YVVFFdKFftZ%2BI%2Bermr4%2FDvBsgAiBgKfKNIBIJtYBML7Id7LhQJbKuV32dOc6JgcUQEakNKCqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMlIpAoF4r6LrUq7x9KtwDKT3Gc1kvda2iFB1wegk57eaSrMuc4Fz0M65aq8OOEhkgEZfAY1OVEQNgyBuupT8mkwLano4T4G5xQ7KtIyoQayH2P8QcYG83I2qFW%2FbtkNUjzLh%2BDyU4g%2Fo%2F38w9Z%2BxwfHiazY4bmbuCNTDasuEkjtx3FoEi9f9ApD9JVkhpEa3v%2F18EpDeM6Qa98lwGFKeWmf8mBNOVGFTyNKimf874LKAjUyS5swV6KoZLhe4ECTV%2BrJg5nDnFpG2HLJhiG9h0P1kAde1vI4BfLzertisf2UE768u2mwCGUDnbcOfaYnW0DsXmg1pxlFC%2BiSAVYd7XfiBbAAN15%2BEGUMe7fd9UWBId4JGUZQDWkZQjryPVpqlYRGPDZi7mt%2BLkiVvDImCKV004uttAh5N%2FNMFZU6ujASawnquJf4h3fs7oX9Qni2H%2Fsnhe5JbU9FTEXd1J049gSQkD2B8gJMiSea%2BU3%2FxVkF4muD2zIWk7hRtkn4eYfPuOgwWbcv%2F8EgwB7mlYuUl4Uq7o0e613zq0eYkEgN6DynKPcin7gwyEobKhX7IMtN4HlqJgn4iHhaVNvNyGZXP7cOaLFsDhB6MEeQG5LxqyqR4iqCN5ShNFh0fAq8EdDvJsilfPhuj3lm%2Br4lUw2rixzwY6pgGFzf%2BVup%2Fw5e9i%2BH2zXKIudpQWsqUMfXRwYF36nYyoWWe9n7Ucj4sZQnPYU0DnNND95%2F6CvdESmf2T9PmQrKHDcf1oO1y%2FHJQUjnBVkpX%2B3HU5QrlUN6KGxx8BB%2FULboCpbg9EzHyJHNVyNhhC2za1rOmy7l9aVllr7w8Ydkn9gyi6TZqnY4M6muRxXpFfYvOpjxdoBVbSE5lwA7FTfEVYpT3CpkNQ&X-Amz-Signature=76b314c99bd28e42f998785321aed45755a3216bd57d31c836af31e2306b8089&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSK7DX3P%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFU98s%2BDlR4HFW2aMcSIADMlI1SbPVZXrBsMIGEeo5nCAiEAjwhY3aUfNZfK9H%2B0JAAjGKEMBGlR1c3uJcKOA2Le%2FfYqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhNBjYQm%2FZpjdKyFyrcA2UDZZA8iOesgfFmrD86JsTNZ8GS%2Fdydt9lrHL9vjZeJNpT1iHnqh7inT0HdcJTBeKZJdsIR526AjNu%2FOvntHk8rp8F1fzcC0gQF%2Fod9RTEC3guRInpELUrj71Sdf57QvQ774KLKlqROUK8NJMiPFQeOOECMyV3%2BFoqB%2Ff0%2BFdU7aBcPiArLY41Ps3WLXxhsQgnNmnojsbGmWy2iLat1lpp90vS7fKap9dXIJBk24xJtI%2Fn55RFV0XmuetV6fPC3ba4HnCYpWxGR%2Bfr2PctrcaOJ9h0JCnzHJRjri9hVx3MRuKTXgaoKLMWpZkBT3Z5QUcgLyAC618sETtxEXb8N8K5AGDvi89wlPrbdoOZ1SoLIRIZG%2BD3sNd%2FJkdc5Fu0SXR7HWp%2Bm2sp4oEAeH004Ekp%2BsYno7VPcy8J7f2nGnpJ8zkkSlns1P%2FpmGV0o8Mj1CDRjntoW52pCNoI10ywJp8AIa5vS0cwMkIEFARXJ7HpIsqa7Zz86e2g1BCFIyEOX6DFzs2qswMvkr%2B3GLnw%2B0pORgVBX984Rh%2BSYBMWIFGJJXZOiJUfJzl5eiozvmQ%2BTeQazEIKNKcy3AsYSBzWzUDEl24ETrXTuqJtQBmS0VYYae9TA1kSMLnprWGL9MJa5sc8GOqUB7PpUM8dQsfgPvDf9BbL7XoOzvB%2FB2E6C6nIZiazdvzwrxYPgnJcRps%2BTkiz9aw5OIFYyDvuT0O82g0%2BA8EKlZkPnxJlQOGGpGNidCfHnSwx5WBiGo9vyz8j8mQ2dXmoXJ7a09yz%2FfQ8%2FW0HjUKVrENjtrREBckInbRFXXyKgm0h1lJzZA98MUCmdM3AEZsUg9yyKlbNHqa9zv4PUGpOdKrNRmp7d&X-Amz-Signature=07b1370a5491cdcd106055a4fe1cdb14eb28de02e1501327454c8884eb5f533a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSK7DX3P%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFU98s%2BDlR4HFW2aMcSIADMlI1SbPVZXrBsMIGEeo5nCAiEAjwhY3aUfNZfK9H%2B0JAAjGKEMBGlR1c3uJcKOA2Le%2FfYqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDMhNBjYQm%2FZpjdKyFyrcA2UDZZA8iOesgfFmrD86JsTNZ8GS%2Fdydt9lrHL9vjZeJNpT1iHnqh7inT0HdcJTBeKZJdsIR526AjNu%2FOvntHk8rp8F1fzcC0gQF%2Fod9RTEC3guRInpELUrj71Sdf57QvQ774KLKlqROUK8NJMiPFQeOOECMyV3%2BFoqB%2Ff0%2BFdU7aBcPiArLY41Ps3WLXxhsQgnNmnojsbGmWy2iLat1lpp90vS7fKap9dXIJBk24xJtI%2Fn55RFV0XmuetV6fPC3ba4HnCYpWxGR%2Bfr2PctrcaOJ9h0JCnzHJRjri9hVx3MRuKTXgaoKLMWpZkBT3Z5QUcgLyAC618sETtxEXb8N8K5AGDvi89wlPrbdoOZ1SoLIRIZG%2BD3sNd%2FJkdc5Fu0SXR7HWp%2Bm2sp4oEAeH004Ekp%2BsYno7VPcy8J7f2nGnpJ8zkkSlns1P%2FpmGV0o8Mj1CDRjntoW52pCNoI10ywJp8AIa5vS0cwMkIEFARXJ7HpIsqa7Zz86e2g1BCFIyEOX6DFzs2qswMvkr%2B3GLnw%2B0pORgVBX984Rh%2BSYBMWIFGJJXZOiJUfJzl5eiozvmQ%2BTeQazEIKNKcy3AsYSBzWzUDEl24ETrXTuqJtQBmS0VYYae9TA1kSMLnprWGL9MJa5sc8GOqUB7PpUM8dQsfgPvDf9BbL7XoOzvB%2FB2E6C6nIZiazdvzwrxYPgnJcRps%2BTkiz9aw5OIFYyDvuT0O82g0%2BA8EKlZkPnxJlQOGGpGNidCfHnSwx5WBiGo9vyz8j8mQ2dXmoXJ7a09yz%2FfQ8%2FW0HjUKVrENjtrREBckInbRFXXyKgm0h1lJzZA98MUCmdM3AEZsUg9yyKlbNHqa9zv4PUGpOdKrNRmp7d&X-Amz-Signature=9d3ff8662e2acf39a631e8b7bd47444ddcf8a8f6246bcf50af0307733fc00b55&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z2VKAAPU%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEE%2FnkpbVz3YidKEYTgtpnpKp9ww%2BTXyyzuClWVSlQbdAiA%2BX0Qr0MxFazhgejW7nyqNI%2FKlhK4ZMWr%2BxRbnwogsNiqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMp0wiOWSykO9FvwgNKtwDBfuEnhiU8V%2BgJmEt8eVNy8k5qZVe4RVhdjywy5l4kTeEny8decbHhhty%2FJPNgxZ1ibrbjeproxrMtFLc1HB4m%2B7N7tBKQ0%2BqQgVxPBo4MBAIfVpCo733YA5Y7QsUHeUJ%2Bt11DwF3QJsS4adnLvGKSeFFs9e6yHfMkZgF0MK5jZ7tOKZXIWXANgmifVivNwL6DGI3FYrDyfaFEpTSgOmrvivTMVIs14lFND4%2BO1OKa3cLbiGvglUVpH3S%2BWI94atUr5Uwm3Lytc2afK%2B6vv6gycRgV%2BaN0IaVnwOn69f%2BIssBp4FYX9VtJbnea%2B5KptdeuodbX%2Fmtcuvk3kXxmwH7jUw%2BG4zTtpeYyYamkMiAYFMl4vGiydQOEfChEa4dVrtApMiLGl5BkokHlOlKEeCwmwrqTa6fLnRFeMp%2F4r3M2gpBv2RKVH2R%2BzOzOjAAlR%2Bqwoe0O%2B3k1%2BePj3rEkwNVdQGD%2BUdlYU2feBZXnUmSNkwXdt64VrTRF0oAmPxgkwxNOW%2FBho7WDkRDhkjswqbJ%2FRYx%2FrwmGVvKeT%2BJMfg%2BzZ2xVvhtQ3jnPrytLOKjoywHW1ysqvchPa4Rqw53lQfRNKmk6yr9xIrJn40r5FhDAVvJeTNmn%2FvLXZOwzmcw2bmxzwY6pgHTDTrkUSy%2BdCE9ApP3I33DOGnOKP%2BQlsXVbkp4xSrcjArHCqQSZRX7SFSgPtaqJ7W346JeMn4Y4NBXYNLxJ2paanIG63UT8Qy9ry1tR02NijC%2FNueUJ%2BH1p%2FnPtc9Frb2JBx0bHgUNf4M8EH5uExG%2BkYsgfEn%2BNGDSTWxiF0DYsW2gB6M%2BJWbE6zaBhTFdQH2EbVapPL3ezJjEylGfe6HKSlQmk9RA&X-Amz-Signature=a4d55959e91a65fcedbf405c75ca691ef5e019f3f780f1238068da65fc74703c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHZ3MIJA%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093839Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFhm%2Bb3IQpbdtCdaSy0qHar6t%2BekHpJtRQSodSNGgLwKAiAu6w%2ByRnbg1si19Ov2TUDR7Sa3t%2FEVchFmmVd6Lx0K4iqIBAiP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4RnzkdBOHNdK0hUXKtwDMzofKYFcTLoDRPb1UVnlPpjy9pyHPwW%2BOReDHdonPK76qEUTFYsQG0sERBrW79YPhZC%2BUbKiE3B%2FCsQtnE49dhOkjEz2ivaOtSrKRxs%2F5sZ%2FzxZ20NVDU1qzDP4hTq%2F8mQvbTrITslJbIrE1Sl8g1pvDJi9DNipWn7%2B8aSpLhmidfXWoDYT2o5Sq7mOMDiH2Mw5lL7NqZFRu7VvtaSYvwA13A3vBmXt7V1B0mXaW6Lz6Yv6nGxXYq1ZCUaU5FSzd2ObcrSWR70qbziDZm0uActN9owfqr%2B9uJQIBkhYxwXyIi%2BAlCk%2BgU5AWTYxDYByuH9ULM%2FOrC1jsyE6R%2BbeXqYt4GyBG0KvuPtPnN7HzEz1Kk1P3C7VtAiYURmcU72IxrJZ4Q3LRiPs4V4fXHatc%2BJ%2B%2BJkp0mWRNE%2FGZhV7GM49IJPki2e%2BxjWV9Vj0iZi0hLFxjNQModVn3UzFAvixv6IdQS2rj1P%2BI2Rfs5FVhWA3kRNtSv2J%2FHSXMjMdN5CXlwxDaUyrrr9pDQ3dkLvPtyvhw3qozyo%2Bwf3YldWmmdbH7zHmfUuqVeFMPopYPgS3EnqdfoqLMxEd74gCS8oj9FvDnRv13VCWgoGYIXqwjvt4ChuqtIUxJgBvv92Yw7rqxzwY6pgFk2S%2FOKURvSrhVA1u%2By%2BxgJPN7ShYshhkeMT%2B7ADV6FB0wjePBTGRfkVUIwlSSTUTchteveeTAJbGyVAB%2B6Vs1mmcLMgvSNsUvIw%2B6NyYDwkhjMpekDeWTm3gXkt3y3APzABt3JoUo1pET4U90tzaGiqd2KA%2BZ%2B%2Be1Ti5TcjDPyLAQ6cpUR%2BoYixhurKL2Gppe56B6DS7w9nItjTTSOurVen1QI6cz&X-Amz-Signature=4687f2a11d8bd2efb891b420298b87a5cda7aa095e8476518c3a3caab6197b97&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUKYLT2K%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDQHafaEHBRrJhp5bbWjxZFnc%2BSj%2BiygXUpSBQaTu2v5AIgYt3qLTav%2F4%2FppKbsVG9Pm%2FDP%2F%2BWHoapiQ1%2BP3KDwfDMqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD9QJXwwYrNUuVakHCrcA29kv18oBYWbuW261Uck0Ka0tS5FeqxeOZy%2Fbq%2FGT8nDneR2lI68e7Ra%2BAId0r2fNI5VmjfwsRTlzd7sgfRrEzUydljAnPR1u1HLDXA1zAt8X9C0%2BKXKNr8QgbvlcRTiOhL0Rxa06FJelaSHsTVYfMuts6%2B2ZpDFKRru24PQKxKtZB9%2BLrdHp68gdnxjTBphX9uMXNS%2BSYXnAHmM%2BLsrJi6ZFxrMy3uolhUxD15Qbdew%2Fh8ofgRjvy0DgmlMsnLFaJZpWxBOVHoLdzTzjUutEzTFudsZD0LEAnNXyZV9L22MuxZRMNTVDLZxV1kGWItBBhzFyJz%2BCbpFilpCNEmwTzV2KdWBrg2FY%2FVd4aCua94aLjVIC7RragQ2rpPByPydxPBsbq0sjqyT9k58qOxFKnpuam523cE9VEGDXVKBjz%2F%2BW6u7UgBkHNX2tPpU4vRKpS4hY%2F0ed4TcUkYrHBWqnznRhSEpuPSaI8auRNdtPoKgG5t8Vs3CXpEqy8woUkoCJMmOjLVdnLHEh0Za0kBufGHjN%2FOaP1dmKTFmFkaFpxM2Ug%2FRoAcD3Bet5VIa2dHtuxGLW8WX3AFOUe%2Fa8myNpaNa%2FZ2MupmbqzQgrAwxgiyJLWdbIaRT%2BCVxGzl3MJi5sc8GOqUBP3hQlXyhc4a3uG2OVqG%2FaOyIVBp1D5J3FId8sSRWdPQGqeGbEFzGKNscdfal0cjNDYXKsYorShqaqbjGOhBt5moZZpqGD73dFu%2BFnBXjh7VzYczl90sodZW837aLLJJ%2BJGbc58mppfkeBhuNjZoVt97zzSeAGiLF%2Bd2lduqHyz3Q7hr1UM66NKGCJNAAaeXb7uT3jRwP1OaO89bssyWu%2BByNvO7n&X-Amz-Signature=76995bab891ad319adf2a6c39e9496b2ccf24adaf592d5888eff07600c009205&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WV657CX%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDu03cqbTlu3AtYY09LMnZrtJKk1s3wOEHa5l7EGuemcwIhAIDFNfHkw2UEu6XSy9rN9caf13QvOAfBWQ%2B%2FUz68uuFEKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzIQ5nTMmk8fwBlQ0q3ANvb4drr9zKe5nSF2ifxtPaga2%2FTtMCh3CQo97%2BR12uhPWEWBsNa642hpInPBgwBRlWLaQSyNduXCoJ4YLtafGwdPDFhxIA2jfGcSsRQ5q773haK3pMDQSiLE6oijvNfHrnuzGKwGQc%2BDZ5bnpfXeU8KciD9Fw6GfefwwBeCDwfSWyuTIZa7mz9oMcsBGrJGWwJwSySFhArUcSEN7kgNSDLAmQQDlxx4g4xU5LwL1TBxmTKGB2nX0PB1TAuFnKTFUw51%2BKcuNIUYShcmxhmp2szshKMJeGHTyeXa%2FlwIkcR%2FMdUYPoADGiKxHjARFjRM0kKPQeAHagitLU2dg7EDd9RLH3hIdQLap5UuuvPhDmwM1lMXxTaGyayGGUn9rX4XlUIZvyYO%2BKJ%2BxdD%2F0%2ByBFz6Vc07Z9%2BXrpEEww%2BIFTUmSwM4dr46rvRL4%2Bj%2BiLy4hH1k%2FAxKm4Kq%2F0p3n6%2Bpu7KLzsBpDD5pHt9m3umTRo97fjWUdHeuh5sCHe%2BhzQzwvS3rIYhVSnqFURtF2FIaK3t35yLSbOrgQ%2BxW7xIkUIu%2FQ91sv%2FjX%2BHQ0LzhRICvoV%2FjWp0WMG%2BYWjs5gyN%2FoB6AD0vmdurJZasKooCVpzieURrGx4p7PpkkV25N0aTC7uLHPBjqkASpSu3udbaZTp8xPFoY%2FR7QUNC9t50QTXecSRJpO4emnNPrm1aeCUE2SA5Ldy17mOXCrfH3ljoAnRySa7sT3UTmuDiUnAxmqIk8iv0EJI8kc4r4Gnif52WBmzUjZwgm0DlNhyAzjTnZK0wejET90JPhn1n6AhR1KvQSFeJ3RT%2BuZWWoBGj%2BtqKh7QTJ9ijBgXqA4pze%2BVv4P9QrbQw1ft4x1a8Q6&X-Amz-Signature=2c136218491da8ee47a1da8256ee753b69e98f9db3a84cb841d2d0896e01816d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WV657CX%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093841Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDu03cqbTlu3AtYY09LMnZrtJKk1s3wOEHa5l7EGuemcwIhAIDFNfHkw2UEu6XSy9rN9caf13QvOAfBWQ%2B%2FUz68uuFEKogECI%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyzIQ5nTMmk8fwBlQ0q3ANvb4drr9zKe5nSF2ifxtPaga2%2FTtMCh3CQo97%2BR12uhPWEWBsNa642hpInPBgwBRlWLaQSyNduXCoJ4YLtafGwdPDFhxIA2jfGcSsRQ5q773haK3pMDQSiLE6oijvNfHrnuzGKwGQc%2BDZ5bnpfXeU8KciD9Fw6GfefwwBeCDwfSWyuTIZa7mz9oMcsBGrJGWwJwSySFhArUcSEN7kgNSDLAmQQDlxx4g4xU5LwL1TBxmTKGB2nX0PB1TAuFnKTFUw51%2BKcuNIUYShcmxhmp2szshKMJeGHTyeXa%2FlwIkcR%2FMdUYPoADGiKxHjARFjRM0kKPQeAHagitLU2dg7EDd9RLH3hIdQLap5UuuvPhDmwM1lMXxTaGyayGGUn9rX4XlUIZvyYO%2BKJ%2BxdD%2F0%2ByBFz6Vc07Z9%2BXrpEEww%2BIFTUmSwM4dr46rvRL4%2Bj%2BiLy4hH1k%2FAxKm4Kq%2F0p3n6%2Bpu7KLzsBpDD5pHt9m3umTRo97fjWUdHeuh5sCHe%2BhzQzwvS3rIYhVSnqFURtF2FIaK3t35yLSbOrgQ%2BxW7xIkUIu%2FQ91sv%2FjX%2BHQ0LzhRICvoV%2FjWp0WMG%2BYWjs5gyN%2FoB6AD0vmdurJZasKooCVpzieURrGx4p7PpkkV25N0aTC7uLHPBjqkASpSu3udbaZTp8xPFoY%2FR7QUNC9t50QTXecSRJpO4emnNPrm1aeCUE2SA5Ldy17mOXCrfH3ljoAnRySa7sT3UTmuDiUnAxmqIk8iv0EJI8kc4r4Gnif52WBmzUjZwgm0DlNhyAzjTnZK0wejET90JPhn1n6AhR1KvQSFeJ3RT%2BuZWWoBGj%2BtqKh7QTJ9ijBgXqA4pze%2BVv4P9QrbQw1ft4x1a8Q6&X-Amz-Signature=c78cc0ad2f14db6e481856c9be50df96a587dde85a81089849bdbc7db278eaf0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QM6EIXYE%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093836Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC30lyfjYfni1%2FLkhLCpmuy9PGyeaH1va3rYh0DqQJ%2BPwIgV72sbONLK%2BLywd7%2BLRqUu7TqiBnspijYYiX%2BhsFTTQQqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDL%2FFT3x7K31LZMw21ircA1RlLx5Sm21sKkO0CMqbjmlPBC86uEr8V2fmn66XgQLJ%2Bz%2BDqx1sy1vit4utFi527yZ%2F8hGHjr7QohS2pVnC9BRKpHuy6%2BCDyPfCJRH0V2hsk%2FefsUuzqlaxVHeBvClQwGXtakr48y6bKgz%2BXg7kj36ltpR5GXurt6z8ge9rt2PNJY0Sn5z57CyCksazmupSHwCJpM959MPuWOuZDRmyYBGcRdJchCQ9leOcpirBlli1rVWh%2FTR6CNchtF3Rr8BcN%2BKdsUMdMI91VE9h2hHarVpeYJfOO4KaOMvL30SVMI0xFW7ByWRmPyiJe1eAKZPMqtQ%2BFq08lhAF17l%2FN2aJRa%2FwBVteIRpVtlledtL58WY1ubP9JJX8%2BbU5kFtxvxEMJ1jfjcQJYcyUrGBLwJW1Lc0k1RIEHlOkNDt8XBmGAnPbIF5tx%2FuJ8sBYTDERLMOfdboOJq%2BN1ukasLAZ7uspjxHb6bMCnmGunpI4hpWy3IJGWLgYulERPMnJmYwE71H8NQgZ1mYnLzrG%2B1CkfIAleS2z42zyQ6DtGpcKqdD3930tYmfWcPgii775zMpV7mM%2BdArpL%2Bi5gx5insqoabg7SWdEBzB84ID%2F0Q1dTknBNgF0cc3oHb4PuuGflzMzMP%2B6sc8GOqUBgYTwIhn1HlErKfVMNzfBR2csrnsISzULvaHVP8ZhAPs61ZWc7ts%2BP444p7VIblG6OytXI5JrbnGf8eD%2FaQFypluFn8RKRPn0lMC0Kn2GHRN98rDRgvPq6%2FMJFSge0o6FSoHGzSLgL4QmKUKT5G2EJ6Fny%2BjvlsfAnTyH7WrrJmAp%2BQbsh9CPo3%2Bf1doTtZBGs2qS74yy6iuPI9B6RdkqRy%2FSlOWt&X-Amz-Signature=097bd1ca4a48ebd6fd00b4ec6780b50739b4332c76823e00ac336b319b1cd088&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663M5WHAWA%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2FqUeO6atynXbl7m6siddooeNBKcyt5HVLjaE80A66PAiEAx%2BoHU8sOYEQfUD8%2FSKZMSSRFHlBfD%2BKCZbfSEQMZUcIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJ0ZOJVmSmaiauGqyrcA9l9%2Bu4dopeK0VsMaqnglU1nXBufw4eit1mHbr6dquds5G3TqZtGK5lSfceG9KfPNiMFNneSXpGvJWFmas2DJYNazM7PgZz6AsdLg9vVOVe34vLcft5dUPl7qVW5YXOOmM6WleJOhtvUyZTeaVczpImyBN9A8119Ax%2B1ZcHwPOGJCDRe22R%2Bgpv4QYMFXNkNvJ6X30MCvfDUKyBgmAfHIIgnhalPn%2B%2BpjRcT2s%2Bs8SIIsdre7UsC3YV0hxTSLT%2FNCODBiogy6RRyGuW1rs8kqJDC2Ou4Bd4%2BuCyhcwrXmh0heTP4fNtpQAU1dbS0z6JAyw9M%2Bn4oYTpVWlJGUk5LHXgD1Afri%2FFYxKQ6h3%2F1XBgg62B4RwizIITr1RIig5XLnOqDeOspcVhs4gmf2HmVCnWKOIviFC9wDAwPgZ1%2B47vbTw9JogwQxX0tueI98uQd%2FGuLg2vQZuR3e614l0vIlDvOuoU1ZRMvpqnhoCrjwZDsnqlyg4EuulBlmv%2BDMW7sXtut%2FM96bLaHjAvPAf66vc7Lls76dYgYCT5fiYbj6LaUVT8L9PHFH9Y7e%2BSj2rih%2BZW45iqHFOptDVfIVt%2BuQgXS2MJTjBQVdkwUCiv3A7gG8Wh9MOFY9GSAuqe4MOi5sc8GOqUBjYoA6pq%2BnazdxBRdsjp1zh1YgHALBawEn9YmCNmNW9gUMSxZ%2F6BgafGsECnwnN7c30d16rqiQxuoz9jSkZ1e7fnzGI3HW%2FwC3y%2B7KGS8EVIwkGRnsXi%2FsVFPVGGJA7D4rCy1y2Xscha2as7YpQngJBr%2BPzF9kC2v2azA%2BM8BRxKXNhJm28kcu8ZFEWMd%2Bls2yPJc26aHj1MLHNtOlvuSx0NlfsHm&X-Amz-Signature=801489189be4daa02002c0d861e89e3bd95f73d89eb1d5215e6088670ddf8299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663M5WHAWA%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093842Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC%2FqUeO6atynXbl7m6siddooeNBKcyt5HVLjaE80A66PAiEAx%2BoHU8sOYEQfUD8%2FSKZMSSRFHlBfD%2BKCZbfSEQMZUcIqiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJ0ZOJVmSmaiauGqyrcA9l9%2Bu4dopeK0VsMaqnglU1nXBufw4eit1mHbr6dquds5G3TqZtGK5lSfceG9KfPNiMFNneSXpGvJWFmas2DJYNazM7PgZz6AsdLg9vVOVe34vLcft5dUPl7qVW5YXOOmM6WleJOhtvUyZTeaVczpImyBN9A8119Ax%2B1ZcHwPOGJCDRe22R%2Bgpv4QYMFXNkNvJ6X30MCvfDUKyBgmAfHIIgnhalPn%2B%2BpjRcT2s%2Bs8SIIsdre7UsC3YV0hxTSLT%2FNCODBiogy6RRyGuW1rs8kqJDC2Ou4Bd4%2BuCyhcwrXmh0heTP4fNtpQAU1dbS0z6JAyw9M%2Bn4oYTpVWlJGUk5LHXgD1Afri%2FFYxKQ6h3%2F1XBgg62B4RwizIITr1RIig5XLnOqDeOspcVhs4gmf2HmVCnWKOIviFC9wDAwPgZ1%2B47vbTw9JogwQxX0tueI98uQd%2FGuLg2vQZuR3e614l0vIlDvOuoU1ZRMvpqnhoCrjwZDsnqlyg4EuulBlmv%2BDMW7sXtut%2FM96bLaHjAvPAf66vc7Lls76dYgYCT5fiYbj6LaUVT8L9PHFH9Y7e%2BSj2rih%2BZW45iqHFOptDVfIVt%2BuQgXS2MJTjBQVdkwUCiv3A7gG8Wh9MOFY9GSAuqe4MOi5sc8GOqUBjYoA6pq%2BnazdxBRdsjp1zh1YgHALBawEn9YmCNmNW9gUMSxZ%2F6BgafGsECnwnN7c30d16rqiQxuoz9jSkZ1e7fnzGI3HW%2FwC3y%2B7KGS8EVIwkGRnsXi%2FsVFPVGGJA7D4rCy1y2Xscha2as7YpQngJBr%2BPzF9kC2v2azA%2BM8BRxKXNhJm28kcu8ZFEWMd%2Bls2yPJc26aHj1MLHNtOlvuSx0NlfsHm&X-Amz-Signature=801489189be4daa02002c0d861e89e3bd95f73d89eb1d5215e6088670ddf8299&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2EN2CDA%2F20260425%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260425T093843Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEMb%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDqFVfQy%2FrfzbDv14D%2Forb4nUFI39oXAwUgUtqaMBLdvgIgSRPbq3iiQUL0DWFU%2FgzIOVpGhvhoqTvOoeTiPoeifc8qiAQIj%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHxAfyi4WpNse4b6hyrcA7cdcHPxAHTPxSQicRxg5JXyuOf44IbTiwFBofA1vdFBxSI357lk3AaXm1AhduYvmRsLIEhiYNKYe3IvHf%2FZvj3Zu62%2FFN80yDdUUKFHTJQfnxHyG1hV2d1iXbU4tDIZIFYq1qi1QkBLbfqxkJHTFVgHFtSSkMMRExvoTpCwCX3loocXjJI0zj%2BulIY15mt5G09Z%2BJs%2BatRGQWKolYodi3HurXVHtLiHEVze5xFH1XUoUEbHy0AkMQf7O2wzrSVENdxXGwAatdRWExvtVANSO92IiKw87Ra4oKf1fsQCeFRWOyMmzSDZJgG0cJ9fZryZdhQYiRmRFrkxlXWah3x9%2FXlSZy6o8bsSzUO6IJ3G9x3WxOFLtIqgVj1Uj7XeSGBNty70WS5%2BSlLHu1MLbdYKGSKYH3o5m2pWftzBaeX5TkRw6ITgWJNRPjBqAnc9ZsLBKTpykvr%2B9VbsXFT03zd7%2FtAfpwqiP6fIRGOtQCm8zGP4DV8ofTLLpTUJ4d5VF7xjeEL7CGkscdTxvR8OJoJJsdryJ9Mo2CicYKzxIUThhOngkCPgdzstyCuPrQ8p6Tof4kakc99qmwkGNMPxw88UraVqhXzQavZA48pIddkuiuuUCYMLnf5Yx1%2F3cs%2BUMNK4sc8GOqUBKS0R%2BFxiKzseliBW63Jcf7BItiBjHsduWFH%2BtUvRWsehqQTuWIAU6V%2Fz2HJXpEdf%2FFEkAg2P5%2FAU6lfzpmVxDJH44NjyojQnA5yC9AsD%2BCfHuCWUsXvELdvlt862k3ptauNRTVopn4AhMLui%2BRKbxoJp5mGfdGpGkxgrRA6Ekw5KbfLCxx15WQjonvaP1KA7%2FM4k4a1xMTzPaf5kuwzkibYxh%2FMX&X-Amz-Signature=4f4f506e166a9d3cc3121c490ed174fda84f3cc656b388833c911cc2c7218b9f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

