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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VSJ6PJS%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDIbXPqTwAuG7f9p%2Bmhpq2VOSc8HkuPpsx04C35GbR%2BmwIgRo3%2BZZVyS2a%2FFHZtBeNRAZJ4GUjVgVULkqCBT7jjtFQq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDOYlt0FLJ7MGiJSBlCrcAw7a34crBD2Nc5UEE9quYkPWX6YCiC3aDLUjWajax35CqykIlcPCyrQbTJVVdrvqdNHE%2BHKWv%2FHbSskIK6ODLaXcld0xNWPDvjmWAceYYRdlo4RUBmIkhr7TmbYZCBRYSc7SK3hPzK19Ab6sWpwJhByq8N90Fl06c9PFrb9t29Oto09jou1F1LRkx%2BIHNJqHKwMWRDMq%2FCgYfAv0epvoQ3DpVj5tmh6ufEAUvH1SoEJAjKnbeLKn977umkUI7bJqvRb%2B09enKwJ%2FrepT1PXRrnGH50tffcNpD724z3O9UJhhxMLfsMMaqt8AcMLh0cis1rG5V4W8y%2BDz%2Brh%2BKwVitqHiawd9iNCRMKbkGW1JspiEk06KlEo7xVQ25F8eadlDoUa8upScoxXtklHybRy%2F0iOHK%2FnX2stBs1Gj52u9AT2%2BUMnLT1K7bNzCcTaSHbQwSECtzkyCN0QcLc8zBtuU1FD6pfV5d4NkEQWjsQLanFSCmk2b03eDibATNmfc%2BSnh0iUBU%2FKy6wY1VpmMtAk2xxrY1%2Fhjg4As3g4mvYrItncDxshDg%2FNuzxlWOhsWBGez4OHEfZmvXkkgkLVv%2BDTxgHGxVJywG6thZmMep9FyTdKvnJ3PHXUi%2BDGqGZ6LMIzWx8wGOqUBMh2%2BKT8U6QyKsB6VGc6yUiZDxT1IgXKXF7%2FFgKZWQKwnd4bV69XE51EezlByAU9RN3skGB%2FoV7HGoPAEmoqaRBPAVH8fueZGI1nXSuJS22XHWJULarrV%2FUYdvvGDdZxUb88aS4xcBsGXWimLTTf1BfprNObdDHsY18PnrUTVAJJNRpeHgooIpYhPmBCh7BWiqKyEo5ckEUBzEy8Rw%2BfIUuOh5e8C&X-Amz-Signature=41c2432afdbd8896517e883d44bce475d843773eed0a82ce654fa75585f15f01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662VSJ6PJS%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161307Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDIbXPqTwAuG7f9p%2Bmhpq2VOSc8HkuPpsx04C35GbR%2BmwIgRo3%2BZZVyS2a%2FFHZtBeNRAZJ4GUjVgVULkqCBT7jjtFQq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDOYlt0FLJ7MGiJSBlCrcAw7a34crBD2Nc5UEE9quYkPWX6YCiC3aDLUjWajax35CqykIlcPCyrQbTJVVdrvqdNHE%2BHKWv%2FHbSskIK6ODLaXcld0xNWPDvjmWAceYYRdlo4RUBmIkhr7TmbYZCBRYSc7SK3hPzK19Ab6sWpwJhByq8N90Fl06c9PFrb9t29Oto09jou1F1LRkx%2BIHNJqHKwMWRDMq%2FCgYfAv0epvoQ3DpVj5tmh6ufEAUvH1SoEJAjKnbeLKn977umkUI7bJqvRb%2B09enKwJ%2FrepT1PXRrnGH50tffcNpD724z3O9UJhhxMLfsMMaqt8AcMLh0cis1rG5V4W8y%2BDz%2Brh%2BKwVitqHiawd9iNCRMKbkGW1JspiEk06KlEo7xVQ25F8eadlDoUa8upScoxXtklHybRy%2F0iOHK%2FnX2stBs1Gj52u9AT2%2BUMnLT1K7bNzCcTaSHbQwSECtzkyCN0QcLc8zBtuU1FD6pfV5d4NkEQWjsQLanFSCmk2b03eDibATNmfc%2BSnh0iUBU%2FKy6wY1VpmMtAk2xxrY1%2Fhjg4As3g4mvYrItncDxshDg%2FNuzxlWOhsWBGez4OHEfZmvXkkgkLVv%2BDTxgHGxVJywG6thZmMep9FyTdKvnJ3PHXUi%2BDGqGZ6LMIzWx8wGOqUBMh2%2BKT8U6QyKsB6VGc6yUiZDxT1IgXKXF7%2FFgKZWQKwnd4bV69XE51EezlByAU9RN3skGB%2FoV7HGoPAEmoqaRBPAVH8fueZGI1nXSuJS22XHWJULarrV%2FUYdvvGDdZxUb88aS4xcBsGXWimLTTf1BfprNObdDHsY18PnrUTVAJJNRpeHgooIpYhPmBCh7BWiqKyEo5ckEUBzEy8Rw%2BfIUuOh5e8C&X-Amz-Signature=41c2432afdbd8896517e883d44bce475d843773eed0a82ce654fa75585f15f01&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QIUY4P43%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161310Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQD2wV1mCeOd4gzGM9slWl0IPJhk7yEsBU47jMbbJRaglQIhAK4emLaczuypHjd6k2MpmMNJrVmRkX%2BABI%2FItAKhEr8dKv8DCCEQABoMNjM3NDIzMTgzODA1IgymgH20gsJgA6zdafcq3AOh6efuDq7qUSawXo6xgKfdzX5E4YfEfwtOTbEY9Lo9RCA0C0HpyEIZkfwBI5Fm9%2F6DlY%2Boi2NhuNNhZB%2Fr%2BrKOh0RpP4EZN3EnxX%2FpG44Qr1jb%2FTSyXTtJSd4w8316qSRyT%2BWdmNXRIB5xGzTdofhiTcj1h%2B1Qd3Y1Circ51xRFzoJDkao50IUdaYet0PcF20XSkozDn2vIZZrDEg3PcE%2BYyBWFYUaMVxBHrYqNehR0xTl4N6NDGS01oU%2BWX6BBEAuLGVAOBvumYBYlxNUxj2UEbIksjFssSlhmZ%2FsheeKSd2O%2FhLlQ1HqEuM%2BxkXc6QUfqgZexJ7W2XxOi4POh8j9nnaH3LyDbherrpxMGCAdA6fujDCXjrLPyre4Gw3Fk7gQm%2FOIbeAWWMyLmVjVR0EFcjVZOo8NlHMLSaK%2FdqpqbvJ%2BB47dLpGaYTVCVpjQP03XjL%2F%2BOc78QYdVnygNyBFGAMGAIyiK33C%2B9PlmL%2BztykRrLYSZ7ep0BO3CDajnq1DacCnsf6IfxtukMzBeLba%2FfphSTvEnw4A1BfHCSaM3XaMdEYN9TsZw5x0Wbn1XRCBrrUsO6EjYMhn%2BvHuZcmy2Y6UMAOYY6WOWOdRVgKum6bJq0eccL3WoDOVvHjDp1cfMBjqkAeFO%2BAxlSef17I7aqsX1Otxw2MtNaDPz9tTiwsYpbfKSpf8knY0x6tQuOCDylRVeKs6DgJMxwuK2KSx4s38xJupW087V8cG1kX0nPTcRmdWOPbwfop0UyrTcC4xLgEvGN%2BdHgVEMNLMV0nRbb5f%2Bc8RO5kk2Wria2rMBNgGEKJeX%2BoCJCQ0KmyTZ1z5Hat3Ms1KBhTBhcrbnToCsFTYmHdRirBTO&X-Amz-Signature=0468142701ed82ee48394162090f7c25f5cf8f3daf90343e5faa558b7e1c7e74&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZP3BGQH7%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCJM9DFQfzg7E0SXMHHyqRjnxiuTN2%2F29T0TKdJ5%2BgrgwIgbBtPazdxOaVrxUEmHSiXjNbXchhf2tkrl8l%2BoRtw51kq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDAJobZonUyKnTKxq3ircA8KUSGfC5gVzzeCGWTQ9LDTdeojfSF7W520nEcNNWue08aLIFEyAry0mVjkVF1mOYPIhAbbD1UXqBcU5eB%2BibofVTDGuh56eWcPuNeBCaK7wVMSxxdRN8Pz5ifigH%2BpeB1PAa%2BD1Zsi1SmHwlMNhNf5z36wkw82A2JqMo6daQjgZ8eu1ZUd86ftd%2FkTpx9cFBQ67RodfzTR2FfpLRTRX5PmBm2KuPIO5uFpz%2BR8CFANKKTyWpdMMrmEJiNIOpvOwXkre8E0Qo3mUFH30%2BzCQg4EPiDmywD49U9sGkkCx9%2Bt0X7%2BwGh6ZHkSEMjzYWopK%2Ft6ZBSfiNQXpry6TZ9AxVrR2iapxUhcXQTcNsFDQZMfQTNr5jF08of51pK7gcFcYb%2B6AGdK5n0VOeB1A491fgI4xwexdHo9BjJ%2FdKFlhrZ12mK6RtPze3h2G9IqDqZl2ZJFGwAzuiTuCoSAIaBz%2FoVJgGvSii0cipsuoZiqZhvp%2Fld4WAB7aPYQ36rkA1Z%2FZ5dUXVOhgDENlliA6hprMlFdfdUqx%2Fl2Q54hnLqMND1fzidCq3%2FSrlqYNYhZ7WBRhlaSlZpll11RdfZ%2BVmCkTggPjTAtJU4RErmumyFcSfdludD0%2BqLm5LaK8p%2FotMPjVx8wGOqUBF3sGe3R5jJQtkAyYtZh16hroX9O1Rsqp8x61G3kdv6BvClGfbPOOsC9rkX0sGtJsn69j%2B3fKTqe8v3FT37pE%2BFi8l84PpYD8sd4MK7fpyZCDSi3e1c6X7SDe%2FXW6nLJKKuBEa16qiRqkmSgb85E%2BLlyj0N3KHOuVewcVGcJ%2FrEVnzGqAwLdlNeLthPXpHBqMrSQtH%2F07%2Br0M2Su0k4F612uVaAOB&X-Amz-Signature=f721a3a6e2f1223de387b521fba4bc2385d0408bebf922f474ce206da0918548&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZP3BGQH7%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCJM9DFQfzg7E0SXMHHyqRjnxiuTN2%2F29T0TKdJ5%2BgrgwIgbBtPazdxOaVrxUEmHSiXjNbXchhf2tkrl8l%2BoRtw51kq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDAJobZonUyKnTKxq3ircA8KUSGfC5gVzzeCGWTQ9LDTdeojfSF7W520nEcNNWue08aLIFEyAry0mVjkVF1mOYPIhAbbD1UXqBcU5eB%2BibofVTDGuh56eWcPuNeBCaK7wVMSxxdRN8Pz5ifigH%2BpeB1PAa%2BD1Zsi1SmHwlMNhNf5z36wkw82A2JqMo6daQjgZ8eu1ZUd86ftd%2FkTpx9cFBQ67RodfzTR2FfpLRTRX5PmBm2KuPIO5uFpz%2BR8CFANKKTyWpdMMrmEJiNIOpvOwXkre8E0Qo3mUFH30%2BzCQg4EPiDmywD49U9sGkkCx9%2Bt0X7%2BwGh6ZHkSEMjzYWopK%2Ft6ZBSfiNQXpry6TZ9AxVrR2iapxUhcXQTcNsFDQZMfQTNr5jF08of51pK7gcFcYb%2B6AGdK5n0VOeB1A491fgI4xwexdHo9BjJ%2FdKFlhrZ12mK6RtPze3h2G9IqDqZl2ZJFGwAzuiTuCoSAIaBz%2FoVJgGvSii0cipsuoZiqZhvp%2Fld4WAB7aPYQ36rkA1Z%2FZ5dUXVOhgDENlliA6hprMlFdfdUqx%2Fl2Q54hnLqMND1fzidCq3%2FSrlqYNYhZ7WBRhlaSlZpll11RdfZ%2BVmCkTggPjTAtJU4RErmumyFcSfdludD0%2BqLm5LaK8p%2FotMPjVx8wGOqUBF3sGe3R5jJQtkAyYtZh16hroX9O1Rsqp8x61G3kdv6BvClGfbPOOsC9rkX0sGtJsn69j%2B3fKTqe8v3FT37pE%2BFi8l84PpYD8sd4MK7fpyZCDSi3e1c6X7SDe%2FXW6nLJKKuBEa16qiRqkmSgb85E%2BLlyj0N3KHOuVewcVGcJ%2FrEVnzGqAwLdlNeLthPXpHBqMrSQtH%2F07%2Br0M2Su0k4F612uVaAOB&X-Amz-Signature=4e002df4232e22cbaed74b53944dcf057b65319f2e7e382c5cef0f577bed2825&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664LZUUHYC%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGT3Gb9Pu3D7rcXlpXSj%2FlVRWS4l4hKiIZXrTOdAQlP%2FAiEAxoklAwJjpUyAF9WY5JIANu%2FSrNUBlYSjEK7dBG1%2FQpMq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDKpHvJ9BJvjJ2uwNcyrcA%2FQv960Qs58IJS6czyAGC0VPDeb%2FGbtacrjM3bjRTkzsJnoPbwfK5vYQniyNPa50lOTMkHN%2FewHx3xqku22m3RVdhIvLAuEMvrt1nYOA4niOcVUtPX76qpLsVhKrQmhSNrs5lWNtzmrAK57OBCSdV7yLLQpflfFOx%2FhuDnDcfDDfTn6MsVyJrc3kDoXzcMrceixJDofDHtnjob1Ar16uJjdUdGqkKwMWg4FbA1OloMXnFdjBsVj%2Fcx0h3%2F2WAzbqk6F81%2FVjW3cUY%2FjsRKru43MXu12NLs2xbo4Dpci1COOzS9zN3%2BCdd%2BjX6TxekAsLP3ecqMRuwA0OwMur%2FS5hLaAoYyopUkKhQcXwHEcn%2FfbNyYq%2FMgNEq8O8elkutiZQ9U7tfaWPZPLNVgOtLp3DU0tGpc882ykBX9RzPM6FsVTzQ4AibR8H23yeFeKQM9jYbGNlnSh1YV6wQ4tcAOIDs6skppXbZb6KYYUxxkviFYACoOVOg57%2F4%2BkBk1YSuPO761VXx6cHUfGnfRxgwNaVTWm1u1w9DUupZbpnGWikIq6Eno3MeHhDYjpgWzseV%2FVs%2BJET3dM4RtC4VgxhJVOQrTqcNL1sO5T8%2F3yja2%2BvpKZXFLVuCyXzf%2F0rt54fMNzWx8wGOqUBSnKJplg4gdXjz82m6EsGHX0e8T5uxlyInEy9zE3wnR3tuUt8wMJJ0SOjKEG6FAyr2AL3PP0To0XJ23CASMwOQ%2BZ1Jjg1kj5BOBftjO0VnCMoMVaLG28MWfDpFyrrFtmJIt6AKlwCjH6w8IMgLYgBA6dXwOcWStzTCC4C0%2FbHS1mdSTnX61YtJNZ1U45Ywztkai64lbHQxocOBvHHVfWlOKOEmEJH&X-Amz-Signature=6ec519b5b9330a781a7bbc37aaa09a8ab49228738f5cfe05e409c254331d5c31&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CKIFXP5%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIAL2JPJHqm9p5YAVV8XDyvQw28cF3hsAGMyIsm07apfpAiA3sMijRUWlk30EH5Ul0m%2BGOGF8%2BCx%2FK4Z4vj1XmhkkbSr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM8Lq7MCYPGWRCu8fEKtwDLliD4AgY1Hyj92A%2Fgh39xd8tOvbcyv2WdwtxS50%2FBKPNUz2EaEpVw80HdmtugkCPxhDbyY2OMRc05uquCtw4v1PB0LSngWg0wPnKg%2F4edi4dvU%2Fb3ZGAcAdr%2BgulZbZBzoVbIn%2FLCbPhcgTA3R5YJiw%2FZ4HRcqlxiF0aL1Ys6ZYQowOHi9APaBNFudJpPTIr%2BpQHbz015B6CO0OnwFZV3aFGD0nsFBhiHzUwzzYq%2B3%2B25umVvGeyeRFaNkFlTXcawjHDtsKE5QEmqtgb4V%2B3yQHw6RDIYOBaPs0yFeUYBcX5%2FIrpw%2B7PbI0iOAh%2Fv%2BS6nD62HsadjM26dDJQV6M%2BucutIJwwdHfvbTQOrzthM%2Fre1SewRe8kulmeGvLX2dd2Rb897rclxBHJrahe10JS4DEyP3NqiBisteRb%2FutHGK2kL0DMjRQMvBusYX7%2BW0qu%2FIQ1CVar6f%2FCZ2BzjtVdfVrTbYvz8deYXBcwxU%2BNPVEY4%2F5tdPgoQSX8L8BNQJBUhvvvEPTyYNHlwIW%2B2iC6nrSt1lcXRGxBCWMamtyTvXhH90hWHR46Ps301bPf74H%2Fk%2F6embiVIM70u%2FYi76Fct2SQGT2WO4IOrN0OvV51VaWFTemlURr62cHf%2BN4w3dbHzAY6pgHdBB5c%2FU8z5kJSVtqIyMvgrlb%2FnSfgPF0arrjB87%2FqhDabPsfF0XePHM9hoDT%2Bdm13Ez%2FragvWEUc%2Bpp4o4qbozS%2BAxT9pknQxhhfyqObUwdQXLZRs7%2Bwh4fbzbJvcHaf4q2IwQ%2B4S2I0XzwsukWSZhXv8NdmcOiUp9UFVwD0w6ECiRoZ61g88d%2FfQo6leBroftzmHPSM%2BME3dBKCCNKmGV%2Fi5jUbB&X-Amz-Signature=74e20ebdc27d752a9f87629704c3664847b7834040461fa9cecf8a411bc91f6d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662NOQAST2%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161317Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQD7sp9ebfogqvtEqFYWAVVL%2FLrJdFZfX39HcvgASWh19gIhAOkzF9wrX1e8kdZdGy5tU8GRnN34c1DIKTyS8Ehq9EdhKv8DCCEQABoMNjM3NDIzMTgzODA1IgzKsx5dw%2BfZhPEwM1Iq3ANTeXLQpijv%2BcuYXwtYI6e9UapykBzY8AbEk5mLBeuvzJxFdTh3fVT9uZkyBCA9lMYeMmmqWGaMnFEy7s9QpHCCYQuQvgcqR6XUTyjipJmH6cnQKScL2gZLzq8wviguuqu3FRWonSUfkXY7lYG3ad7pHMuHhSNpFgnG6NAswEJUsCZmnGEMpLWMN1mJTM2B2m0AH2nyg5mOVQndVOnKUEWuURp7azSRsdUlDFwNwdtk99Xk9pY%2Fjo6ek1QlGCMPyfZ%2Fyf9Pxn5DWyRMId%2B5%2Bfnd6D%2FQa96pxPezcgtzw7EyQfNNEpxO37pgynxzmmqrJiJ%2F8JnkKZ%2B1nJ4ILipXepzZ%2Fctki812jkLj02r%2BzRbLcqdB7hJ%2BtUyUxVX%2BfrBY2YdpZyeRZqqWS8ssi1%2BkHyoUn6xeaN%2FYApOyuY%2BYU7DszYB6sF%2B1RRicnnUeXOU4TJ%2FioPrKwAYSFPrIy3PMRnU1zgxzUW%2BOM0ohn6%2FJT6RaK5vb1KFYN2FGZcgSU8k%2FQwXrq8TLb0fPGMmnApUj24EFW%2BvRThuD%2FM8b33gxqzXJ%2FgeTaUskVqBf1ZLn0ShLEnGZdaXujWGL23AvXIF9ID2tHO85U5rl3NaHcBJUJ60ed9go1qghVLd1EJxNrzCS1sfMBjqkAYmPlOBZHfk8x9v2awvwCplPxyjf4WcMUyqN3F7IwezhArW13%2FTCh4Y4gYsVPfwaPlXsvIQs0UCt8kNEVfwDm0rjhOU4oTjXL5Ljdf0EqwA0wHlxjMUAfPlb%2FDszhQ3Mc5AMZ%2Bdzc9AEKVT0p3OrONhdv2bP7jszqQywmk5zSulSiWT32cz3cTJzJGh7aAq3kZnxOpGgn9yth9Y7kh5uw2tqxmNT&X-Amz-Signature=12dd876b3d1eb0ca525064cb29e2c8411b5f8639472a2319554bc18a151c79e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD2CEKQM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIBmcBuUnWwejf%2B3mlSlJexHNF25US2hBkCDq4imA9vqhAiB0wXv%2BVHvh1%2Fk%2FXJ2Gr%2F7y1NOMyO8F0JNia0UZDpsRtyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMjnJrgj1%2F3O4EB%2BRpKtwDNCUj5kfzBGezj5vHO%2BAzoClqo64Bm4XCREZ37iWDJq46lIef6Ajh2P7M2n%2B8bKbmV%2BXtE8iO0lY5T0azuxMoAcVuzDUPO8r4s7l%2BNk%2B%2F0pkf6m8Xaou2pMR6UbP19%2BfxUdx052Vnu6JbmyfX6tjuOrG4%2BGsT6pn%2Fh8KYAvhW9fLhAXsyGnepPQPe%2FjpjKeCnJ4eQpxyeXFUzLVAJuM%2BeWuJbaDdjdQ%2BsABZjGsr8xtI1Ws%2BlHjBOn8Q9q0nGloLyvvC3uu87llER2XP5GF%2FtqgQxN4ssPv7QZbUQ6Ym82rmFD8tD3xzK40Ln9DMxTV3vQW4S8913gwxeOuaaQYmapeyTfBJNdFiHFUVquMRzdnqTAXL4Xg%2FaY%2FXzes%2BC0usqoJSIz%2BV7GXAJu8gyahJZ428DUxS1iLSFJz3rXXFeRPLRo1VLY8SB1j0%2B17y3uhCrmnYAe9FVqW%2Fwtpl65uI1YIvUFJsvwntuUUzoLgqJebE%2Fok%2BceTwDwQKcAEeJVv7P%2BnRkz8Xu5HhLg1vOTozo8KkYUlQfcS35TMRdW9liKL4o8%2BX5QPOVt%2FF4Y%2B3FWmdbcOnJtoUsic8BuGfKz3%2B1fE6CmDrotiZpK7xST5DfVEzXvmXQd1rQSw%2FLJygw2tbHzAY6pgHV9N71BKkmK8DEbYWYfjcFAJKwSSSEoR3zVp2iskSi585B1h4NLUx5nP%2F8mKkYM4YnHKcR6ycF7%2BCeHZSx3Fthf5oU6KIdLsu2lV8Pq9AsKfiNEvY4iVKDLMdVC87YNxA11eOi1uOq2CcTJNuS6pvQhEDPD79Wg7zUnYv8ZMb6iA0sYX%2B7qoeFpZfQ8%2FzYUUbatp9z1cCGTGJRgR0ARv67XXCgZ2nR&X-Amz-Signature=7543088009f51fa64a67f94bee0da37877b88fb925e2949f20f7addab7792afc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UD2CEKQM%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161320Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIBmcBuUnWwejf%2B3mlSlJexHNF25US2hBkCDq4imA9vqhAiB0wXv%2BVHvh1%2Fk%2FXJ2Gr%2F7y1NOMyO8F0JNia0UZDpsRtyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMjnJrgj1%2F3O4EB%2BRpKtwDNCUj5kfzBGezj5vHO%2BAzoClqo64Bm4XCREZ37iWDJq46lIef6Ajh2P7M2n%2B8bKbmV%2BXtE8iO0lY5T0azuxMoAcVuzDUPO8r4s7l%2BNk%2B%2F0pkf6m8Xaou2pMR6UbP19%2BfxUdx052Vnu6JbmyfX6tjuOrG4%2BGsT6pn%2Fh8KYAvhW9fLhAXsyGnepPQPe%2FjpjKeCnJ4eQpxyeXFUzLVAJuM%2BeWuJbaDdjdQ%2BsABZjGsr8xtI1Ws%2BlHjBOn8Q9q0nGloLyvvC3uu87llER2XP5GF%2FtqgQxN4ssPv7QZbUQ6Ym82rmFD8tD3xzK40Ln9DMxTV3vQW4S8913gwxeOuaaQYmapeyTfBJNdFiHFUVquMRzdnqTAXL4Xg%2FaY%2FXzes%2BC0usqoJSIz%2BV7GXAJu8gyahJZ428DUxS1iLSFJz3rXXFeRPLRo1VLY8SB1j0%2B17y3uhCrmnYAe9FVqW%2Fwtpl65uI1YIvUFJsvwntuUUzoLgqJebE%2Fok%2BceTwDwQKcAEeJVv7P%2BnRkz8Xu5HhLg1vOTozo8KkYUlQfcS35TMRdW9liKL4o8%2BX5QPOVt%2FF4Y%2B3FWmdbcOnJtoUsic8BuGfKz3%2B1fE6CmDrotiZpK7xST5DfVEzXvmXQd1rQSw%2FLJygw2tbHzAY6pgHV9N71BKkmK8DEbYWYfjcFAJKwSSSEoR3zVp2iskSi585B1h4NLUx5nP%2F8mKkYM4YnHKcR6ycF7%2BCeHZSx3Fthf5oU6KIdLsu2lV8Pq9AsKfiNEvY4iVKDLMdVC87YNxA11eOi1uOq2CcTJNuS6pvQhEDPD79Wg7zUnYv8ZMb6iA0sYX%2B7qoeFpZfQ8%2FzYUUbatp9z1cCGTGJRgR0ARv67XXCgZ2nR&X-Amz-Signature=82c924f778a1d94460b1a99f73db9cdb0d1b1b8ecfc2f88cf6aa86f77f814d85&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S6ZS2RQB%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161305Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCICVhCZ9GzQLFNhQAXctKi8ly7GLtrBrnaKEOuYQMIb0hAiASJfM3nmErt9WKciRbikN3P0sH3U244W4XcZ4pA4fpfyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM9MZB1XjUqEtk10u5KtwDuQ%2BVH%2BaUvkv5PGIS1vVqffT12Q4mZQg5cTKhqfM8aAyTwLf0o6BO4Z0VyyRoWsfyb3gB47FlVPIN2fFLy5UF6dYeLkjI3%2B9WEj3KDL0myAUeGvSJ3iT9dPK6h7X2T5UBe1s3holIQxSwPxksby0XuWJiaybnPCxMXloEh4IbJgk4r5B1IPQF2huuZfBVJ%2B84ZQsmcohFGLi1CuJXfI%2BM1vokrH%2BQzKn8vf64kDTI8tFlIH3i1UOFGuyZgeCjK6fiCtymRIvhng87Y34I3JL7jeVyE%2FFch5H2gYWgeTABFdVfiPMraJUWQQ9ke5LP1uk8W1J%2B6x6DpBe%2Ff5Z5rhG4xTEp2t33GSefKXsSngadstomKXvK0VERIeLcsyUTqQqcxDG4jT8KlmVqJjiOPUdx%2B1uLClk4ASmfOrQ5N%2Bu4T1MrC%2B6xZGFKprfQvD2D5p8N2pe846%2BNdcpXmXAJGDTtZ0nI0%2F2IG5LR7MoAy%2B9xtlH64JRs3A2JZwkjOW4h4%2FGEZf6IWGRRXbLT3MQFINhW9VYYNBumxwMOJ%2BnuNoy8g3e9%2BzTl7Ly6QmghCf4vav9t6stVfHSRuJR%2F9l4BTWlPINH3MfpnOh7gtRIl%2FplnRchKbnoa5vvQ2QP0CbAwi9bHzAY6pgGc%2BFbuJO1ivrIBJWq3qHal2us%2BWQ0Lbc7VY7juI3K9VONbR7s7%2BRIXWOMBZrCNcJB2HFO2MtZ7R7OM7ou0kcLBOLLDadlaIWE6F3ni6Gi5zofdU4DQT2tFIFbQNQ8WrC5HjZiEcj6Jpbh30BfVfY2FH%2B2kWto2tz00chfLLJp7vWEFcEih%2BBU1JzRMXZrXWr0%2BqtzsR4YC4NWSmlpI%2FdikJ6psp%2FQ3&X-Amz-Signature=920dd965a49d13714ba30eef1db0976470f68189d30145de4565b94b839e5714&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP6PYOVK%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIHiMYuQLIRDmY%2FhUVgairbGoAcMYfZzotUOkA%2F8UaXy3AiAwPhmKrDGTPfunxxn7siTDfCqBnqT54y5N9HigCZtAkyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM5VT6o6owoYl6TOVxKtwDSCSv%2FquZUUv8TuUTGCK93Pnk5I0U0OlAOWGK0OUKmMZCLmEKZeyo5yn60R9svW1HlJ7VtL%2Bz01l5ihyqtXw9EkF7hWB8XjEQ6uPz4iXr%2FKDWVCz%2BlyyrHhyjmfhkCeWG%2FcG2YqWG4bzw9oEekI%2FTpqKA0lbZK3z5g2O%2Bxw6xXboGU4BE0zAa6vDY4%2BtW2XNhZ8iNwHhy0JkYysKE8CN2lEpx6%2FFwQk7GzJ5fw9Gl7ISyZNwTDdD3PrhtGCzVkxG0s3fPTNPefA7C7tqhztYtN%2F%2FY55lNbMgtzSOb5eoHgLFpxdzdC4ryp9JegKh0w6I2o1sklJNgBSlRmjKWg%2BV6qoxql6hho9CNdDaq%2FUyonALSoFwBg9NYA4MTI22SlXMUvaf4eEyhAIwrCEpee4rZ986cIlJH8cgKFXew0QHvy%2FMXFx5vfziurzpk1Ra1fMTtrv82AjrPiFo9nn6Ja1IQvUCQ%2Ba2MsCKvUiSIf8F1GI83VG95lHw9uB0%2Bo2ZbbuM1CkSoiskTJRlmZ%2Fv19Kf0namZgct%2FM7AUe2y0ICGCoAycuoFqtJtESmffAhvs2B6d3olY5YzUHK%2BX2x6Ok5RQHJY6tDTIfo1JFcsXdhRJQhVw2eV0XFD2zBrB1Lww0tbHzAY6pgEEhQj1FodzBdejMh0BLXG%2Bc%2BGVOFrbJRJYYJJJ%2BawuAugRbl3lKtHFknT%2BsnQK5ZdeZ8oYMfqyISmwtcbHhZ5KO3bNJAgV4cDKyfRubeP1pNlH4PCp33ezXESQDnh%2B2RLiqaU2HEdzGQDgV3jJuVL7PZKI0%2FQXusGYqsXR9RIeYlRcThLcYeknTpStdFnCnluyfcoyWyO3gDeW65ImIrgp0F24eBHf&X-Amz-Signature=8733593bfa251c70d5759e370e22b9d95281b662607986943575bf8660015695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UP6PYOVK%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIHiMYuQLIRDmY%2FhUVgairbGoAcMYfZzotUOkA%2F8UaXy3AiAwPhmKrDGTPfunxxn7siTDfCqBnqT54y5N9HigCZtAkyr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIM5VT6o6owoYl6TOVxKtwDSCSv%2FquZUUv8TuUTGCK93Pnk5I0U0OlAOWGK0OUKmMZCLmEKZeyo5yn60R9svW1HlJ7VtL%2Bz01l5ihyqtXw9EkF7hWB8XjEQ6uPz4iXr%2FKDWVCz%2BlyyrHhyjmfhkCeWG%2FcG2YqWG4bzw9oEekI%2FTpqKA0lbZK3z5g2O%2Bxw6xXboGU4BE0zAa6vDY4%2BtW2XNhZ8iNwHhy0JkYysKE8CN2lEpx6%2FFwQk7GzJ5fw9Gl7ISyZNwTDdD3PrhtGCzVkxG0s3fPTNPefA7C7tqhztYtN%2F%2FY55lNbMgtzSOb5eoHgLFpxdzdC4ryp9JegKh0w6I2o1sklJNgBSlRmjKWg%2BV6qoxql6hho9CNdDaq%2FUyonALSoFwBg9NYA4MTI22SlXMUvaf4eEyhAIwrCEpee4rZ986cIlJH8cgKFXew0QHvy%2FMXFx5vfziurzpk1Ra1fMTtrv82AjrPiFo9nn6Ja1IQvUCQ%2Ba2MsCKvUiSIf8F1GI83VG95lHw9uB0%2Bo2ZbbuM1CkSoiskTJRlmZ%2Fv19Kf0namZgct%2FM7AUe2y0ICGCoAycuoFqtJtESmffAhvs2B6d3olY5YzUHK%2BX2x6Ok5RQHJY6tDTIfo1JFcsXdhRJQhVw2eV0XFD2zBrB1Lww0tbHzAY6pgEEhQj1FodzBdejMh0BLXG%2Bc%2BGVOFrbJRJYYJJJ%2BawuAugRbl3lKtHFknT%2BsnQK5ZdeZ8oYMfqyISmwtcbHhZ5KO3bNJAgV4cDKyfRubeP1pNlH4PCp33ezXESQDnh%2B2RLiqaU2HEdzGQDgV3jJuVL7PZKI0%2FQXusGYqsXR9RIeYlRcThLcYeknTpStdFnCnluyfcoyWyO3gDeW65ImIrgp0F24eBHf&X-Amz-Signature=8733593bfa251c70d5759e370e22b9d95281b662607986943575bf8660015695&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SPNTEBQU%2F20260215%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260215T161322Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQCmQvy4m5lqrGlxTYF0od4REHtOWAb48B6FeoXWPHtiJgIhANik06mj%2FFcWX1isEA1LJFcUZlzV6oB6K050qb4dxAJ%2FKv8DCCEQABoMNjM3NDIzMTgzODA1IgxK%2FJ7t9RSbhkvGS3Mq3AOIkWEwF9Vho0hLXmaN0K%2FALFVOWE0Khc1pdfVZ4AT%2BqLhFfXv%2Fm9W7eZHbCrGkEb4fOffFIWYavjh3EArS1cf6OK1MoCoK7YGeMa9mAMSQ%2B4KmNf6XZmB1WLT1%2BkiS81pEgBzLe8Q47m%2FQ9Y4qs7XNhfFvqo1HHVGFOwvbR6WE%2BQEZpxivrls%2Bucdw0MIkR%2BCkNnOETMhFdJfYIspT5Z41RLCKr86rnS0Ox6WRDx5Tk8OITAsblZBbuBLHiWJR4JiHFDDZpYnvB1UJAssZ3GZo7DQG%2FCc8vAZ2p5nT77QGZJeuhArN%2Bo4tGGQDI2rukGPF7odTrYUQX%2F2nUlvF%2BVXzvmbnZwPnJt%2FrcR%2Bt5QibuiycqwnXDdd96sdcRhmlYrLWgeg4dqoy0GBryY9HirTTPdQTJnul8CunLxhGk6vKG9GC1rCSrCd5xPR97ehqj7j%2BN5qBc6sK%2FCaMmpz%2F8vW%2FxWqQ2ilmnmuil4tFYqCMZ5R88MKYIH3D99oJ9GiWZM1BQBjwigNVDELuwf63T5HXyPAYKR0Y8Vl7%2BT6wOfVaTZVwEl7gYaZ%2F%2B4v6IMMtZKfnadDue9%2FUzFlY4%2BFsDJuviHMmxBNhNrwm3FCG0nOxpr8DFu0hamQ%2Bgrdh3zD01cfMBjqkAXUJf%2FBu6ya%2BDksTU62t2y147NHJRAodoY71ljYTGpLDcU28icwmdzzNAlkWSZmDHyehb5pBpHnaXZ4uKfd6XqHElDySpYn4waJE7s2EXTauNBzS03Utj2xaC9jgFsZHOIFBqTXxvQFNJdEOHZR7HeJ846CuJDsEIBU75JYPhXrOUpyXkxBiOTacXDhuMRiPjM4baxOPKs9hJNgWQakbvxWMYXeu&X-Amz-Signature=2b226cb2cafab3f0f4b04838b74d61cd753f3f3700baa7073a99f9d3b8b4a092&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

