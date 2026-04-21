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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGKJV6ZR%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIE0pxV%2F%2FiW9SOPoLhtXgLAwNhYRYklotw5Jc%2Bpme7bcTAiBFtpkqroe9R9ccmsKOAvmeHItUjX2IWEAYMNp77OzBfSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMdNxyRRiJ%2FP%2BzRej1KtwDKjchxolkYatGdMvtVvzvMkWEaFzd8rYpFG%2BtpuXutY1iOqZNBAMqlwM%2BSXTqEHvErEZpt2PRbenJnT88DlWpdKMSSbCFo9Fz0WWaNp%2FTNevDOvjAODRrRckGjRzlP9proLDSE%2BM4RIo4pufdz%2FoO0mXEILrDIG2esVNLxTiDG1OYJHBtkkhfxkBT8J65ZDU%2Bzbaw38UE9cE4zvsdBUK7cL2%2BgMjZBArmwhhXE8gClRNh3V0UJ06zgHQjaNmyQf3X1VjMxgiAUYzyQxmKY1I0xHvoPehBBins87upu4eSEDXMaAX9aLHJpFI4QvbsVG5CgQ6aQzH5kV8jM%2BNhxaZVL6z%2BX5biM2GOs%2F6E6X4zxHmG4%2FntGmrMmQa9%2FKfhGVj79aTTjVSslZieCoR78QWLLLq3uuq03q3uNgweiVpQACY3%2BSxhOKxaenfRSIGddIJMNVk00JSql9bvVUAFq7rQyBxVouMCAWtRxqwjOp4XMYj20vdQPQg0jIELtDFsOhExRY4tWMXnl24dgEzM9RdLZWZo1jhpArzEtwou%2Fow%2ByGD4mHvdvmd4v1s7X83tmM0QuCWUsz3uWJQh82WSjeaukjP3af2TZJF1Gl%2BOiTT3Qr1tQU7mG0V37%2FQ2fxgwnrOfzwY6pgE40yiCvUzC7zMZ95tIJsq0JPTd6T3HKmiR9x%2BMp7po%2FHDxVwZfzbcBaOYMYV1OAvJQOYzn0u9j0WpQeLPWbPZRitnrjdVo%2FZuQkejlZI%2FPn2S0gT918jDr10l6HFAzZF4KAtyUy2Y77AGEcR0XRIxa3wMy8gujWkdpdBgqQ%2BQkJvJaycawf0Ta0SxucHKVrrPzxX9KhTRxHi9UpGqduXKAr8xBOrKB&X-Amz-Signature=2adac86a10645a6e2e83f9c9a26a7f97bdacabbc72587bb846c0baa458a062a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YGKJV6ZR%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJGMEQCIE0pxV%2F%2FiW9SOPoLhtXgLAwNhYRYklotw5Jc%2Bpme7bcTAiBFtpkqroe9R9ccmsKOAvmeHItUjX2IWEAYMNp77OzBfSr%2FAwg9EAAaDDYzNzQyMzE4MzgwNSIMdNxyRRiJ%2FP%2BzRej1KtwDKjchxolkYatGdMvtVvzvMkWEaFzd8rYpFG%2BtpuXutY1iOqZNBAMqlwM%2BSXTqEHvErEZpt2PRbenJnT88DlWpdKMSSbCFo9Fz0WWaNp%2FTNevDOvjAODRrRckGjRzlP9proLDSE%2BM4RIo4pufdz%2FoO0mXEILrDIG2esVNLxTiDG1OYJHBtkkhfxkBT8J65ZDU%2Bzbaw38UE9cE4zvsdBUK7cL2%2BgMjZBArmwhhXE8gClRNh3V0UJ06zgHQjaNmyQf3X1VjMxgiAUYzyQxmKY1I0xHvoPehBBins87upu4eSEDXMaAX9aLHJpFI4QvbsVG5CgQ6aQzH5kV8jM%2BNhxaZVL6z%2BX5biM2GOs%2F6E6X4zxHmG4%2FntGmrMmQa9%2FKfhGVj79aTTjVSslZieCoR78QWLLLq3uuq03q3uNgweiVpQACY3%2BSxhOKxaenfRSIGddIJMNVk00JSql9bvVUAFq7rQyBxVouMCAWtRxqwjOp4XMYj20vdQPQg0jIELtDFsOhExRY4tWMXnl24dgEzM9RdLZWZo1jhpArzEtwou%2Fow%2ByGD4mHvdvmd4v1s7X83tmM0QuCWUsz3uWJQh82WSjeaukjP3af2TZJF1Gl%2BOiTT3Qr1tQU7mG0V37%2FQ2fxgwnrOfzwY6pgE40yiCvUzC7zMZ95tIJsq0JPTd6T3HKmiR9x%2BMp7po%2FHDxVwZfzbcBaOYMYV1OAvJQOYzn0u9j0WpQeLPWbPZRitnrjdVo%2FZuQkejlZI%2FPn2S0gT918jDr10l6HFAzZF4KAtyUy2Y77AGEcR0XRIxa3wMy8gujWkdpdBgqQ%2BQkJvJaycawf0Ta0SxucHKVrrPzxX9KhTRxHi9UpGqduXKAr8xBOrKB&X-Amz-Signature=2adac86a10645a6e2e83f9c9a26a7f97bdacabbc72587bb846c0baa458a062a6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZPIX46K%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222657Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIGNWCri8WtNdnHO6h0bQc0FdnIk%2F1rNv6ZyMFdY8vXNVAiEA8KNnkaW24PIQIg5Hy1JRFpPRJq4eF3HgpxtT8EbRDXYq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDK98%2FwlPb3f2Dcq4DircAwQMZh81XRJN%2BNdUph05BTAH9o%2Fl8NnbH%2FJzEfF03mgC5zla2%2BPTDtM1BIoCe%2Fy%2FoSTKpJHtjdjJzZDNHeJ0R%2BscklFJDuaNs%2BFSa6Z3AMHW%2F7Ip5o0%2BHHmaBS9SaqV8mVyfjse1mlPp76rIs26wwBCdTr267ylSb79YUaZVRRcHo5y7LGmXH5RfM62sorgH7fi52KmkJy3SixdH7bPvgbJYcG8dKwZREtdXQrkhage%2Bjp1eUss0RJ80ozvQx0%2BhiP5tEFEckdTiiNefxZO4RZ%2BUUppn8RE5D5ZrFiAUrd93npNFYon5jSEJfpea6zplXpHPXFgdVtb53RaO%2BA04aRiJeieVQM9c%2BRxbjS%2B9jsFd0mdi1fQlDlxDVGJUzI5WNUOSlu7xqegEjdcFaSlVYJp7%2FvNEt5NsSRZfMkh6R%2FUcHcaQpDbQGM2ykxTuiiwcJZ2ZXAU0udc6E2OT5NvcQy5Lycissuur9Pn0Ir23VTGwlVQmmbN7DSf4jiP%2BTTC8RnyXEwfQJ6%2FnjuHsuRXvHwUOgoQ9XQUSKYXEJEvpZjSjnZCrKiNasfl7UXOs1QXvhAc1v%2FHk85G2Rht2YYbsCAAGsU29mI8rR4lZkL2L%2Fo%2B4UYOkZB3P6NonkjwiMP6yn88GOqUBRPdJDXm%2Ba%2FUPESGnXsGXm8omA%2BGGbxFgiq0et%2FmP7QB9mQHN%2FiMfLDdJXsr4CmhVyqwhaIolePXt8aHC8AV4moNqvfpi3h%2B6RrZTo6aw538EimwjY9kDNGwF6vPurtq9rnUC37k%2FsdMYJysq5VDj7B38nSq%2F%2FF1wFYiWCIhmnJfEBrVSadlus5s7XSo7qx%2BzrBGj6j3eK4m1SHq1%2BUbclXy%2FDaZ0&X-Amz-Signature=4bc554752e6fef2bf157d50afcf132ea8fc6fdc53272bb834234bb222b2b44d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7GAQB22%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDrBhn1IEHt5m1TGoDh6odTH8I%2BSRTKnXtx11moHtiSdQIgFKZrEzM4BLay2OcxxTL3fezHtImPVrl5sHVOwhL53AMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDJBF22I%2BwalsmNN7wircA1zezPfIjTUUIZZHyjlKkFFSsOv7E%2Fi8YSm1dqIqhEhmZbsXmD5C7eaQKqOrPvUkqrPg3hJtLqarS1MqnMVAB5PPjV3XYh36qpeIaSW40oO%2FqwyIoM1YDhKKXsPoN5pP675EJCuTn7pAP9SSLI29oLFePuno5a3VlcJuYCRFjP%2FNylA3M6oT%2By13InRVBYQhtTulwmjQp73uYgvUUSO68htSkBp5wkuOEZXuv5On%2B3C%2B87pQlFpOMjr05mF8J21vhFuFg%2BdruI912zUcKl76oOnW6nzCdrK0EwQMaRe7IylH4%2FoE%2Bu60DiJuXLo2KSnp%2Bjm4jAKSThC9PRni6beHVYavFAgcSUOhvYRAnLtd%2Bp9MB6N%2FbDJMa44b0mLfP40H6t6oQmjmBxmWoTptfEx4ZXgMMYp39x0XxsqtpxlYon%2BryAQN8C4LV997OMAHkFmbUo4uKily5mbpDTIJBPOKlhnmE5tq4yB6bTuw3BVa28qFlS9R2s8mONU9nG%2FpGMHoEyTkqPuZMGxcAaxjJjX%2BF5JhjAdW7rXkpq0JXQn4iUwRHJA0V0VTCvVysJNNwZ7IVuFbz9jsjjSt2mBvpG0SrU4ahS0RiNYlYgM2g1Q5oT8PePNvvURmNmIHPOByMJngn88GOqUBMODwwTqDXHN5GmAjXjwNkIYPhd%2B3pHXP29G0rzcU55GWUwxn87n0WS82Tx%2BfZdmr6RJb5%2BLaGxJQJPocCBrO2ji7M1AaJVyzHZIGuU2BJbqt3Y2M%2FlKfgri5AbpI5DCfWcOxtWMclQ0jOD5pC%2FGEXTCfmowlKLFWO5FE%2BmTNxzynMPuc3aaRsf7vE75eMSFis5Fk5A2llsCSmieAmUJgV8PwVebO&X-Amz-Signature=f84043258b3dfd6d63611b7113c605d606f5113dba25b8c81e49e37f3f6159c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S7GAQB22%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDrBhn1IEHt5m1TGoDh6odTH8I%2BSRTKnXtx11moHtiSdQIgFKZrEzM4BLay2OcxxTL3fezHtImPVrl5sHVOwhL53AMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDJBF22I%2BwalsmNN7wircA1zezPfIjTUUIZZHyjlKkFFSsOv7E%2Fi8YSm1dqIqhEhmZbsXmD5C7eaQKqOrPvUkqrPg3hJtLqarS1MqnMVAB5PPjV3XYh36qpeIaSW40oO%2FqwyIoM1YDhKKXsPoN5pP675EJCuTn7pAP9SSLI29oLFePuno5a3VlcJuYCRFjP%2FNylA3M6oT%2By13InRVBYQhtTulwmjQp73uYgvUUSO68htSkBp5wkuOEZXuv5On%2B3C%2B87pQlFpOMjr05mF8J21vhFuFg%2BdruI912zUcKl76oOnW6nzCdrK0EwQMaRe7IylH4%2FoE%2Bu60DiJuXLo2KSnp%2Bjm4jAKSThC9PRni6beHVYavFAgcSUOhvYRAnLtd%2Bp9MB6N%2FbDJMa44b0mLfP40H6t6oQmjmBxmWoTptfEx4ZXgMMYp39x0XxsqtpxlYon%2BryAQN8C4LV997OMAHkFmbUo4uKily5mbpDTIJBPOKlhnmE5tq4yB6bTuw3BVa28qFlS9R2s8mONU9nG%2FpGMHoEyTkqPuZMGxcAaxjJjX%2BF5JhjAdW7rXkpq0JXQn4iUwRHJA0V0VTCvVysJNNwZ7IVuFbz9jsjjSt2mBvpG0SrU4ahS0RiNYlYgM2g1Q5oT8PePNvvURmNmIHPOByMJngn88GOqUBMODwwTqDXHN5GmAjXjwNkIYPhd%2B3pHXP29G0rzcU55GWUwxn87n0WS82Tx%2BfZdmr6RJb5%2BLaGxJQJPocCBrO2ji7M1AaJVyzHZIGuU2BJbqt3Y2M%2FlKfgri5AbpI5DCfWcOxtWMclQ0jOD5pC%2FGEXTCfmowlKLFWO5FE%2BmTNxzynMPuc3aaRsf7vE75eMSFis5Fk5A2llsCSmieAmUJgV8PwVebO&X-Amz-Signature=f87f15345eb9a827aa20d38fcbd88963adb0aafb2725e08cdb30f09ca03612f9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJRZB5VV%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDK0JZg42m6nJpTmiB5U%2B0P6x%2FtqyI7U19kkYBMwkflkQIhAMlfiRoG5tMDoyP49LOHvlqJ%2Fu5zSqiJpUWHR3Oq82NMKv8DCD0QABoMNjM3NDIzMTgzODA1IgwYjLBraG148zD5nBsq3AMoDScUc9u6s6hMxEhrDMPDYPmMUBNDputNg6Sb5DWVCcAQ2Top8Jr1y8YYG9FoigYS8l5Y5jLeUAKEmJHnWzG6mte7bB3sU38VzGGd3KCEpfNRopSFt67gNtyzRDuKw5NUU9WhXBUNKygLUSSizG5%2Fvggr09ml9JFHMRpu3rUdSSLHZN8uoG0m%2FxWHj4wTcdHcqpmlE6KDAPf4mfMK6Cx0odA92y6cdufv84RJoXdn2cspSNFZiFlcaHDQKra0wepcxtWQasuiFXqfeawL8PGiwXQnTNFN6EL0VHT6K%2B3uJfp0yEe71SphN%2Bx6OdYEqPfEsOFzo85xAB0ZsPAsQiizgim5cFedO2HVOn0iAPmKkDbXWsuKx3R%2BHpyc62M7YXyFCj2%2Ff9VzvbW%2B0XGEafM79nznGwWcw1s24YPZs9qwtFsiQkTOJj4cikWTdoywPJf5zyHbg%2Bv%2F3vXnkaxqvK%2BEnXyhTsg%2BqvcKq4COses13%2FrdF9kIv3TgWZgWkhGEe8iaLYnGJn2W4BD88Dfce1MXCjE93K1bVfTHn5wtwxFa8hXrXEb2ZEmuoa7NQoy9S%2Fyd0mXtsGW%2BEcQeLDrN9QR0de2YALzIO4eocjoqWvOfOazoB0%2FPri9cWY6x9DD8sp%2FPBjqkAZSZJwAaTinIgbwXGNfCriTex4FJfw5%2FlRMY1tKelxezKKj4kCsqcTe47XaKa%2BKs%2BnVMQvwrRbcU2KHLrgWnGYanz7bGpuFm%2Fw9BqHeaxj3c%2B1Z%2BMUJXtxiq9mxZXLW1bKCvIsqa%2FtAlwrF6HXFvL9FQH%2FA05r7QWMe9f0h84%2Fgx6482Fl9YLbNJAMnVLWqw3fyOVrLlxk%2Bn9s9QWdgN18C3kJIy&X-Amz-Signature=f54e7f81fd95262759c30e7ec13c12893ed96a7b657109a7e1de80664fdae022&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYTBAG56%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222658Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJIMEYCIQDx7En4Y76xv0%2FHvG74IWPOCHaZtruY86tAsK7xDVG12QIhAPxqZkbCwB36%2F5syKHifTsu0OzH5u1rq6kUL9NEl%2FT4YKv8DCD0QABoMNjM3NDIzMTgzODA1Igz1H1EL8SH%2FYk15bQkq3AOfZTTNdC4x1xPxT%2BeOsQjDZGgtspwCkT8vYGD3o3M9SWWS%2FazEpSD8g3YUGSPge15%2FZJH5fIvYicebujsMrdIZg%2BQwG%2BN8eNFYOAII0NS5KlZu5Mwk8S6k%2F4kDhAeB2sLP8%2F5KZWv3LRPPZmTey0fMmpQBfo1vqe%2FNxF%2FU56EzD272c05gZUKurT4uaCw39AXVRtAP6ViQblrequb1Wud0ivRnF4bqRPGnX0RLdHQngCTg5S8hII6WHp69I7POxCngDDOPfkjAn18D1evLBfUySzfoKleV9eYVQam3HGbT6vjIeZ95HhIOJuuUskPnrcn1HJIQ%2Fb31uF3FSMi1RQOhb8%2FHQeEujo9RBlQNkekhGghCOJ05smK826lGsVR4Nzg5AUN0O9Cwk%2BGsOS9I0w%2B6ZqxnmShj6CHjXCk5VToktJOH5n8CI1W%2Bzb2CpPYl3YlWYrIP15%2F0HyqFpJzNYAtokfC8UG%2BXbq9KZ%2BZtewKSUwxY7ln1DyYI2ioS9qPDBsoSriUxraXWu2uyjmU7EampDbMxF0Myc6izXrvtldN%2BjDDO3LfHyytKZZABaHxw8dZuq%2F3pVNNcDz1i0R4jttsG7a6kvEblVglx40EN7yOeUiuNzH3asCrPm%2Bxe3zDCs5%2FPBjqkARYKNo9rKxNkM1M5cwqLcLWOo4yVbvMT%2B%2FeleG0jv7G09T4Yw1jUGBxsLNTVxcP463k%2F6TewhPMcDeSZMoLqfVwIJftKyfFUaUVcrcD6XI0QnTFwqbd2hwBDKY22pv4gQW0Ge5XfEpw02cIiB6%2Bp9kRzS39K0S5bC73IpRZ0SXFxuDmu5nG1i9%2FNsRSSgbbtpx%2BI71w3KJzDkikyk6NqeRKXfseC&X-Amz-Signature=117dcbadac12d485dd8068ab87719e1b1852eefd35902feb581bdb9199b3e269&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QRFR2ST6%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222659Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCz454t27nj8xPQAgR%2B%2BkdVzgCFLcxzLgpaeY9Eh9F0swIgW0MwgUtqDOTvafbu1F9NcvDcIXULgOLlNHyBj9VMBRsq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDOVoTgU%2BbIVdU%2Bi%2BhSrcA8cP1lQf5YOqNrBrc8QVYcpByWI%2BjyIQmZKugWSuSbnW%2FKpgFFmVe3hmHHk7cFz1W4PJamV3h5McVqb6UoeFIJ0mX8pViU25%2FaDPkG4l4zVl3CitMziGizi6h93k%2B4oJgWhBmS6YNb6O87pJRSTYLuF2Bs0ZT4wazYyeoovQOzxRkUvW5rE2Xk7%2BYwtC5Mq35vyW1mNwaqCOZd1P8ev%2F3wqqP%2B7dGwl%2FhVlbu0cWBhaxgFvN8%2F%2F1fwJL1InnkhrLt%2B24iH44aQ2Tyvw2a5V4bR%2FjMNXs4IP7UMgxjN3kQVkSrEuFf%2Fk7KKeL%2Fs3GctLi3KoLeyyMwVhBu94T4l6tzXnC8dYaFS6cBq5u3W2qknIQWIEhBBbf7Ga%2F8ftQtw7s34jLZW9fa7DLAxDOlJRt3bt3UHEscrJj17B4sYgpEqO5BFUBGqhAY2QokSk5mBW%2FT87%2Bs0hyFL2ScBf0ndql56puceHxSNbIV8EdwjsVnazNpSro3nBXrrmn0k4XTOnlKuXHDUmvQhNQOZnqcBCc3kqrSd96vF%2B1%2BjdxQjDGXxeoVOKOcUYxVY4TFIG2aBYa4X%2B9X14OZ%2FaDR0Axizmh%2BKXC241pLxoQdTrkC0twEeZ10v8y48MtJJkSK8IsMOmzn88GOqUBEf5yvUM5tSsxhp3y%2B8D9TKOBZc%2FQMcQjO1R2AtRcAl76L%2BuPuACvLtzPCX%2FFbng4a97hnJR%2Bay50fXpP2jSGBR9EmIjrZIfzJ%2BIEDHAj63UHXfnhsdDOZxaMiK8QEVjz1gjc6mfy7Pci2jpmYABwQSQ99z0RvKYrKdIObuj2Rdv0x0UwO65LEGSC6mQscMGXvKhUbpwVIIS%2FpJ8Gy4tKl4WsH%2F6u&X-Amz-Signature=2df1fdd0a994e431021385e49e6f943b994afe323a16a64c598c7849f60c464d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFNJP6UJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCBZBsiM0hniDtSspen1%2FmhAgg3%2Fxkug2cnSbJE%2B7AGEgIgLWPR6pdl7LEAENci4e0Gqsw0avi7iVJW1aT9BY10ZUUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNCD5DWzfc8P8q8YByrcA98r92S7J9rUoyu9r7lbNKy5radR5miUJUYX177cfVeDzzW55qAc5kCL8zSdjXKO%2FWaviqZdcDLbxIj7beW653q6rT7GRi%2F31Ddq1nZdouSOU5XQX%2BJjiVIAe3qwHT4o0umwCdgmM5WX16TAOz2XKuX68724USrCZ5lFDlgpp3jGeAdTihV%2F9w6wFtVToG9cD5zAaUheuc4sdfciTUo5cShwRxpNxjgwefpjNpOR1TxiTAAC%2FCcWSeLf4oTPC%2F%2FX3hKjL4tuTqrh16qX47qyqsP6ZXXVXu4N2wmVBagcfHx271ywP1c4V8UCoSc8zFhveS9Zu1dRXV4D6chbB28bD9aZjS%2BYEXvUeDZfX5QPQoDnXV3rt9rn%2FN%2BeXqvyPbMBoZ8CU5Atdv2Cw7HPEq2nRhmRGtjHbqu7MScKMQYUAcK9Znj5D2u3UpSzxMGS6ketPnU5t0aHlX4vF51Yk6kMhxFCLjfswqWx83W5%2B0UUN%2BzYxcRYv8S7dJju%2BIP0Q4T%2B1c1oMaHaPDGG7B8upBvZ2ESRCzuve4GJm%2FWH78KdLiddBlE8a7kkPuXIjVRoNY7AM9ICVNQGu79EA5RLpBepR2zuNNGWpovEsGhIowSj1aSxWrhTaGzFDFzWwA%2BGMPi0n88GOqUBwZfuRxSkLdwINBJ2rE%2FFDTfnYHl2vrgxVaigsOOrp%2FieY0phmGCo5kkgcVRNgOEsOfuuRpay6GfOg1IxTH5HRmR2rJ3cst%2Fi%2F13PhMxxj1EQQQbBS0lbN7aeH3pDtK57ujb3DNpmphsNnCmEzHbvr9%2BB4GZP1TLJajBDsBdPgdfmcZOnQVyWOiyQ7iNavzZ1urFA%2BC%2B9Z94HX7lRGBPyLwN1YP8F&X-Amz-Signature=cc46c3e9d77aaf802b4170f0f62cbbbed1b18640a9a207d0ab7887161e567ca6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SFNJP6UJ%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222700Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIQCBZBsiM0hniDtSspen1%2FmhAgg3%2Fxkug2cnSbJE%2B7AGEgIgLWPR6pdl7LEAENci4e0Gqsw0avi7iVJW1aT9BY10ZUUq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDNCD5DWzfc8P8q8YByrcA98r92S7J9rUoyu9r7lbNKy5radR5miUJUYX177cfVeDzzW55qAc5kCL8zSdjXKO%2FWaviqZdcDLbxIj7beW653q6rT7GRi%2F31Ddq1nZdouSOU5XQX%2BJjiVIAe3qwHT4o0umwCdgmM5WX16TAOz2XKuX68724USrCZ5lFDlgpp3jGeAdTihV%2F9w6wFtVToG9cD5zAaUheuc4sdfciTUo5cShwRxpNxjgwefpjNpOR1TxiTAAC%2FCcWSeLf4oTPC%2F%2FX3hKjL4tuTqrh16qX47qyqsP6ZXXVXu4N2wmVBagcfHx271ywP1c4V8UCoSc8zFhveS9Zu1dRXV4D6chbB28bD9aZjS%2BYEXvUeDZfX5QPQoDnXV3rt9rn%2FN%2BeXqvyPbMBoZ8CU5Atdv2Cw7HPEq2nRhmRGtjHbqu7MScKMQYUAcK9Znj5D2u3UpSzxMGS6ketPnU5t0aHlX4vF51Yk6kMhxFCLjfswqWx83W5%2B0UUN%2BzYxcRYv8S7dJju%2BIP0Q4T%2B1c1oMaHaPDGG7B8upBvZ2ESRCzuve4GJm%2FWH78KdLiddBlE8a7kkPuXIjVRoNY7AM9ICVNQGu79EA5RLpBepR2zuNNGWpovEsGhIowSj1aSxWrhTaGzFDFzWwA%2BGMPi0n88GOqUBwZfuRxSkLdwINBJ2rE%2FFDTfnYHl2vrgxVaigsOOrp%2FieY0phmGCo5kkgcVRNgOEsOfuuRpay6GfOg1IxTH5HRmR2rJ3cst%2Fi%2F13PhMxxj1EQQQbBS0lbN7aeH3pDtK57ujb3DNpmphsNnCmEzHbvr9%2BB4GZP1TLJajBDsBdPgdfmcZOnQVyWOiyQ7iNavzZ1urFA%2BC%2B9Z94HX7lRGBPyLwN1YP8F&X-Amz-Signature=db7005a77e16070513f1692fad64c7e78f9d8146f763f452aaeeeeadcca5e46e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667B4IECIB%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIG9SCJH3JgVkLKmYW3I%2FE23%2Fw8dRWkVY9VtKOfzrS4R%2BAiAG0rYZoeU%2BRZeByrE%2FW%2FofNZT%2Byc%2FRm2w65Bmp8BVLdSr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMjGoqf1Ex6iIgsN2qKtwD6yRnJz6iRcbjfP2lVveFuQYrImsvon8hSWKr4uUEE%2BS5QzBMZbrY7FAQ3%2BX8u6t5V5Q6IyIXkooeUkujOCgB2UGzFRQZD4IJml8e0nGeBMOAMgod4jrCJ5pXJvV3nFHaAGF%2B7xaaWKw%2BMiKBEBIkS8xcEtoGwBZHCqXudzawK9WKF5apG2bntnGqUYvZKi4F9g6Rr%2F2XPdKgir7UAQJFuaJlF9qa%2B3Htf9CMh5tofOGWwID1%2BMMbUlYeaDpb3aW3mVnqDJ5RPR34NTxkosj0Sgz0J6XHK8iHDM77OA5cN3Z88%2B9ZU5YC1IqdMDaoCkpSUUEwtm26gOLoivxgLlLIfSxnFdz94v243H%2BdVCMRltMqzLCMpcyr%2BCbt87Mq1FvcjaNrarzu5d1K%2BW4F0dC%2FEq1zwXSry5Pt%2FJF%2BPRWI%2B91AcQ13ILrepk3NX42cKGPxst8Pg%2BSeZZ5peYXhshOaZxBeTO%2F5CwbuybnelckOyx4wz6vgrARpbkYednV4bkivjK9n3%2BrjmZ4Wk9wNpWVixZHG6W6vvQbJTziEo1GTmLTn9b8FpKpihIz6gAwrIp%2FoPY%2F3hEEOtJeSx32A0aSJxz7zFE4CmRfRef0mU6ZXB3d7lIeW9hznS%2BJrgPMw%2FNyfzwY6pgGzCNYjR00JlJhq%2Bu9io%2BkrBA4LV18qdn9ZYvOd72TnUxu4ne3sCNn7fk4qaV0fyiC0iOYWl93SUdceK%2F5%2B%2BCD%2F9t0FdcLqpABAnBF2OeOo7eEQpJoIEASNQlPobtrVLtI327dARItkZKMKoP3%2F9zOPy%2F0nVgUUOl9GOXMLo%2Fi49MvTSo2yvhSo%2Fr3bE7D7h00GXAc0aYe%2B8QtW167SJrKqUKRyCpn9&X-Amz-Signature=977ecdba1bbb3db8566ec652fe092d65a50d4c4eda22f0221c7a16f79432eef7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMYGHXEE%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBK5MzbJBp43kYYxf6f0q2vnJwj7mjPudTIRkFLsKxv0AiEA8aHOnneCsHKkY5Uj22TJLIdJp%2BhxafsI%2BCprdxVEwDMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDA8AmWJNLvWQ1hrlASrcA0hMUFxlG6SRArD5rS3wzmuKjjpZNnjPYZ1AkaN80xvOVGBevg3F6IkZmqj7eYbpnfQMqN6wqnKSuBV%2FfXNBVM4B100xPlZ3nspQbK6za%2BVH7rtttdMZS6Qoj7i0Wskr9laSWpWsm7D9aSnWB0UrHZ6SMWKkMvYs5xrciZgl4M2B6oQNyJwZrWd3rM3eO5F8jsIHy1CnksGNUVduPtkDZxczxj5o3J11QAe%2BMM8ytUSqQdqaWAX%2FEMrSsF2vfI0uBIlVbV7e78rbgoMw33Yurkepm8mImoW8KBtxCMAGfm2zN97SA1AdEmD%2B%2BsX8R2rs4Hjl3nrqQITsXh5ZoNbAWrC%2BikZSvpyB0ur0FI%2BAoai%2ByytzsCA0mU2RhsqgcVv9AGv6ff94UingrabV9Vyc9KrLA66W8wGCqOkY4DNyc0QVE4qJF2CtJvsTMoxq%2BpDHa4ILQKKBj3mKHGmEirsM1kGt0%2F7ODVv1TS4kYFjF%2BVBA6frg4GllSKZqx858o3FUZs6jobb1jJKGwaQw7zHmG7NHcj9V57OzT6fG0GpAKNCYSkZ8qlfBfiK0VgrinMG3oPqBbtFj7zsdw%2BnDe1FFIiA57zfDwoWdh1ktl9eBJWspvIqQ9iMycsgVpYp5MN6zn88GOqUBASzdIBfhPzOqrB0%2F3SHDaTOOsqbf5qAbgnbGxHub15Y9IWLFxgj3MZWIytPFBkWOGQZHcFWiGlTFdFJ8bpT37bl%2FRXKPu%2BbM41IeFm9eCvmG62QGOUfdVvrhaxGV6gRCKY7fOeWlMdqSrfkR049jT516Nz%2FoXxlVT1Sv9ZOvkcIxicr4mVjDlFDBXAFVwSNyrzsH%2FNQLPDa35Dq52PCrD9ZJjxn6&X-Amz-Signature=29c6412fb8242bac02ec36ddd4b57cbea024fffee79aabed0fd1c02687e8075e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VMYGHXEE%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHQaCXVzLXdlc3QtMiJHMEUCIBK5MzbJBp43kYYxf6f0q2vnJwj7mjPudTIRkFLsKxv0AiEA8aHOnneCsHKkY5Uj22TJLIdJp%2BhxafsI%2BCprdxVEwDMq%2FwMIPRAAGgw2Mzc0MjMxODM4MDUiDA8AmWJNLvWQ1hrlASrcA0hMUFxlG6SRArD5rS3wzmuKjjpZNnjPYZ1AkaN80xvOVGBevg3F6IkZmqj7eYbpnfQMqN6wqnKSuBV%2FfXNBVM4B100xPlZ3nspQbK6za%2BVH7rtttdMZS6Qoj7i0Wskr9laSWpWsm7D9aSnWB0UrHZ6SMWKkMvYs5xrciZgl4M2B6oQNyJwZrWd3rM3eO5F8jsIHy1CnksGNUVduPtkDZxczxj5o3J11QAe%2BMM8ytUSqQdqaWAX%2FEMrSsF2vfI0uBIlVbV7e78rbgoMw33Yurkepm8mImoW8KBtxCMAGfm2zN97SA1AdEmD%2B%2BsX8R2rs4Hjl3nrqQITsXh5ZoNbAWrC%2BikZSvpyB0ur0FI%2BAoai%2ByytzsCA0mU2RhsqgcVv9AGv6ff94UingrabV9Vyc9KrLA66W8wGCqOkY4DNyc0QVE4qJF2CtJvsTMoxq%2BpDHa4ILQKKBj3mKHGmEirsM1kGt0%2F7ODVv1TS4kYFjF%2BVBA6frg4GllSKZqx858o3FUZs6jobb1jJKGwaQw7zHmG7NHcj9V57OzT6fG0GpAKNCYSkZ8qlfBfiK0VgrinMG3oPqBbtFj7zsdw%2BnDe1FFIiA57zfDwoWdh1ktl9eBJWspvIqQ9iMycsgVpYp5MN6zn88GOqUBASzdIBfhPzOqrB0%2F3SHDaTOOsqbf5qAbgnbGxHub15Y9IWLFxgj3MZWIytPFBkWOGQZHcFWiGlTFdFJ8bpT37bl%2FRXKPu%2BbM41IeFm9eCvmG62QGOUfdVvrhaxGV6gRCKY7fOeWlMdqSrfkR049jT516Nz%2FoXxlVT1Sv9ZOvkcIxicr4mVjDlFDBXAFVwSNyrzsH%2FNQLPDa35Dq52PCrD9ZJjxn6&X-Amz-Signature=29c6412fb8242bac02ec36ddd4b57cbea024fffee79aabed0fd1c02687e8075e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCPDSAO5%2F20260421%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260421T222702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIH0gRICqv9PJog6YVBdUueU0e2KGINd%2BLOnDDIux0umfAiEA1apynnFe90sr0vFZBgV3j%2BH7Z%2FBMW6da86MzztaJra0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDENkuLEMKtxn1fjFlSrcAxMw7ycXmt707%2B7JShg%2B%2BrN%2B7DB%2FZX%2Ftj140dxfO8vfKngr47SgdO%2BnDVd%2F%2BgHH0EnPIs%2F2kgSAQmImZnNg%2FWt9h1wMsilPhmJY01motIPhSPG8j4DaWyViiq%2BFGydJaTb9%2BlnZuC895S60E7tyJqsazD8QHXUtNBcsE0jjp8MsSD6XDmxjo1O87%2BarH%2FjGDgn%2F6xgIA5o3AGH%2FXBk4M3BYEO29bTuHHo758qliieEbZT7j38oEGGT3Hu8X%2FYc16mZTdjGYrpYUUacyjJ62YLqC9A8aGmzAnQ6smOCYafeGbx73F5Zn7SeRidi%2FuZN5CdFUB0fXbeBR17Qbm2XV66E6ShnYbRcUdeGZuZ80HU97YdNDOS6kqaR%2F5iQJbmp5ptVjPVRqAj0chYgxLSha0sSlaoIpYzXXLub1QHdalMeGA%2FAbQE9HXYKQ9Btx0Arko%2BoTg6tRTV%2Fdkjf9CnM7XqcKv9HWb4WI7EC2sy1cybg3j%2Bs2JgwAPR4bZ6BN5Y%2FVZm3Z2zDel8A0XfiOog2OphYXkoHWNpufoLgVkeBMKkWdMkD5ghLkSWi2TCnTxDItOLAeHdzOtyJsHtL%2BOEAFaxkvmLBVOzDVvYkXMH3X%2FaJeRqMxKdshtaKH67CrGMMjIn88GOqUB8e6%2BSCtn77QCqI5YnkTVFa6oanjbOHfi22Qcs2sca0g01O4egnbpJjRhyk%2BU1BAU7OOdKhJqMx5SrqHeYPbZcCEn16QcTQFJGNnS%2FANfyJMc0eCuAeCYS%2BrOU05Kwkglv279cqp%2B9vlaFIkFDlF0dHyQOpIn0ct1qW%2BcUFHbgk684FPb2UYPbu25K%2Fi8p5%2B6gXAA4ayk2f3WHyHSvhJtFC4UzOwb&X-Amz-Signature=377f91461204f09b553a3cabd5d302714ead7ad1aa2827ccf0850529fcfa5bfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

