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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6KRBKVI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbSBfvW9M7n8UAyrgRIlRx1AcKigkujZ0kxmn%2FhpxqpwIgXwjwfF2f8k4h224pyn6Y5SUMRzBz3pVXNrIQPsjthFwqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKKcFMytmIcCCS6joyrcA2f9IPbaTS9goK1pDlp609BRDUhLRhgvDOJScZ8rp8VvVr2fMK9ttUf6kW0NVHisdbycNp%2BqzSeQmhF8HZvIV9%2F0xJZKTg63shfH2l6Hjsky1%2BLI%2BfQxmYMuiMth6wt68YtPHoCk9MKymppRJYpZL9ojvrzbF3d6FfPh7gnsyuKSm27V9hx3zNY%2Fqay8eobgv%2F1DiCfNQboWPHnQOnd1OM0tpiN4oUip81zna8oVvdRpklvGWfmEcFRG9Q8oDnIHbUFlNx5jzL0zYeT2JTfltKs6pHpruN%2BDU8Q5vfgZhjalyyFRdJSRc2rYRyuJVDxaI1ZattYml%2BNSHudfQWYgynP8IQ%2BKJdkOMLUZBzA015HlRo9cuvn0R2YIQo7%2FUN7HzrZn%2B6fi%2Fi8JwcSKIe%2FdR7%2BszQ5l%2BLMk6mv%2Fv%2FiI2BDKxIZw03bOoU4M5Y0qcRgjR%2Bs%2F1NZk77m%2BM7c%2F3Gz0711oN%2BRr2awdBHfQxmwxw3pS2pq5UbJSBGDFHe1rJ00WGIe9nTNtK2t3VpMM%2BJmR9Bxlsx3Zjs2UJ3wdD%2F4E8%2Fa0X0IqQTXWmoS94y%2FcL56PD4K4TQb4bPWZPoe5wXPl5oP34L9sBatjKhQY48bbARCGhT3am%2BHXWTZsRqBKMITbts8GOqUBX9nq2LAiZhMMEqw568EXxhcD1JCmEMriNGspHS%2Fchwi7TjSlrgTj0ecDyIvJ3lantroXksSRA7Tmfp5cKBP6FOc%2FbLuV9wTGFwsT5gH0c4bixs2zxmkTASsfaaH4s%2FjKtjpouYZ4Vy3LhpOSBl2QgPrDacOguvD0Yp%2B3rU%2FqJXeSi%2BggLBcDg%2FBAxx6R54KizzNiuujIuQYMCfCjm1lUINopHf7J&X-Amz-Signature=08bd2393d07f11781e54542ef62cc93ff479d0ed7915734e8897160c9bd99a2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y6KRBKVI%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCbSBfvW9M7n8UAyrgRIlRx1AcKigkujZ0kxmn%2FhpxqpwIgXwjwfF2f8k4h224pyn6Y5SUMRzBz3pVXNrIQPsjthFwqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKKcFMytmIcCCS6joyrcA2f9IPbaTS9goK1pDlp609BRDUhLRhgvDOJScZ8rp8VvVr2fMK9ttUf6kW0NVHisdbycNp%2BqzSeQmhF8HZvIV9%2F0xJZKTg63shfH2l6Hjsky1%2BLI%2BfQxmYMuiMth6wt68YtPHoCk9MKymppRJYpZL9ojvrzbF3d6FfPh7gnsyuKSm27V9hx3zNY%2Fqay8eobgv%2F1DiCfNQboWPHnQOnd1OM0tpiN4oUip81zna8oVvdRpklvGWfmEcFRG9Q8oDnIHbUFlNx5jzL0zYeT2JTfltKs6pHpruN%2BDU8Q5vfgZhjalyyFRdJSRc2rYRyuJVDxaI1ZattYml%2BNSHudfQWYgynP8IQ%2BKJdkOMLUZBzA015HlRo9cuvn0R2YIQo7%2FUN7HzrZn%2B6fi%2Fi8JwcSKIe%2FdR7%2BszQ5l%2BLMk6mv%2Fv%2FiI2BDKxIZw03bOoU4M5Y0qcRgjR%2Bs%2F1NZk77m%2BM7c%2F3Gz0711oN%2BRr2awdBHfQxmwxw3pS2pq5UbJSBGDFHe1rJ00WGIe9nTNtK2t3VpMM%2BJmR9Bxlsx3Zjs2UJ3wdD%2F4E8%2Fa0X0IqQTXWmoS94y%2FcL56PD4K4TQb4bPWZPoe5wXPl5oP34L9sBatjKhQY48bbARCGhT3am%2BHXWTZsRqBKMITbts8GOqUBX9nq2LAiZhMMEqw568EXxhcD1JCmEMriNGspHS%2Fchwi7TjSlrgTj0ecDyIvJ3lantroXksSRA7Tmfp5cKBP6FOc%2FbLuV9wTGFwsT5gH0c4bixs2zxmkTASsfaaH4s%2FjKtjpouYZ4Vy3LhpOSBl2QgPrDacOguvD0Yp%2B3rU%2FqJXeSi%2BggLBcDg%2FBAxx6R54KizzNiuujIuQYMCfCjm1lUINopHf7J&X-Amz-Signature=08bd2393d07f11781e54542ef62cc93ff479d0ed7915734e8897160c9bd99a2f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZJ2XHRKH%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065146Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDfxE%2BR0KSjocr136ShSoZ2NbqA3iwCsHicKNpkCmBcGwIhAPip2a%2FZrRYPfIvjnegUa3yY5i%2BkW39mIuzrlapEJRGrKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzaHFZWVKhIM41enG8q3APeaD6SA%2Bh2nqhg%2BUdFKmi9gkbN5nlu2zYdPnDwoaEZK9SwT%2F1YJmue45y0zC7OC708wb469%2B9%2Bvd%2BcqbUYLfC4oZ2bcAJjWYMBjbv3pY%2B0cNZKimdwcaZiKVZCEh%2FEuamOne%2FoZpYYFF9PqCEdmXkRgCyfoYpvDL2xyClYCMHezEvtrNgcCZS7sC4U31uLba92KuL0X34wQEXIYcZEQMHLN1Knwm18WKBbQs0nUGxDN4idIxME6jW6s8U1UMe0gCxGfh6ZK5aOeJE5EJFzoEiyj8KfhXQGjg28ABZaXI%2F0SjUx81xemsbDiSo9bjhiseymZo9Lg%2Bt46UQgARMQZ%2BJcFjnB6Lg3hFwGKpTvE8T3Ru4iFh7hnh3b7CUSgc9xmSlZ5fTKG8VcFRfr%2FZzOhy9j8KnxckgacHjMiS9uUPi0GyJlbKOHgZauaG%2FaIs8lV95su0qF3WDa5xZ9shM6D%2FLV5DMpC3ck3kgFf850HVMFn9PVRUNxtf077jhTIcoZ%2F%2F31mrgbsMyQrjEJ3klvRU01Ce9Qb4ZyzPa5dDmLgKpVhCohGEXDDYN%2FOmLmJnGPnXWcxY12wkFLGZVIS0glz%2BjnrswMMuvPim1WezgCS2cZAcLBaCJ%2FYTK3RvgoZjCs27bPBjqkAcz8m9sz8U26AdWMwYRSXlysWGaZzPSfSyNtzZYVJnSeHAj1BgPICU5XU2uD1qvk3Q08lZ2qLYBctzE8%2FbFrKjHSKcmlZr5rVYhM2BBkuKTr9ANj233tqOaQvjLAgwxJdvKefvdmzdS5UQ%2Bvww5lsdj3u5Nxe%2ByP1sjia6x3SIKUVpUjJrO6hfBGbvwUlnPS1lN85hEYbWB83w2FCLaqPd%2FEHnrk&X-Amz-Signature=1915a2f4fc05070a18c3c550d78f447bff68cf5913f9a0e44207514e02bfc07b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXVT6BTB%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSdJXWO%2FIrgFSr7Y810Upsy1okyRA5Ym2Ilwz6rgjxRwIhAOPITGigRd6LSvcCb9IHNvLgRD546xbiKBKs5DdmhuCFKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz1o%2FYe5Uhxy8Q05lgq3AO265HjHibapRybmh%2BISE%2BVMNKHEFliRtal4MZVbgqWYZBlYkcOteHQ6lG8fLsRnK7qsVlsDsb%2Blzj%2FY0IKgS7ipgwxL5dPQjV5ooVV39v%2FbABKcMlQA6VgvksnY6RpkY4634WJElQ2LHuXzORB6p%2BNRgLF4sIZJDsb9HjAHS73sisgIL83oobWQwrDuxMJOaign1D21Xmv5W6wY6WATY0vm6nYVJKrA7EGOmgeky0LZjvVV4Jt8LsOnDLPN1Ce6AH8VTDRv07A6X7uQHqIZrzF%2BUk5Tmn8i2cny%2Bn35f%2BxYXpZpc6xFReDj135be6QemWIGwXzA5qcmLcNfW9v2KqfbuT959eyzLlBHGyV1IIm%2BoO6Myj%2F5MnuEvGb05u6wnhFCOOjQtQJQonyl6ln7oIB0dz8094rJK3Z3tIbiAVwyaFvzcuTTJAclUqbtoTWhbffrAf0%2B1yT6hwYv4q7d8XISufPRHabIxoOB2QVJMIAIFN%2F%2BPNCFSjns3EzOQYL11FJCyAozwJSXynoOvTS9PwH1ZwaGZR5wQsROWkPLfx9pyQiwOzuRqkb2wTJVnX6WMmorZphTfD0a2TweTYnqDcsTFN%2Fxl02b4qFgaYEcVo1cwZl7dND839znKPNyzCK3LbPBjqkAQEd32%2Fjff4765u%2BO8ry0fEiwVfucJrUe6qwTbxzfuNxa0yrJLy03UR0KVNpytZWkockmKKVPCVxs4OenRIomAAfn9q%2B1tfHino%2BWG4W86B2f8oFdLMFZmgunNGlzbc1sSGNRn6mLJ%2F5voC9xHtZxCQcrn5laBtHZTp1zaqZQzqBeZ0jnVRzGk%2FDmwUiGxt60vuS9VxfesS0f%2FX6FMOtzXtGPYwU&X-Amz-Signature=4447f04e9eebb04ea3ced91174473bf5a31977da2eb98952b340770958f17a37&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXVT6BTB%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCSdJXWO%2FIrgFSr7Y810Upsy1okyRA5Ym2Ilwz6rgjxRwIhAOPITGigRd6LSvcCb9IHNvLgRD546xbiKBKs5DdmhuCFKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igz1o%2FYe5Uhxy8Q05lgq3AO265HjHibapRybmh%2BISE%2BVMNKHEFliRtal4MZVbgqWYZBlYkcOteHQ6lG8fLsRnK7qsVlsDsb%2Blzj%2FY0IKgS7ipgwxL5dPQjV5ooVV39v%2FbABKcMlQA6VgvksnY6RpkY4634WJElQ2LHuXzORB6p%2BNRgLF4sIZJDsb9HjAHS73sisgIL83oobWQwrDuxMJOaign1D21Xmv5W6wY6WATY0vm6nYVJKrA7EGOmgeky0LZjvVV4Jt8LsOnDLPN1Ce6AH8VTDRv07A6X7uQHqIZrzF%2BUk5Tmn8i2cny%2Bn35f%2BxYXpZpc6xFReDj135be6QemWIGwXzA5qcmLcNfW9v2KqfbuT959eyzLlBHGyV1IIm%2BoO6Myj%2F5MnuEvGb05u6wnhFCOOjQtQJQonyl6ln7oIB0dz8094rJK3Z3tIbiAVwyaFvzcuTTJAclUqbtoTWhbffrAf0%2B1yT6hwYv4q7d8XISufPRHabIxoOB2QVJMIAIFN%2F%2BPNCFSjns3EzOQYL11FJCyAozwJSXynoOvTS9PwH1ZwaGZR5wQsROWkPLfx9pyQiwOzuRqkb2wTJVnX6WMmorZphTfD0a2TweTYnqDcsTFN%2Fxl02b4qFgaYEcVo1cwZl7dND839znKPNyzCK3LbPBjqkAQEd32%2Fjff4765u%2BO8ry0fEiwVfucJrUe6qwTbxzfuNxa0yrJLy03UR0KVNpytZWkockmKKVPCVxs4OenRIomAAfn9q%2B1tfHino%2BWG4W86B2f8oFdLMFZmgunNGlzbc1sSGNRn6mLJ%2F5voC9xHtZxCQcrn5laBtHZTp1zaqZQzqBeZ0jnVRzGk%2FDmwUiGxt60vuS9VxfesS0f%2FX6FMOtzXtGPYwU&X-Amz-Signature=770f79d97461859bf33488fef6bb0dd0cdf3495afad5673e51efd8b1471f75ff&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZHTALPVZ%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEFunadhVr2Eget1NHnSTn2jwhED212sru80OMAWbtU9AiBia%2FbrEuejrcV5dRqEEwJJtU4xKMdwW43om9Q7oXTOLSqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5L%2F5UTpfdDWjFD6rKtwDwW72uGqe6TlOmJ%2FDp%2FVnYrBOUTMc%2BJMuJiHPjSKtj8FH9MKcqsSSU1TadL3pGXiDnhl6h%2BHN7D7xd8W2wqB7anljM88SyuxVTJBQxvy6VYHstaJ9j%2Bz72AosaOb8CfP01V2N%2BdYouPSp8T3bDPaahytufK4glHbkO09laboSr6PnblcHViqnrtZStPeFwlTitQGAcM23Wa8U2KhA8l3e68geqea%2FyK40YF5kPvVCyaAbT3hcvqUpn%2BYv%2BY4blS36lVJPvJ5GhzeeSeYXtHuH3xx%2F5D9%2FvbQLq6qyRIr3th7290c1no02eXLrPCvDgosyWyoSR9sD9eFYA6YQlLCJvTsawb43yU%2BoB8i4XGSDITDeFaaqykS59GOr0e%2FA4HY2hSQcwmRjbkUjc8XcI697Ke5Kx799ktz9gjPTsFhdQZ1L%2FzcEhvfZeKgQGKXeC3BFccHatgPZS8QOHjmYKUzBAzHNhhJbY3KUt0dDjj0sLpwxBJDZRGu%2BxY2uMNTyGn8j471pz%2B3CW555M%2FwpBe%2BTy702SFhK1waRiQzTP9Z8Y4gmI2%2F%2Fv8LcfOFhwgwJfG7QmpfXJSRuvY7D4ggo0YHN%2FNnCUL%2FLTctbOO5zk%2FfpoEbap%2FCG1N2aGd6qfGIw6ty2zwY6pgG7wpRWycQynZN1dYF%2BxHzTHfU1ydN0fFv8%2FdAQEnqbzA4M9e6Mi9cvQbzLpSkyqtSnweXVdGT2JyRLeP4%2FFODE2z1OswqfJc%2BGXBWTbn8OE1OrJLKkpQqc5ECwAXFitvzrpSty%2FKPfXBp1mSguSbS%2FrxeLyfPS2IdSiTQObc8kmzioJv34qsn8D11KmrklHuig%2FeAld%2BOi%2F8J%2FGGPPqmzpR84vacdZ&X-Amz-Signature=a37e8354c74a60a847e2219802c1511b3cf97f221cc60a89784fb60983278465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665KHFWYGP%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065149Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCpQNo0EXRNXMDMDniHqG8E42%2F3EYPme4ULdzhrcs3v6QIgQHtQbYcCBTXsfxnyr0424obGeEdspvjOTcFBPLlKHP0qiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLaDADZEdS9vpbCYVCrcA0LxUKynJklEo20lne%2F6IrzLQdu1mOZENXhwLAkQn0iKW5CFgm9eBT1xuitAFIrJgrntpc2vtWEMkHTK3E6x2vo9ET%2Bt69OpdyrfFPAOgzEZsmgJBdxVx8KIPTWp08ymgRu7VWZRdiNgt0rFRzmJBukwhUkARsywzKth%2F8CWHooDK%2FeGyRiEZiSqGFtArHVfEms94e1Xiitga79NrV8EQ0Mx2f%2FyjkjyZXtkytOl6FFz6vISvO986kWLQ4MPls6ggdFYEqo9RxXx8VwwPdTRUZIoQ17%2FKtTxBUVeTJ6Ziwivq8%2F4lJkhB%2FgjaDG%2F6FFx1OGOKmeSGKtuxGLQp4SOrV8iH0N1axOd4gOrdpIq8ntAkV2HtACnHuXfnaVyZzQIsVGUz2Hxq6h2kPjn1AyCvHb1MF0dtkP7xmByMmY0%2BqRK%2FO0WC8lW04jmLj5%2FuJbk%2Bd9sQ097akr%2FTb16rZtqyGOdJxs2pdEnfyxo10OTzzjHEiYyoFHarS6ATzLV%2BjxmUD28Y0MUIdvUYKy2FiWNVrcWyjW0kBcyhW0weMT3t66DJZSf1r53VjxmyukNNEUS0YgpfdXD25MADXSeGaGmCgapfjgx7PGpE6Y9f%2BLn2TuHykhYnKm%2FywYdkW1XMJzbts8GOqUB5fzwbq9lkmJRCdMBeDjiJNfYXTb1M5iE3LqGuOuWVLVZMrZ7M6z5iCQaM8lh8AlNZ1AFnF1LFhJC7pv%2FoGJGBG5Xx6EKUGwaB%2FEWW4VmCu8MHvxFagYsk7CSKh94%2Fb6ZmLhNlWwP6KcT24Zm35hwGTb6nHiTFKsCKuT%2Bg0RL0xJuUy4T5ARoj4rJU1G3ZtLLSBTC6rRCnwEjXYQxMWnNY8RIlOEs&X-Amz-Signature=42cb3bf2b0f52b1a61bf069f6ad6c7df8de66a99a2f96852af30979e989186db&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4VJVP5D%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCID8CfrpSyAVfeUJ4bhwU%2FpOyrBP8mTAHftv7Q3Nan1BWAiEAvuxx765lDsqWYYHyEnJqiHRzU%2Fxysff4fPnpNCEztKAqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJBE6b3%2FbPqwkF22nCrcAzzo32gczxtFQ3WxlcwWDB3je5Dierxzsan8j0MclSAf3t%2BnJGDNfatRFACpCxSNjZRc8v%2FyMpqfQ2H4uA%2BiGWpCXXj1HD4QiCppzCJBSshYLkvKtBLwIvRywcmkg2pm3FxZF9tdg4gFlME%2FXu%2FAkT7U%2BZiQ%2FWxS87df0FrGPR9ug01ZgWsiW1KWeAuvXu%2BVEBlaxZQqDKepTJjC6vA95eYV9gH12WzAc2yQn1BPYIwHJyMvSWZX7ECHHmEA8gw5BmBTHsM5S60IgliI6rQf%2BU8UgNlu1vQOAF3l%2FHFJcmV%2BzwKgg9njmh3Zwhs2N%2BuXOuk3iiMwOI5Ny2q73EwiXyTk9v6rK4jMwM%2Fgjxdq7c6P7BIREdZjJH%2BbgLpxOdX3AAoGgNsQuI5y42CkbphC98NrJNmFwpwz9uJihvZysVHJbTuKOATPwRxi2mQGlspHeIYZ04jCxadzHdunxamnmsFbPODxui%2FeHAx9Ivq86N3RSp2BHK2TRHMVvfVMnGiquzzCix9ujo5clSBmqfPxISQJH4jAH6KBuBYwEHC%2BMPy6LTqFP%2BGYJlgQienIs3L%2BYWOxBsM8B29s05bK18vA3RT%2FxOWLXN0aSELctjaUcpqlpCIYWcui1rZseJnFMKzbts8GOqUBq5%2BpVQr3tRdIwF2PWUYG0P70JMjga2NkHOJiTcxjovfc1a5tUpUvMShx1gTeg9Q9fI1nqEOrUv%2BVlIjkIyyGoxTDNWZcUhIutrwLoVL7uNpCyPQeFyBc4gDhpdBZw258TWEyQc6yS87jqnvWAj%2FWWeNMjL0TgYlvU4kdlv6BXWjdJFup%2F5At2aK%2FQ1kX%2BuRsxREszKVALnHCRNnNUKYqi8ptxgsE&X-Amz-Signature=214f42f652c881b2a5d3495d1d72bc5f588be2d9fe600986ce079376a0fd0615&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYXW6LTA%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHx6stZPJzeFcWx9LCqiwDb96Og%2B5ZTD38rmyANFjp9lAiBGHIM9V%2B6aWUixH2%2BFaAXFbCRMLPemmfZQVbclOrxrviqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJiYP2PGA60KDHPNsKtwDUP5TPu1K9Wv7TferPHV2FJpSy7xEfLTu9hiJiuMGeRu99Wbw8w1LUvPmyVSTGl153SppWlEqljm%2BsdgWK%2FMqS2HvnKb9AJ7fNMVBvxAv2CvXMefEJfN9wbmR1pLMVpBnRiuo8OULCqVEqNyF7PQZUb6FK1nymNWEUi%2Bc%2BfV%2B20zpGnAaZqjRZK%2FaL6065sJesZCVlp9O8qhEhS5D4RZi9tiAKeSEX99K4ADoDM0HJ5zZrNiJdlwx%2FwMSGVjzzff1r5M2ojc0b7wXc%2B8lQfxmrSlQd5Nt7fu4Az9dL2Qi6BS9aBCCW2h4YWC9og4QGiksft44ObAFtxNQPHBtpF%2FMq3ZWQXctPYiVpAZRlUJulBL7S7OR2BQSTAB%2BepWe3yjWI5IxfFx2%2FPsVRXAgE0hRx7z%2BQaUNSjq%2FHvK%2BX7YN2lA7ZeLx08ac2zLN74ET9dVTuAz2Uz9y2NXy%2FYdRONMiGzsEiBc%2BTbqp4TRZLNAfBkyjY3ZlM2hjr0L1dA16En%2BMQ%2FOHTISE43cadHtgBWvYEmeiLTl85pWMRyhJhXGKgNKkncakqzEVrY%2B03X3Zpr5vLA9CJAunHCugtvys7k0ZT7RR%2BvYdRRcHZIayIbfOp%2FKiTpQ0C%2FAR6eDUi4Mwydq2zwY6pgFlkXzEaNKF%2F%2BKfQzHF4op3ujy8qsLZDAWbjD26t%2BwmA9674JVUKr%2FRemjryixB%2BwSiWsGs99d3EzVwK5C%2BgL4bkXtkzOkwgdeLCXjntR6xvEitKCzHZXOQTFd3w5cn64fSewdo813D7L3kqd0UQbJ8BdF3teet1WuSui8EBPivF6Sk3OA0xBOZqnFM%2F4KVLucgD3kNXRlN4bAylnUGibKQWgX%2Fp8pA&X-Amz-Signature=2c5c5127c868b358ee90a43e3835a34b370a6e7e2813c78f8168951117eb66aa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RYXW6LTA%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065151Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHx6stZPJzeFcWx9LCqiwDb96Og%2B5ZTD38rmyANFjp9lAiBGHIM9V%2B6aWUixH2%2BFaAXFbCRMLPemmfZQVbclOrxrviqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMJiYP2PGA60KDHPNsKtwDUP5TPu1K9Wv7TferPHV2FJpSy7xEfLTu9hiJiuMGeRu99Wbw8w1LUvPmyVSTGl153SppWlEqljm%2BsdgWK%2FMqS2HvnKb9AJ7fNMVBvxAv2CvXMefEJfN9wbmR1pLMVpBnRiuo8OULCqVEqNyF7PQZUb6FK1nymNWEUi%2Bc%2BfV%2B20zpGnAaZqjRZK%2FaL6065sJesZCVlp9O8qhEhS5D4RZi9tiAKeSEX99K4ADoDM0HJ5zZrNiJdlwx%2FwMSGVjzzff1r5M2ojc0b7wXc%2B8lQfxmrSlQd5Nt7fu4Az9dL2Qi6BS9aBCCW2h4YWC9og4QGiksft44ObAFtxNQPHBtpF%2FMq3ZWQXctPYiVpAZRlUJulBL7S7OR2BQSTAB%2BepWe3yjWI5IxfFx2%2FPsVRXAgE0hRx7z%2BQaUNSjq%2FHvK%2BX7YN2lA7ZeLx08ac2zLN74ET9dVTuAz2Uz9y2NXy%2FYdRONMiGzsEiBc%2BTbqp4TRZLNAfBkyjY3ZlM2hjr0L1dA16En%2BMQ%2FOHTISE43cadHtgBWvYEmeiLTl85pWMRyhJhXGKgNKkncakqzEVrY%2B03X3Zpr5vLA9CJAunHCugtvys7k0ZT7RR%2BvYdRRcHZIayIbfOp%2FKiTpQ0C%2FAR6eDUi4Mwydq2zwY6pgFlkXzEaNKF%2F%2BKfQzHF4op3ujy8qsLZDAWbjD26t%2BwmA9674JVUKr%2FRemjryixB%2BwSiWsGs99d3EzVwK5C%2BgL4bkXtkzOkwgdeLCXjntR6xvEitKCzHZXOQTFd3w5cn64fSewdo813D7L3kqd0UQbJ8BdF3teet1WuSui8EBPivF6Sk3OA0xBOZqnFM%2F4KVLucgD3kNXRlN4bAylnUGibKQWgX%2Fp8pA&X-Amz-Signature=e981111106d367aee4038605ac3ccdea8ab7603447ef2d95c39e5f3f90cac7b0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZJPVMPE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065145Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD728%2FAndPdqTuUk7IjlFKo0WrYsX9awnqFOsRE6Jhj%2BAIhAMQjKZvkBY19OUwXOUNOQ6QKHA7AxcQsSKyMdupqpsufKogECKf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyTl6%2BEpj0WXc4eB0Mq3AOg2oP%2BfBDaQEIwvQgwKNOigteB7cH4Mv39TXDhsKvGDS8qflVM8iE5%2BHNSdw0w%2FQYmn8%2BMDnlfviGmPA7EdSdx%2BxfKEg%2FgaSZr0OTsYxBrElpg8UkSluvb4zkjk6cRcQaqY2pKRppObHoq%2B2a%2BNWgY7K62WmisiPHFW%2BTr0IG5khBW4Ydl8H2ljw5puZQO%2BWmTlVBJb897QH57N6t5bhf8Xc1GcndGCgTY%2F5CgzphHeNW7D5l0cuiX3W7xj0bsmnRnhsaeZ6zcCnUmPtuPCnQNgb9LGmqHxSbaPumDliwUz8xCX0MPIxP226jp1aufl%2F1PSu6mgP4q9X8JiFya4ZIH3r%2BvZ03HNiurIeJ%2Fq5IfFrlg%2Bu09HQHUKgHTDNAMVQm%2BN82Pi87uzKTIUuubTyOXCysYQSHT49tBifvCvzSUyTkdASgphublFDD261clfNjyfn1Xl0D%2FO8AZllP2A0ua%2FjYByuuDICZIF5ann328mRy3G7a4KFjDkDMuvsH3wuls%2BCc40H8YJZzJCeKzSed6T%2BPCG02Fi%2B3QpHxw7QcLk6ezE6AYhKLsCKwIPCF6FGhM3g5uKpSL9IfF9rhxEyc3Fi0uuspBZ9JSSNp3R0iduz1wz8zFDnRT4hN1JTC927bPBjqkAV7LXvDhhrPNekjblit2lZSNY7dKVloYhbcTwKVCY1qQw5CP1j4Ym6rdT6KGp6tBas82oGSjZEVbbRZ92kRqlac4phWLk0p3BIKBwREaGR2HFt0dZ9gvj03I4fkogsB7nWb9RyVzPvi2PL0Vxq1tsK7KmONopsLyBkmdoZjjoY09fVCTBSJ5VwOG2O%2B3oJa%2FvyKHfG0tssBXmknAIj4Vso19P3bU&X-Amz-Signature=a9967a4bb203061d4cd6062b426fafae21a609c454805c7ea318ec937cb83b95&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFLZVDE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv5dFnHruFYDAOhUMHv0DbCKhO6HpgSZFNHcBQoR9FJAIgZUJ49h1E5Q%2FbTmmMggOn4aTgUe559qcYpL6DVZR9ABYqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ4mnYNYpZHRnUXgyircA%2B5K33f8vrlc67YnL%2BqKvKh58bg%2BsQcYcXxDBzZh8znmLnBtd3X%2BT9UhvawY3wKHvC3AhZ%2BujoCEbRwy7SxJnlEkRhShT7Di7d5tFP3MV3GXsJ5jtHW9wFK48%2BdkKwNGMFxcpeBxtdfDzhscslnTKhKBwysNZyXEWqXH39X%2FqEZsqdJkpOeHH2rsQrcHB3EjWfq7ELyMdPzgyRMnjBg2TV%2BD7CV7%2FZ%2FX0AHfgCBunRiVv1%2BaOcVu6Qv6km%2BPL%2Bq8skM0t%2FxYHM6FYL1tch8%2FHuNOCDQbqmBWdV1DSTRUeT3uJLGu5W3LRhUbMBrFTrwpNWJkMGYdmcsgrSH928n0yBoZJPWlnrGycx6b8NlP4v6PKb6791DMlVM2DXJ5jlpRVp1KIpI07yQ%2B4wVUr0QxVSRlhOpWGmjSynUHKfAfdF9xaBBiuL%2B6OVVhgD8jMq2MtXRd2wzBAATkuHY3exbu8awrA823NXgUIgwMoFdaEIvNGP12FmspdmJFumF%2BokX61X4vJN56%2F86OnXK3Sn7rrCKl4Lh1sFztv0KsC4RSKLIROD2vzSGSvwY8n4I67RK7bNdbncP1%2FVkqzPVqrz8VxXDRcBpr9OujWb69UxeBjp6k%2FkUu6vO9IB0ARaGMMLjats8GOqUBkhMf5LQnNey3KDLVZkM0KdhJT7Hc9KZXBA03KcDL4dU%2BISmkRy3mMfljWDA9flPsFAhzOJqZ0sWq4ZmEemWyDHcqmE%2B3VFdqvFhQIhAou7qqL5IO6MdzteqTZP2i09XrMevWc9zbS0n%2BGqXF38m1mwWthTaTB97IoTCRiIWofzK4zWaM2e2gWj44hvTDxjpy9LI0pXCZaOXvt%2BAThk5PuZikqlpM&X-Amz-Signature=5073d4feb19710f4831797e95c4b61cc80f45a967a4f798f98e3f7cdd3532317&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VUFLZVDE%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDv5dFnHruFYDAOhUMHv0DbCKhO6HpgSZFNHcBQoR9FJAIgZUJ49h1E5Q%2FbTmmMggOn4aTgUe559qcYpL6DVZR9ABYqiAQIp%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJ4mnYNYpZHRnUXgyircA%2B5K33f8vrlc67YnL%2BqKvKh58bg%2BsQcYcXxDBzZh8znmLnBtd3X%2BT9UhvawY3wKHvC3AhZ%2BujoCEbRwy7SxJnlEkRhShT7Di7d5tFP3MV3GXsJ5jtHW9wFK48%2BdkKwNGMFxcpeBxtdfDzhscslnTKhKBwysNZyXEWqXH39X%2FqEZsqdJkpOeHH2rsQrcHB3EjWfq7ELyMdPzgyRMnjBg2TV%2BD7CV7%2FZ%2FX0AHfgCBunRiVv1%2BaOcVu6Qv6km%2BPL%2Bq8skM0t%2FxYHM6FYL1tch8%2FHuNOCDQbqmBWdV1DSTRUeT3uJLGu5W3LRhUbMBrFTrwpNWJkMGYdmcsgrSH928n0yBoZJPWlnrGycx6b8NlP4v6PKb6791DMlVM2DXJ5jlpRVp1KIpI07yQ%2B4wVUr0QxVSRlhOpWGmjSynUHKfAfdF9xaBBiuL%2B6OVVhgD8jMq2MtXRd2wzBAATkuHY3exbu8awrA823NXgUIgwMoFdaEIvNGP12FmspdmJFumF%2BokX61X4vJN56%2F86OnXK3Sn7rrCKl4Lh1sFztv0KsC4RSKLIROD2vzSGSvwY8n4I67RK7bNdbncP1%2FVkqzPVqrz8VxXDRcBpr9OujWb69UxeBjp6k%2FkUu6vO9IB0ARaGMMLjats8GOqUBkhMf5LQnNey3KDLVZkM0KdhJT7Hc9KZXBA03KcDL4dU%2BISmkRy3mMfljWDA9flPsFAhzOJqZ0sWq4ZmEemWyDHcqmE%2B3VFdqvFhQIhAou7qqL5IO6MdzteqTZP2i09XrMevWc9zbS0n%2BGqXF38m1mwWthTaTB97IoTCRiIWofzK4zWaM2e2gWj44hvTDxjpy9LI0pXCZaOXvt%2BAThk5PuZikqlpM&X-Amz-Signature=5073d4feb19710f4831797e95c4b61cc80f45a967a4f798f98e3f7cdd3532317&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TC3FJCBF%2F20260426%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260426T065152Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEN7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIFrKcBzdUckUjRKfBARGBfapVYdEfL3FlwNFzVGBCWqXAiAOcxTD2mw6Se%2FO6h5%2BnmKs66dU3SVFYb5s6p7pvTdcbCqIBAin%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMxV1xxPGguqTzlIFEKtwDu2Vx6AWVYzM6OY1jOdAEao6yQiVBeIFISLW%2BOHRTwRuMX8oMWhXcN8kcS1%2F9REzvAcn7PmFZXzzux38mLYhO0MTt9VRHiy2wZLiB3daHJG2Uaype%2Fa5bxte%2FEtUSRXOrzP9G9SUE%2BPtrWM%2FswJiO%2FjG7LFeayQpn66cYM5H9a7nOczt16U%2BUECVCB2PqS1ROwZGaxKlMGmYqEJa%2B14iLBBFcNfImRIxgZsSZxZZsTsnXbjwmDFSiSb96MKsZespgCGdoR2FDJjUPJ8mmgjzlo4sKcuVFl6dizbGXBj4ZnuIROHUTSnoDgc8tp1R4xLtn8LOFMjvJlcafPv75Ier2BAeX9l4HFP%2FY%2FVNdE49UZGsvMeccXNZE8taTM2HpMTDe6SDhBnnzdNgv9qAGfhev4%2BJB0fYoDkoGBWTKxu64vFjBCOzXS5w9%2BftLBZjHu8%2FOxoOKxTA9aQgnafchf7v8UQczYf%2BbDoBhem36dErBGXD4VSBf80WH3bLR%2BXKXjm%2B7jJNGirIYhGYPCZArPVGfshXLCdbFAzdC9qGTmkCVrA7W7mb%2FFN8DUaITM6qL7jonY9Yrpb97qtpdjXcaAHWn30ug3p1RemWYkdweoOM4tgG7PdJpxP1bA7Tkslswutu2zwY6pgETr8FHzbMLu2EveB%2BstOvZ2deM8orT8V5LbeYYPMkC%2FLF69DZ%2FK9g5v3L0%2BN0S9WdVmQSoFt5zi2N3u%2BhP2RQTfYk5hG0TMiFSjZnW%2FYYArpXz9La6HQ1y2hTggHl3MEPk%2BrNe5ZgMa3IKJJKJg78XSFcWm7n6oIQiIBNlB%2BLOTNXreh1ROMZBhHUxGxD5%2BmPcG2jHJKjw%2Bu%2F0yn4ujsWBlUqlWkDU&X-Amz-Signature=cd4b05316fef445f3268867ea59c7dd6b42cd11b41ffcc4f6c2e85d2b7e6802b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

