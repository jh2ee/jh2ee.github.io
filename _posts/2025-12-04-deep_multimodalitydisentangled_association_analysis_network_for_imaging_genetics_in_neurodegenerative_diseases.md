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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KI57OO3%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC8nFRXPscAHn8DOeju8li58wmsH5jtryAuWcn4%2BFNjmAiEAisi2IQhHlqX%2Bl%2FfZ7ABvuc8tNblQfWbjr9T8Ki7Le3kqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC7Kdldit3SAD577HSrcA%2BNmARUwgk%2FW4AonzegS6fUbrksYlzaHyqD07rK%2FGCi5dDZg37MlaZHCY%2BlKpI04%2BYsRYMQImMew3tT%2BOtW5W4S4Ayqe7QhoWbti2vZh%2BS1rVQMpj5e8OYsiQSeWzlVfEOm1oZ%2F%2BJUKYiom%2BVV6qqijuAzfNX%2BVVp09kHHoLosxiOXl%2FjpmxHu3M0j1hvCiVS3oII%2FemHIzy0fyg3TBASRADFjOUePBnEftkkE7RRnUg7O%2BeLOQk5EDW9Iicvgsq6MV5rkqYNYc4Rmku%2BNp6xF7rAkQ1faSEZxjWK4W0JLl59KY8AGSwC917TgNQOiajJNIgho812v%2BU6as9v2F1yQzHkWXdar7rnj3aY8njz6Cna9oTtcqU%2FPNw70O0EeNQi2dLEmfhd0FqQq%2BwyZiqWgxcfWYlf%2BH95Js%2Fg%2FdEDnZ6aYV%2BFVd9z2mCAbaBpiTlsjJZiR2DWbujzDHsfulTQJq8ak6UbsaZuo%2Fe28RR0mAi5ePy1posp2BgSs1Qc8dGvo7m5WmF5o10xoUThJM3%2FDfEuxsfcdJ3y48hBQrXqK9fmYMvgwJYPbD1QaId0D3SNCmHSxRk7q23MnQ4S0F7WbWGeKPBb%2FrXe%2BlrTqX%2FqE7O1750%2BsCoeAhCH4iFMP%2B4os0GOqUBhsy3vVvlRSOg0Rebs613JX%2B0%2FQ5oxElqAJsNdErkDWz5mWBSYAlsJw0JBq%2F%2F2zjGcGt%2FvLf5Fain8hfknxBwewwI7est3LgCkuUyjZ8N7BYoK%2F%2BFXuLXH3eQaBlnJYFpfYjfpoLFJNKnSaueoXPZuMR8dLQlL0eeXXb9uurKUPpne2tGs3Tc9YmvW%2Blgt%2B33qiladdx7jPUrqZJey6uDvA6O5QE0&X-Amz-Signature=1d84c65156d31ad069ea68ac3890a0d549ce72f15960ed63fd6baa3ea47762cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667KI57OO3%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIC8nFRXPscAHn8DOeju8li58wmsH5jtryAuWcn4%2BFNjmAiEAisi2IQhHlqX%2Bl%2FfZ7ABvuc8tNblQfWbjr9T8Ki7Le3kqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC7Kdldit3SAD577HSrcA%2BNmARUwgk%2FW4AonzegS6fUbrksYlzaHyqD07rK%2FGCi5dDZg37MlaZHCY%2BlKpI04%2BYsRYMQImMew3tT%2BOtW5W4S4Ayqe7QhoWbti2vZh%2BS1rVQMpj5e8OYsiQSeWzlVfEOm1oZ%2F%2BJUKYiom%2BVV6qqijuAzfNX%2BVVp09kHHoLosxiOXl%2FjpmxHu3M0j1hvCiVS3oII%2FemHIzy0fyg3TBASRADFjOUePBnEftkkE7RRnUg7O%2BeLOQk5EDW9Iicvgsq6MV5rkqYNYc4Rmku%2BNp6xF7rAkQ1faSEZxjWK4W0JLl59KY8AGSwC917TgNQOiajJNIgho812v%2BU6as9v2F1yQzHkWXdar7rnj3aY8njz6Cna9oTtcqU%2FPNw70O0EeNQi2dLEmfhd0FqQq%2BwyZiqWgxcfWYlf%2BH95Js%2Fg%2FdEDnZ6aYV%2BFVd9z2mCAbaBpiTlsjJZiR2DWbujzDHsfulTQJq8ak6UbsaZuo%2Fe28RR0mAi5ePy1posp2BgSs1Qc8dGvo7m5WmF5o10xoUThJM3%2FDfEuxsfcdJ3y48hBQrXqK9fmYMvgwJYPbD1QaId0D3SNCmHSxRk7q23MnQ4S0F7WbWGeKPBb%2FrXe%2BlrTqX%2FqE7O1750%2BsCoeAhCH4iFMP%2B4os0GOqUBhsy3vVvlRSOg0Rebs613JX%2B0%2FQ5oxElqAJsNdErkDWz5mWBSYAlsJw0JBq%2F%2F2zjGcGt%2FvLf5Fain8hfknxBwewwI7est3LgCkuUyjZ8N7BYoK%2F%2BFXuLXH3eQaBlnJYFpfYjfpoLFJNKnSaueoXPZuMR8dLQlL0eeXXb9uurKUPpne2tGs3Tc9YmvW%2Blgt%2B33qiladdx7jPUrqZJey6uDvA6O5QE0&X-Amz-Signature=1d84c65156d31ad069ea68ac3890a0d549ce72f15960ed63fd6baa3ea47762cf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TMDRFWY%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221742Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCG94KlExNDrIH7LzfSDOr2DHykvFVpKEiKR9UBkaVFtQIgRhHdP5J2%2F%2FjYXCiuFptg0NI9GKrPO93Ph0nQLf%2BwJZYqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDNhXfmOhdzg4LcG2%2FyrcA6R6I3Mc%2Feu0Cmjkw1qW%2FfUM5jot50dnf7jJ3fCPSxizEPAUaG3ed1X%2Bbv%2B29nfM%2B4hYn0E8oznSVw3xB%2B4qDw8NJQ9RlNdxjj91WgqmrUX2D0H5NIo%2F8Yrbr9n3ou%2Fxwqc2FJwRNEirPMv8HyHkaotDInkfqGrd%2F2cULDLDhTFTDwzzlwDtABkgjDF%2Fi9jfdStjVBzBaZ2ltDZ3aqInrPeLb8cZQkKM4xOZXX3ERebZoUGrBGy0IEY2V0ThIquoZT8U%2BDaubSDjJ%2B9gOqM2hvgudKjWE%2BPqFFrMg4CMp5kQwchK206rR64CIt7dcs%2FpEEDYMVZxCCqb%2BK2u%2FItIHXUp0tFpGVVQdAhQ166nfRKea0GfdFtLxdK0WmxzEW5hSxQ1D9%2BmucIfKHF%2F7X%2Fnh53NrFMTBcrVosjwjhtD2fx6ebcD4RWsomhcjBOXxmF7QCVefAGsuaPz%2FAUR1%2FaTnq1LIZV9cgR%2BP2ZN5SQvtmki%2FXv1115NRdhXiUo%2BHmsGmubVaSR%2BF82UDXTVk656XoUWvoaele8eNOmDLdiYkGEWGeipNvF6SEMqVX2UvqhIxnLyLUAQVrJdTSc5od3IN8Rb612Ubwvei%2F6GSYd%2FZd0DZf1YfG7yHserknMEMOu3os0GOqUBAeUpbiOiZ7oGCw6XuIx25C%2FBd9Nq9ojimTxnI2rO%2FVqbY9qdV6Wp6%2BdU3qiBCpodwTU49H1aso%2B%2Fehkaa5yjeygMSSjbDmUNU39FwML3HLLNbGO3zknEHvZAqoG7uPeJtepBBBZ8QH1tYn%2FQkM%2B3jixN5DCjsBACQm%2BS0RSS1OANBbOfNcP1InXqEhJcciT3V5UJfQ7bFoeEaOMM6znVlH0fn8Yk&X-Amz-Signature=ce4c83664abe1b2642e0beaca5905bd44ce604aa07b8f8a4236724accdb373e8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UGGGGTR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHNqkvYS6zy%2BiZUMwxZj8%2BlMZeStJJG%2F3w%2FBB8RUhH%2FPAiA6Y1LnOTM%2Bkyj5Lr25eKWh%2FBQTkGwX5Bcuy5AIBasTcCqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FeYCv%2FFSrRcjVwe5KtwDlwjiLCIaweA6ohr91H6HccPPwnm1Bzk8d2jschEAViQh9qmziEJslc9PcEgGmBhQVcg%2B2ZbUbDy7erKlP2%2BDGxNSbK9VgYSaACj5Zkv6COMJEHoywS6qqd%2B%2BC9aE%2BBZkQcJTbDQZz6nU2hbEXy1fAw7Xtc%2FX7dYrGdniJFv2j0%2FEMjzlzK7A%2Fs8oSN4vZs4CgE0D8PTmjFW7W1k0b1McgSasopticn2i8VnbKyQyNTGr0el%2FPwujXErB36rjj0UoXxLFy%2B0JYQTklPmfWMVjn1UfhOw1APZv3a51%2FjOkTGF6olPbm9oXUIsnt%2FGHq5jg9ok6n0xQ2KB%2FABIS2IguS16gGOAoEfI95M%2Fxmd%2BVdMeo8zCDaKcsE6z4NJfQzVMPMhKoiJ6%2BPlldoELpwrybNWrmmkRlK5d2TIKwqNulHxhR7mpubQep7fFtxElJTnhzCx08W1NF0H450v7eWt8fMgQl%2F%2FUCNvtx5ki0CYmMbDdxAbcVsgPIC1k2F5khXpqZ5K4IU381VrwMvqrTe0SVGNmW7MsVfwF0zYuV1ybR57uibJcPilcPGiJ0wv2lsqNzoKtjmshD%2BRv1ra9tEQ03ZpCpGJ7R%2B98SWZE4Q32Mqtz0IP%2Bss3nMYkLVV%2Bow67eizQY6pgGHvqAWHoISXsb0oF7s0Lx9U4CrhOuogR4eylC6CnRhA4Kdg%2F7yhlZuwOw%2B2yKcmRtQZbEauS0gQEskiZhYy0zCq%2F%2BoNhQmJ8SSfDFRKhrfvyEBBrvYIK4mfowaSOm275orJ7cf9cQvVqtuAU%2BSFLwy2ppw3fNWpmynVS4ykDol8vLKRLqDeaj%2B5QnavIkPUeYh0iO2O3RtbM4eUgakyt5Ku5vO3nds&X-Amz-Signature=be5f1f2634bb5e5f57c98804ffd8150d713e2705d9d42c2ca6b85a4266393750&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UGGGGTR%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221746Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIHNqkvYS6zy%2BiZUMwxZj8%2BlMZeStJJG%2F3w%2FBB8RUhH%2FPAiA6Y1LnOTM%2Bkyj5Lr25eKWh%2FBQTkGwX5Bcuy5AIBasTcCqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2FeYCv%2FFSrRcjVwe5KtwDlwjiLCIaweA6ohr91H6HccPPwnm1Bzk8d2jschEAViQh9qmziEJslc9PcEgGmBhQVcg%2B2ZbUbDy7erKlP2%2BDGxNSbK9VgYSaACj5Zkv6COMJEHoywS6qqd%2B%2BC9aE%2BBZkQcJTbDQZz6nU2hbEXy1fAw7Xtc%2FX7dYrGdniJFv2j0%2FEMjzlzK7A%2Fs8oSN4vZs4CgE0D8PTmjFW7W1k0b1McgSasopticn2i8VnbKyQyNTGr0el%2FPwujXErB36rjj0UoXxLFy%2B0JYQTklPmfWMVjn1UfhOw1APZv3a51%2FjOkTGF6olPbm9oXUIsnt%2FGHq5jg9ok6n0xQ2KB%2FABIS2IguS16gGOAoEfI95M%2Fxmd%2BVdMeo8zCDaKcsE6z4NJfQzVMPMhKoiJ6%2BPlldoELpwrybNWrmmkRlK5d2TIKwqNulHxhR7mpubQep7fFtxElJTnhzCx08W1NF0H450v7eWt8fMgQl%2F%2FUCNvtx5ki0CYmMbDdxAbcVsgPIC1k2F5khXpqZ5K4IU381VrwMvqrTe0SVGNmW7MsVfwF0zYuV1ybR57uibJcPilcPGiJ0wv2lsqNzoKtjmshD%2BRv1ra9tEQ03ZpCpGJ7R%2B98SWZE4Q32Mqtz0IP%2Bss3nMYkLVV%2Bow67eizQY6pgGHvqAWHoISXsb0oF7s0Lx9U4CrhOuogR4eylC6CnRhA4Kdg%2F7yhlZuwOw%2B2yKcmRtQZbEauS0gQEskiZhYy0zCq%2F%2BoNhQmJ8SSfDFRKhrfvyEBBrvYIK4mfowaSOm275orJ7cf9cQvVqtuAU%2BSFLwy2ppw3fNWpmynVS4ykDol8vLKRLqDeaj%2B5QnavIkPUeYh0iO2O3RtbM4eUgakyt5Ku5vO3nds&X-Amz-Signature=a311cc683c8d068e90445041df2268ab3fc2dbd3a8b261d40da64e4de280acdc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46676PTOWTV%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221747Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDrHMfWvUr78vrzJbTpjUtKjN5qOX0N%2BKkCklkDfWDIdwIhAOnSW%2FlkhyANaJ8vaYnnblYIcoSEMyJVYysoTbZ3ofM0KogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwGgSstkbwcNwYhkXMq3AOYrcXaS6So63tDNz%2BT4Dpm0trkYMqW9EftLsZmV%2BcbxLFm%2BvqxZNKOcTEib3vQcZYPrCfpb3VyUEBrkHtiSNfMcYxjKWEu%2Fv%2B24%2ByrVlB6ave2bhFySAdkRF9is3on87eEtWmtlXSuaCM8Zhb45so%2B2YKgleZ6%2FhUztQxWm20YKTj4VT9VZbrIHn6PyKJfZgEUfBpLINhFxI5k8OTjMFzagTFxjT1%2BY5YPpPMhBSulP2ToN1ZmvGZ0l3iTsbSHxqEq3Vm%2FqAkhEDaHb1wy55CoyLcjeyntHNDKxf6yQhBhGu2FRjPqYN3E2AYontpjfpl13B0mtsW2v9y7vlUHUNg%2Fa%2By1upZtEMMp0v4sONHEJx%2F2jLYHT7UWaoYvSGkLYg0mXBCrFzACKIwu9sAcg0sMHXteLkaPazobW263oQ6SE%2FLZNsuT04jnjZmcS7%2FSGG20vOnVqiSLeL3i7K%2F%2FI6FXT%2BC5xbogt6WrGIY6hBtdeMY1vcnE0NT913R7EdsYXMy2Jzo7QUOPn3qrhTKaikpiXVX%2FQ6XbDQOPVHYACd%2F%2FktdV%2BW3l8utToPRR1tdnGd%2BsKG3n4MsL%2BKL5lmxGgkltiHu9SiqE8DLkBf27%2B5f4rqutOW3bXaGGvhA2TjDFuaLNBjqkAZHsGtVGwRiarZdqpU%2FN0rxVPUBYxiKVBXphbX2%2Bq4zC1BL%2F9lYBGHOk7A6ipoUDmW5nNhadf3vzAcwaYRoF6NCWE7NYyHzJk4NXC4WCKi19Vt%2ByYfXJs%2F4ggDutVD8SRC%2Ba25IPS54Vl464OIpJIDSSrkROMdFxgz%2BmKmZnSYxnmsJSayqBMFYmsVwD%2B4YSoIi%2Brg%2Bdjm7WTVHL7AaycohNyD9S&X-Amz-Signature=c4dcdb270dd025020981665737dfcb15df4d34298a1eef7c3a4986f2fc70a480&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666HAD7DJT%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221748Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDL1aa7vZA7M4QZiOOkLMzx%2BjLbx0kPlSqShF2VCGvhAgIgBMeJNb8YXky6%2Fon4sTRrVUfnLfX%2FzZAHCwK8eR4N4ssqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOz4%2BZrzkqzKPvmWzCrcAzH9bGcxnlpd5UH1Bp2exAwgH705RTm1Ph%2F0oi%2B%2BYGb2%2FEUVPaBbFpUugafAgI4vPDqp583nKHSIiwvp65Fk6uxKxmry8lJpRN4zSE%2Bmel7yrWMTR54Tf8MuVVQov8YG2ltODfP2BRv8159awsyXYi4ag%2FcNe9ciDQilDSdNMYMsLEUXEA24eettAuxPkWoDehOBnGE0s%2F7T2x9kjE7zR6l2Bi0PPGmFRLrYJAv9hAJBcNcrufSQT3K%2BTpgQaUfbaKCBC1HkMHchTgScQh1lfndlWySJ8VuflXOzQeuVFFpD6z8Lk9hDMaZgb1GT1yv%2FbNfNEyGPm0kYCc%2Fnzeew8HCxIvhqqRP8UhKlcZlZ1kz6Tus5%2FANzDXwDJ%2BMekJo%2BEbCMk3v5Uc7wrq4yjrj3KIh7kAFRueMIZt%2Ba0EW%2BfrYb3IRreQloiGFjF%2B9JG%2FA1hvvumz8It9hMXHTOanKMWgpkoUoyBB3iL4r2h%2Bp8yZF1JK1X0b4FMpCRAl08AxRHn0kjuc1PYsprCaZoIBE2seVFNFh3oJmb5e21GX%2FHM5wISHkN3KDkNiD6bdbmYAju1MFjHBvq1ctdGGyE2zst3VsdyxJv0jG8OmIErTFx9dXGjC1ZxLD2%2BtGDRo9AMMS5os0GOqUBZWdl5G3XZKLcgs9OKVt8ybMvrQ1sfvzZT9%2BPYnERsFhYpdWaE2QRlCGvz3of4nvWB6LUPeI3DmSJTVmdmvhoeZdkitWUZPC7kwRdEStiI1fGc4S7bIBjLraYau9fHgGAHklfQUYIZnhVVeY8S9AAvgui15zn1ldauQU2I3n64bE5RNqd7GWxUY31RRY89oopkQgDJZiwtfX%2FLfC17f6KC8hZVBlE&X-Amz-Signature=e928c9ce0e6033ba3f26ac3c3c9ae81b5f0ffebc660efef41c5187d86f5b594c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XELLQI2L%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221752Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQC0OsZpSPbgVhTVnpKz96gP%2FcBatkwqDkVNK6A1f%2Fl0zgIhAOfPiX4adr27m%2FlGBGBne3%2B83hhzKjL%2FGrvPaIhGIf8uKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzpFF0d0fiTd3te92wq3AMt27l3sDTtYJ7BnQgFiIy2%2FNyiQ6%2BczfLV%2B0UjP0z%2FV%2FSgTD%2BnU14XzaDILVX7sQOeS9%2B5gg3AzWcT2MBs3lKWGawrx0YihC%2Fxc2twGkX6NWn4yilxcGQGaJTPMz2IVmrx4iB6r5PjkgBaLFY080PVqIz1DWqVZZbGre%2BLN5cF2vnnJhRvemWUUzQ0NraJaOClKvk5CxikGO%2B1r1PoPLAoTiScxQV4fK1zJqk%2BHZgvGVdhgiy4X6lRmh3t%2F9fRJPLWLSBRHpF1sF%2FUWbo2vxgoJpDhz19a%2FXQMl2nsXpIg381zxT%2BxMU%2FEIK7K6RwseMUTT3WmJn%2FjceutRb96tpcAN3OMFNlkm9ryBCh16ka2P204Thwq5H0iRPqB3CH6bla0rcsZHS5CKd5x3HyILVZqXc7eMvAxAxOnSuWPhGBkqsyc6LHDXZyKz1ydNK%2FYu7LIv%2BDs3co6xkE6N2Gz0JxNApdOTVg3L5HWdNMUIJ%2Benjl4KNBl3J00rAiEFS5Xv2eJXtcZ77%2BCflWeSHaroplldVZFYEhuSpO5ve9FBD6qszOLsBG91DZumJE%2FrA9%2BCbYz%2F6vE5h9%2FLYKJh4%2FyP9CQ0FG4EHNOmB9jyzaFVwS0ZFFLtSI6P3ee3yKLWzCpuKLNBjqkASulZJjw9GgwQIou2rAlRgLeoRq%2BXL5ljoS7VSiAN%2ByhnNF9JIpisEBjYIfa3ceMlUyTTsf53X7ygNXOzaNzcImPm56026JUfsdm9bOH9NdG7xdERhXbp5zieENEPXlMyoCFtXOjLUxthLHd6RPqJudHixhAFPiqp%2B2nMGUBE0T67ITw5kPi1vBo0OHrmLp4%2B%2F5oNImG1pqury9rLkE5k%2BKN6mm%2F&X-Amz-Signature=0cf46dbe31a73ce7c6dc062fea66deebaaa75cd2b7448ebef16392217c32c214&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN7TVYQV%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwM%2FGzYHC6SU7Xk1DKjkDoK3Ywm7dos2QZ2M3D9CT22AIhAOkHyXbENUu3d%2FY1oNhPtk1wGCQ5TVUsbCIqxiOB%2FqsyKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIvKR2Qn1grvz0VbUq3AMox38rgq9sI3BwSv9k4EoVCg8VF9u10A0eV56EPXf%2FcA%2Bx4HIsFGpNuOJxgOpHc4d9kvudbu3OxtVyni5FEPXuhzmhgsGwXyng24FNH2yxw74T9%2FgurRa2t%2BpjYhEtskPL3DfExe8yzTf%2BFabguJ%2FzfrdqoJWdIHvKf%2BMLk52raGeneP8W4Z0aY5mjYTD1%2F9ecMBGdp90Fx7YPINSjqbju3iS9BMREC3QAqluPD0FZEqEI1uIR4%2FDxu0TYsz5HBk1zLlgbeikMqhdPwOWbWG6I5QXpyQIT3prRZkm47Mp6fX21zxZfbS5BlKT715m2Y7BYH4PjsG%2BI5lN7%2FWiWBmSYg1Y8TyKGOGSwFx72lkhOA3T1%2FEVpBxmC%2BeHk2buq3s7NWYxUS%2FDwcoyiSI44eFkEXzznfXnUG5XodzbUvXcUYw2apWqovv3vQByJTK63WhgZZZVvN1%2Fy5Y2ax7O%2FY1rt8%2FZ4A2qIhU09q%2FchaFX3twm2Me16a1NsAiCSVmeqRk98xUiaycWNQp4XFZMt2PC1tkGCQMO4%2FiyMaJzc6vPo8zlS3IKFevZO7%2BZB3%2BZEwu%2FMEMrTXMUDX9kgl2vyOFJuOU2gqLG5iSOBxGMja4Vv2qVPJHALfI7OL9%2FxwzDUuaLNBjqkAQIzUsDMJ6k5aF%2FZF1ehy8hWG3SVGzv1Z7PxSx9KNze09nydPbPSvyG84KHqnT53t5TqM%2FmkPLkVDVV2nZjy%2B0n1i2uvaBqol7EcS83L%2FTKmGP9zPmBca2WEc%2Fd%2FLJblJgagtIRNr77mK8CMNhujrmLIznswvaGCiafxgxbTnUJUZRagePjHP47jyyhW67IJohOu18eBN1lfYYaQfqsJqvWTDbyc&X-Amz-Signature=cae51620355a3e4d1f4117e3c954400469fc8d178c780c17f94b5dedb6a040a2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZN7TVYQV%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221756Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDwM%2FGzYHC6SU7Xk1DKjkDoK3Ywm7dos2QZ2M3D9CT22AIhAOkHyXbENUu3d%2FY1oNhPtk1wGCQ5TVUsbCIqxiOB%2FqsyKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIvKR2Qn1grvz0VbUq3AMox38rgq9sI3BwSv9k4EoVCg8VF9u10A0eV56EPXf%2FcA%2Bx4HIsFGpNuOJxgOpHc4d9kvudbu3OxtVyni5FEPXuhzmhgsGwXyng24FNH2yxw74T9%2FgurRa2t%2BpjYhEtskPL3DfExe8yzTf%2BFabguJ%2FzfrdqoJWdIHvKf%2BMLk52raGeneP8W4Z0aY5mjYTD1%2F9ecMBGdp90Fx7YPINSjqbju3iS9BMREC3QAqluPD0FZEqEI1uIR4%2FDxu0TYsz5HBk1zLlgbeikMqhdPwOWbWG6I5QXpyQIT3prRZkm47Mp6fX21zxZfbS5BlKT715m2Y7BYH4PjsG%2BI5lN7%2FWiWBmSYg1Y8TyKGOGSwFx72lkhOA3T1%2FEVpBxmC%2BeHk2buq3s7NWYxUS%2FDwcoyiSI44eFkEXzznfXnUG5XodzbUvXcUYw2apWqovv3vQByJTK63WhgZZZVvN1%2Fy5Y2ax7O%2FY1rt8%2FZ4A2qIhU09q%2FchaFX3twm2Me16a1NsAiCSVmeqRk98xUiaycWNQp4XFZMt2PC1tkGCQMO4%2FiyMaJzc6vPo8zlS3IKFevZO7%2BZB3%2BZEwu%2FMEMrTXMUDX9kgl2vyOFJuOU2gqLG5iSOBxGMja4Vv2qVPJHALfI7OL9%2FxwzDUuaLNBjqkAQIzUsDMJ6k5aF%2FZF1ehy8hWG3SVGzv1Z7PxSx9KNze09nydPbPSvyG84KHqnT53t5TqM%2FmkPLkVDVV2nZjy%2B0n1i2uvaBqol7EcS83L%2FTKmGP9zPmBca2WEc%2Fd%2FLJblJgagtIRNr77mK8CMNhujrmLIznswvaGCiafxgxbTnUJUZRagePjHP47jyyhW67IJohOu18eBN1lfYYaQfqsJqvWTDbyc&X-Amz-Signature=317d97e9787ab6ada6d44a8fbde253ef66d4298bf08c2dfa74be3f430402bdf1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XRMQAG3W%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221739Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCvfxjbAneQ%2FsT9jtMShZ7m5X09J08mncyS3h7W8fE%2B9wIgQwKD6M1noCAL0g5eZivXF1BTVyUHSmRK34nyym0PrYsqiAQIvv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHiehopmXngMQOg7gircA3CqvcIayqyxu0b9dUulLBpGeBJk7JonGLzyqvvbJLila6nhjlVrNe0PKWPmxf6Vyg8hIsLUIv5PnP2s4B8OVAPn49zptm%2FwwdEKAPQVbv9%2BT0U%2FrSAsRwGFCQyk%2BFpJLPs1tC0dJXAZNK1zqhdjvKbctZgmxxzTs%2FT4v5ByeYtGUZQwjyiheYbq3AAsms0BSMdwlZYSCoZaelR7JIl3uvgw2x2qWuOrjWeB5DwEWwc0JSexQ%2Fb5chi97QHVr5zN01u6aXHGsDTDHJzPtt2ZwU233vaBRy67vjMFeXeeg6k07iBJ%2Fx73q5G1gnBlHMBQSRthnD9yMayDRdoLCglfUW3DcLNVVFs83tbXZE8Hk1wK3grQSnEJ%2FkKoxMbbPtZdqm6%2BMTXtVeKSlde9AgFN%2BctPOW9MrKUkjC7NEb%2Bc0W6tCb8lH%2B0TA8ynoN8aXB07%2BXVdmO6hAhaQdL40AZA64YOLVNe1L2NmbQWraZ76ebQJlxTdoxqX%2FcG4ogTzGBeX5u1WWMbcgQSYBHXBk6p%2FWW1gk4Fh1jjZuNG3sj6IHREmH%2BMN3xjI7njhP4JmnYxiO%2BsQULoei2lcbgIElStiBQZlL2MiGMyJRdZrDQ0V6MluQclrjfY40%2FBCiRBOMLK5os0GOqUBFY8A11fgRhC8%2BMolYXCsjxhLzAmaqRObolQzdiB6xDeCINKKvKwPeTFJ%2F7zVcusaTXiRSFXow9dXiU6148saO4HKcC3J5qnO1rDrrDCFu%2BTl7Bb0euA9vhc89AtHUdLXD6xRnXl44ZGrYlcjJptcs8AdSpxW%2Fx301XMtl1i4ta%2FGWn7TXjoDV%2BIT4o9w3oG37a5JI6akNfhIT3MZjl%2Buuh1FY1M6&X-Amz-Signature=73d0e025b8731f077dfd34bc10b2bcc94ea6bced5630b61ed3f3f7cc972f0df2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPA7CFKE%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDELCWd186hGuB4aRj1AMcU%2FX2HSYrg1tOu97Q%2B9ED5iAIhALmq9mU54d3n9TO0qetGn7QAbrvszuvBXtYRliZyjXVmKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwM7AjmngH%2FIDR1k2sq3APOZnZGAuTVVz%2BshhVNXssiF8J67xpm%2BtdLC183owy4969XtCWkyHLj%2B1jcA9XEWhOV08lz3m1UWk8O%2B8qemPkcz9zEmmFVdN9pvd078W48PPvfPxsByA3C3xH%2FWJsqLLo0XfRWxnkrOOAB6htdcxNODgN9OQ1C48E2KrWvadXVy9ds8JjMuAKTe979DBs7xIoLOBGWhs8mLE7Qdc6GMjRTWH8DAHGjG2DlOHajAwmCUApIbzN7d%2FN9pMZalO9N9hDLONE4tF3w7QveICcABikyNxOHvXeDggdKdTS9ESMRJCoiglbi%2B3EAbuUdKUz%2FyquGJ3Z0BiySnOnoiKFNAt7rrAP%2FBTiVy2LeOKsvgTNZfR2uXYL0tS2TVWfnlsSPIM4qg8NfRIWm%2F6mJnoFxLjMU3F7EI5xO29G2C9xEtt1CPMFju8zaF93CxR4OEXvh%2FV89ozs%2FpSWnb7OhOoG0jm7Ab6igLT2o6NdNFmBZxvHlIcwirNuDEZzzh5xT%2FPn4s6%2BcrMlF7Ulnf1GmTKUWgL8RQwIWnppSDU58YyertJIajhKwxKAb8nKyTIxk7peokIWAiZYUvlp4YlRXjLakG2ID2zL9y7MQac6AUkl%2FYMQT%2FX7v40p4Byjj%2FsfZBjCfuKLNBjqkASaJMOweibH8GimvWB%2BWtcXoy3gcSuDR%2FEsPoa3ew1fyjZFbOSnA5kYOTk91zFbq6g6QZpBHHXuInAHH2WgrYLoV9%2BAE0shP8pCm9YTTp%2B%2BAAaVA%2Bgtd8ZGDEVxATOZMIIgIPwxiccORofooUTlSTo0L1M%2BKF9iV9aot%2Fj4Soy%2FQkC8OkSwo2ssNjqbXfO9VJLXriIxdBLg45hNhHAciZZLpV3fk&X-Amz-Signature=bdfcd008acc9bb923972c30e1d4b88715e7336d1acf573a9ff95afee385387b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPA7CFKE%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDELCWd186hGuB4aRj1AMcU%2FX2HSYrg1tOu97Q%2B9ED5iAIhALmq9mU54d3n9TO0qetGn7QAbrvszuvBXtYRliZyjXVmKogECL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwM7AjmngH%2FIDR1k2sq3APOZnZGAuTVVz%2BshhVNXssiF8J67xpm%2BtdLC183owy4969XtCWkyHLj%2B1jcA9XEWhOV08lz3m1UWk8O%2B8qemPkcz9zEmmFVdN9pvd078W48PPvfPxsByA3C3xH%2FWJsqLLo0XfRWxnkrOOAB6htdcxNODgN9OQ1C48E2KrWvadXVy9ds8JjMuAKTe979DBs7xIoLOBGWhs8mLE7Qdc6GMjRTWH8DAHGjG2DlOHajAwmCUApIbzN7d%2FN9pMZalO9N9hDLONE4tF3w7QveICcABikyNxOHvXeDggdKdTS9ESMRJCoiglbi%2B3EAbuUdKUz%2FyquGJ3Z0BiySnOnoiKFNAt7rrAP%2FBTiVy2LeOKsvgTNZfR2uXYL0tS2TVWfnlsSPIM4qg8NfRIWm%2F6mJnoFxLjMU3F7EI5xO29G2C9xEtt1CPMFju8zaF93CxR4OEXvh%2FV89ozs%2FpSWnb7OhOoG0jm7Ab6igLT2o6NdNFmBZxvHlIcwirNuDEZzzh5xT%2FPn4s6%2BcrMlF7Ulnf1GmTKUWgL8RQwIWnppSDU58YyertJIajhKwxKAb8nKyTIxk7peokIWAiZYUvlp4YlRXjLakG2ID2zL9y7MQac6AUkl%2FYMQT%2FX7v40p4Byjj%2FsfZBjCfuKLNBjqkASaJMOweibH8GimvWB%2BWtcXoy3gcSuDR%2FEsPoa3ew1fyjZFbOSnA5kYOTk91zFbq6g6QZpBHHXuInAHH2WgrYLoV9%2BAE0shP8pCm9YTTp%2B%2BAAaVA%2Bgtd8ZGDEVxATOZMIIgIPwxiccORofooUTlSTo0L1M%2BKF9iV9aot%2Fj4Soy%2FQkC8OkSwo2ssNjqbXfO9VJLXriIxdBLg45hNhHAciZZLpV3fk&X-Amz-Signature=bdfcd008acc9bb923972c30e1d4b88715e7336d1acf573a9ff95afee385387b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WWVL2QU4%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T221757Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEPX%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC%2BRBAH0Th59UlL4oIedhiMOakGJNOntZfL8KACt8VJ0AiAZ5ltuLWA0uzI32ss8SssTzJrOQxtB25obO6XQ4%2BAUCCqIBAi%2B%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMVtYEo5%2FUO0roFthhKtwDGsnLuxoH6MzBcgDcgolJxsihTr20m3lgQyoS%2F5QXyrKJ9yf6uQFaiAWpoSJwbKn0S3aKzt%2B7689sia%2BzKSXBqPoo8Q%2BWMX1KXekdSYvjnkICGFIEA6FLu%2BaKGj3HZ3ERH8n4k53hSIQTzIuUnNRdRBLNNrRfwskpPxKFQ%2FfSqOkUJxxifUjLVeKzpt91BajJ%2BT6Q6dF2hmFda6Pcl6EJWI1IY3wGTXE%2BHW3OiT%2BjpMsp75IjMnuP3dF9IqaMMONEkSnD%2BoE3ufqE7WaRbXa9FQ8Rijcjtgm%2BcHFjr6OLKTaL4LwHZ%2FBXCIfeTLqT9QgPREhAo2eonhTrb4QtCIsOg6qKPPKnS2jOeMPyW4sGQEGBLrwttY0Rie65F4GwgUWk5IboZp0o7cm5wDZrGYnao2ddJ93dMi0F2EMvV4VO0aiwY0h0sHMxKD6xiiBOLOmtAepL4W4moSYCns2SlbkHuYhOkrQ8%2BCucVWsUOFkM3cALUrocU8CEkVm8HpzPfJvPYC01i5kExibhWMr2OCxwiPpw%2BDnVNKG4ZuihzOFGpV3SvJJwW4Rw30OSig6Kth9glW1dLBcppWUnOrxGMvwh4%2BInu2F9yZX%2F6xiEI0pH5fL13ov%2Bc4z9pP8z2hAw4LeizQY6pgFS7Lw1ADVo9nuI0DBU3cfouOfRFj6kbiM2x8drXzhKV%2F78whb1QcTWqAI9RYHAGEXTqd8z6EhwAXNq%2FGpNc0%2FT5m4PzJBdBGDUV9bfnsQyQXfzxmMt27DGeqN4M3OBKenGxX%2Fw1nXyQiHPSAhGPawOfjjIx%2FjAyMeD5dTTEknzVZnuTZTMy2TMgPzFPnmAoYFkXtIsdT3mXVhwAjaoHu%2Fl4y76Keu7&X-Amz-Signature=415de31a67936b5db6ca428a3584fd7392bce9c2f5edd51244a645ee7a8716d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

