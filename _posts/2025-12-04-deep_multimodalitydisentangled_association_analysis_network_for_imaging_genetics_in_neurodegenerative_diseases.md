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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MRAT5AU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCH1v4Lt9f8vGDCEJkczEEqBriarV69vyiNg2AdMffpqgIhAN%2BESmQRAymmvw6xIRfu0wnsLaj0lTvi0xMlRFf%2FaW6wKv8DCAsQABoMNjM3NDIzMTgzODA1IgxEWIPN6BGh8VeqpAIq3AORdBfa9zCaKoMdXzbexQ%2FMdYbB9cZVyT3bLorzghfF%2Fama%2FwYDquCa8R9JBzhWLoOf0mcYiBvnFJYnaNY6zgIG1Nrn5OlhD9BXdspTFxMzu7mAs05Ne5DS8zd3uGBMeiuQwAaaSNaIVYv%2BYIxzsd%2B0B%2FTwoRu4zFdK8Ei5u5%2BSZjJeYA8SL8n36LFOTCQ0pfjZNhc9agfD3ZVy5utWjWJVsYoznFRE3m%2BfkSdmRLFuOb2p6Y4xoFa6q3yhwAK6IPllmMWkKlnzeU4h28fDcQ9smcRKLaE4Jzxx3UATWH4fIoygon%2FX%2BoMdS2gUNfATYoMzqUDWPoMbikgl1RnKdFOmkMLVJBErHlKoV4gyQb%2F%2BTfbPB%2F6pKBfJKj6zdKXMIHaT2vGZtKyE19qxIsqF933aiKLNma1sPf3u5UdOA9ezTL8Igww1vYPafixL9j%2FZg%2FvMnphI8asbD4ZJxTyOMs7EiMbpJ5l5paW27HCKXa%2FR1zl8qa6FabsXiey5PjWmCyNs3wHEzwd0WD9dQR%2FQJn9mKwJZxPdFx%2BxNKpQQ7KM6mwn8wufkXGZNmRSnOc%2F0IUCwwrpo%2FpW%2BAaOsm%2F%2BQsti3kScQC74RrjMZDAqijokk7IhAjXK913NU8CIrEjDZ7KPOBjqkAXL8Ip1z%2BhNgdK%2FhQGponZhHpjpMf1JuiZBxvkYqSWVdALfQkscU4humtUc3UOZWZoKORV5orYQYGYdwUNj1N9Yxu4OQ98QaQu4hvMRiORSYzdjMfzkaHZFdlplJddszCuXyZjCFwMbuihI8TpQQ7yII5gPJVbh04ivXfG5QUsHqh7%2B9vyYDeDZS0Zsx3KroKwLHjgCQkHefVrA7WjlotJfmEpqg&X-Amz-Signature=d522235f467b13656d8066a59a75c16104e6828643a7ad8ace5032a201cefb96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665MRAT5AU%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQCH1v4Lt9f8vGDCEJkczEEqBriarV69vyiNg2AdMffpqgIhAN%2BESmQRAymmvw6xIRfu0wnsLaj0lTvi0xMlRFf%2FaW6wKv8DCAsQABoMNjM3NDIzMTgzODA1IgxEWIPN6BGh8VeqpAIq3AORdBfa9zCaKoMdXzbexQ%2FMdYbB9cZVyT3bLorzghfF%2Fama%2FwYDquCa8R9JBzhWLoOf0mcYiBvnFJYnaNY6zgIG1Nrn5OlhD9BXdspTFxMzu7mAs05Ne5DS8zd3uGBMeiuQwAaaSNaIVYv%2BYIxzsd%2B0B%2FTwoRu4zFdK8Ei5u5%2BSZjJeYA8SL8n36LFOTCQ0pfjZNhc9agfD3ZVy5utWjWJVsYoznFRE3m%2BfkSdmRLFuOb2p6Y4xoFa6q3yhwAK6IPllmMWkKlnzeU4h28fDcQ9smcRKLaE4Jzxx3UATWH4fIoygon%2FX%2BoMdS2gUNfATYoMzqUDWPoMbikgl1RnKdFOmkMLVJBErHlKoV4gyQb%2F%2BTfbPB%2F6pKBfJKj6zdKXMIHaT2vGZtKyE19qxIsqF933aiKLNma1sPf3u5UdOA9ezTL8Igww1vYPafixL9j%2FZg%2FvMnphI8asbD4ZJxTyOMs7EiMbpJ5l5paW27HCKXa%2FR1zl8qa6FabsXiey5PjWmCyNs3wHEzwd0WD9dQR%2FQJn9mKwJZxPdFx%2BxNKpQQ7KM6mwn8wufkXGZNmRSnOc%2F0IUCwwrpo%2FpW%2BAaOsm%2F%2BQsti3kScQC74RrjMZDAqijokk7IhAjXK913NU8CIrEjDZ7KPOBjqkAXL8Ip1z%2BhNgdK%2FhQGponZhHpjpMf1JuiZBxvkYqSWVdALfQkscU4humtUc3UOZWZoKORV5orYQYGYdwUNj1N9Yxu4OQ98QaQu4hvMRiORSYzdjMfzkaHZFdlplJddszCuXyZjCFwMbuihI8TpQQ7yII5gPJVbh04ivXfG5QUsHqh7%2B9vyYDeDZS0Zsx3KroKwLHjgCQkHefVrA7WjlotJfmEpqg&X-Amz-Signature=d522235f467b13656d8066a59a75c16104e6828643a7ad8ace5032a201cefb96&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YIZGS4ZK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134228Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDCo%2Fjs516Rvhu8hL63yDfDCI7HUjTPWtI%2FwT686sbvCgIhANpYjt2yCPm6e0%2BmmJwhCVhsxeMFsw40veRMYJ68pZs6Kv8DCAsQABoMNjM3NDIzMTgzODA1Igz1DLQ%2B1WX5d8sXtfQq3AND24Tzvl3%2BwLJNDhtUVZtrPvoMgfjs9v5WSnEn1BheKvPs5SDrCucxN0ZCAMdDy1bAqcwZQ%2BIdVTH02E6dLURV0KsFpYUkKoNRFeQLu3yGJjXxD8UmR9HCmv8PEMxDGwBfDIax7zRQ1b9PSi6o1aLSRWK8wEiieRLbqhh%2FAqBUaeWZKokIIAVj5Yl%2BUz5Eix7Keol5F2RqPiFmHfR6499ou%2Fpw5mMFR5naX15mQu0ffD719n1tTp8CbzML4XrWVAg%2BoB0GxqY0kEBRYt1MTszeZ6bH294bfs80eWTDUX0LP04gjexlOZHQO9j%2F3nFLID9sI2AA2LHFSsUfYpg9AomdRwQrt0%2BiP53fgo8QZ3OMnD%2FQY3kCD%2ByMaxuRoAaMf5SqlW9lo%2FMibPQvQbaneJ4w0JTJVVukCjhFVU3cCNWTph1upBX4ihXsJoed3FCOJFpVctEMy20cPiKdxd3exg3OB8yyzT2mpEEkBeZFgMYDZOe8%2FHybIilc90nxG4WIX5zUM4BjS6f3hBj4scjO5t4YxN6SgHI9mGp7ywCIKp8udrFTftI4ufDLJir8L%2Fa%2Bb00Ek1TcfF3xQnXtxuuBoJvC3TEqJuQNnFDSTtxn3ALYgPkzV3gjvGF3I04cvzDE7KPOBjqkAWcwYj4QcTJ0bkzjjY9PZeKB7nFOWsQxJYDSIAumJtmbZIO4V254igf74kH6fhAYoTWwtT11wuVd%2FU1YqnLdZbhWqcXJpeC52RO59Opij69PrIFQQuXtFx1gijjqWMoB9jrOSryWIprILLnBdTHkaELbmiIIvNI9OySnjGML%2FUpGv0CpPVgMcevJhODoWVJAyAG4F2RZpdtbKt2awSYZPtpEFjID&X-Amz-Signature=55e88b1be1ce8650eb4e9749833e800f3e576eb46475547964a6de8e95372a7e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666J5D3V2J%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDyS4s%2FKktccvHpZY4kKWMI%2B%2BOFKnUt4mnscyun4K6bAgIgErfd5F6XbDkxN7YPU%2BaLxeYbr2CQDqpB7m3%2FKkaC53Mq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKHcVukAD%2FpIT%2FGp9yrcA4iPTLQ1mNHen2x6cg9ZKLgbMaieiYPmXJSE4cjwefg6AMmZimocIotqkjGw9j%2BBoFqYmGJVOAqEF%2F33uO%2FDv3ujZamNBaD5VH6Pe7Q14WgTVzoLpMGpYeiQ6MO%2FkeX4SKGIKHX%2BwDP2GYrfO1InzJJhYQ8%2F23Dl0L7eh5NF0CXJnYKEKm7VNLu0WjnBePIXGb3LddgWPJShYn4F26EwLqPxf804rZe7P%2BeU48m9kPtszG3TAFQW7IJPzW71nOV9w7iKrZc02KYYA%2FnlSTGXgfnahosgwM7qXsYBaXhN2fiu9VPcay1QAew9aElUAmdgcbsI%2FNsuqX2YCaYl9k5qMQKQo4siF7Nzs3zo%2FHx7e%2Fuygaafz05Y5CMW5DLLbT%2FpzsxSqa7gE%2FwRyjqeY8qysUxxz8uOEOsMMcJwCtJrKkzJN5BDau3f2UmBVqCo6DKLMnqzIFw5tqpjaG8qcvkwlbqMhTrXxy2G9%2BUxslCausA4brbmelCklHIR8aERAFtdTrAsZVF5wqmwjhjCeztro7KcB7iVt8PzleGOEAJ5AqF2Fa1osnv%2BOw3eNGMA72YSfmi8yt9qUd9r75T%2BNlZC3i3rsFkYbSz%2BrvFPZYOmIknHCX1p%2B6PPJQKlRVYmMJK8pM4GOqUBIiPgeXDc2YyWLtzJFmmuD7vy3Q8Q4wdwkfPRsNBloQWPqJxXtrHxEEXJadsYRrwISku9B2a419Tu7NdRBBS%2FArOLtUx123u0yfLRHPGQRjvr%2BVaewInmwkBj2V2z239A4b6jB7kbpbkm1xzo5rfexJ%2BYyT%2FwVjCRR35PIC2elYOwI239yNvGMN4xvAhGglVKCaUw2sJfUL9I%2FXKpde5deWH%2FdE%2FF&X-Amz-Signature=5707b7cfa902fb1f8f91663846f1f5ed8b9fc076701bda63ade9e5ce344751b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666J5D3V2J%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEUaCXVzLXdlc3QtMiJHMEUCIQDyS4s%2FKktccvHpZY4kKWMI%2B%2BOFKnUt4mnscyun4K6bAgIgErfd5F6XbDkxN7YPU%2BaLxeYbr2CQDqpB7m3%2FKkaC53Mq%2FwMIDhAAGgw2Mzc0MjMxODM4MDUiDKHcVukAD%2FpIT%2FGp9yrcA4iPTLQ1mNHen2x6cg9ZKLgbMaieiYPmXJSE4cjwefg6AMmZimocIotqkjGw9j%2BBoFqYmGJVOAqEF%2F33uO%2FDv3ujZamNBaD5VH6Pe7Q14WgTVzoLpMGpYeiQ6MO%2FkeX4SKGIKHX%2BwDP2GYrfO1InzJJhYQ8%2F23Dl0L7eh5NF0CXJnYKEKm7VNLu0WjnBePIXGb3LddgWPJShYn4F26EwLqPxf804rZe7P%2BeU48m9kPtszG3TAFQW7IJPzW71nOV9w7iKrZc02KYYA%2FnlSTGXgfnahosgwM7qXsYBaXhN2fiu9VPcay1QAew9aElUAmdgcbsI%2FNsuqX2YCaYl9k5qMQKQo4siF7Nzs3zo%2FHx7e%2Fuygaafz05Y5CMW5DLLbT%2FpzsxSqa7gE%2FwRyjqeY8qysUxxz8uOEOsMMcJwCtJrKkzJN5BDau3f2UmBVqCo6DKLMnqzIFw5tqpjaG8qcvkwlbqMhTrXxy2G9%2BUxslCausA4brbmelCklHIR8aERAFtdTrAsZVF5wqmwjhjCeztro7KcB7iVt8PzleGOEAJ5AqF2Fa1osnv%2BOw3eNGMA72YSfmi8yt9qUd9r75T%2BNlZC3i3rsFkYbSz%2BrvFPZYOmIknHCX1p%2B6PPJQKlRVYmMJK8pM4GOqUBIiPgeXDc2YyWLtzJFmmuD7vy3Q8Q4wdwkfPRsNBloQWPqJxXtrHxEEXJadsYRrwISku9B2a419Tu7NdRBBS%2FArOLtUx123u0yfLRHPGQRjvr%2BVaewInmwkBj2V2z239A4b6jB7kbpbkm1xzo5rfexJ%2BYyT%2FwVjCRR35PIC2elYOwI239yNvGMN4xvAhGglVKCaUw2sJfUL9I%2FXKpde5deWH%2FdE%2FF&X-Amz-Signature=d688334dff62e3e48a74f6ecb81973f060516c78ea304f3d3268e9fa9bab4833&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VGVRYIWX%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134230Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDsMaH8KKNJuH3rUJpbbs6vrjYfARPHhXEdFKtRXYUNUAIhAOiAN5LvqsaOIv0KA%2BKjSI8d9EgvssVzTJCFTeRciiYZKv8DCAsQABoMNjM3NDIzMTgzODA1IgwJPmwXQkyB9hpdAy4q3AM4w5Q%2BtbiSCphA%2BmH%2F1olDcb9Y8eMSDzDWDkwbwHyd%2FE6HjewsyNBxFNfdiHljzwbXoKkBHvbcTuDR1LRAq9HtL%2B4m8r7f7EFoFFp%2B8Iger9HGFbJSEJnB8h5lXusq7ShiclMly0oDxdxVgCB9jpy1joUwN4FiMMBs5Mq%2F05u83bM3rF73PHpO9YmhcKRYZEo%2BxA5YAV6Xzhr1N1LhPOpBnY6wLSwJuDdxwOYEOcqZfbVz74b8F5sBWQ4v9K6Zn5qpQyU2HlYNGkaW8SkfZ2AkYOrCmk1oYI5%2FeYvyo6iFIFgFUoQrNtbZSS0S3%2FKF04htJZ0h4MeDl1%2B02El1xoI4N48ZpvQ74IhvfugwnmkcOiVwMjVJO8Nibxud0QrKjI%2BN62ZVhO6R06agypLC9vI6E4c0Hfmuah%2F5fuYNizJbUyD2iRzKRXVGxHhURbM4W%2F3y5ctsfXS3v%2BNeBEGqfmRW9eKk%2BcC9EEpDOAosdUUkXscBQkQ%2B3rMsjOtOpV5S0kEyUkabMzDyOyAAs8l9yZPBDv295usjEwOLD1Wa9pMuzWXnA8dHoCdCV1qN11ThrZ2fChMyyCjhvWN5rP483QkxSyIePWfroSLPDtguRFVZEn9GQbaAXl2cFjWtVzD07KPOBjqkAULXyziSQ%2FF3cJGl8hOns7yzzBLX0dyg76NMxUUZdRLeFmNtamxYxuNqsD7w6pukYWuxC%2BXT44xYT2RNNubQlN2mAqAZtzAh6pLI6akQnbdt7H%2FmXFkPM50bPJlU%2B8792jctzpX1DPF2%2F7Lrf4aom7qZBTX3Yjw9rAGB%2Brp1ztePpgObDTp5N39zg7YyMm%2Bm4dW9%2F2U14865IR38obpA%2Bvis09hP&X-Amz-Signature=0cd4d9e60401fca1dec00b28222c8404c29a2459f2ef041d6bb6f129a36e60ea&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMH2CWI3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134231Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQCGEo7%2BULuXjUc9vC99xr4AOdYWIkdVcda6BBANc3phpgIgHAae2qEOZU1B33Qj1s0zjXX0s9bZz1%2BxV%2BztL9EUR50q%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDB%2B5Vtkmhk4ArlTxGyrcA5PLuqL5OMJsTEgpw3jq7V5TeA%2BPI0dIDGya77K44L2q98gTyqf0Nz2frnf2Nq45Mf%2FXOg8d4C%2FtXprb85%2FI7GKb9sn5rXR%2F6AI8jD5oZVIyCS1tiLXMXLXW8%2FimL5dDwoBUYzMdv2bGoTSeTRYkw7b%2BEsd27w%2F04mu2wy%2FbBYnuS6lrEN%2FH%2F%2FgAIAul0%2FNrli3opayDxWrvnnghMrog3av7rdhZEujR8aW74K6Lq9jy2hzsEUM0JgsG0MBnvs2fMep03zcgBnVx%2F98h3nj%2Fw1exZ3UmLGRivb4mJlhW7%2B6iPETbSMMHHdMABexpKXtHof4EC7%2B0dWyKd6FReCrye7MWO7CEGrPgc%2B8ZYDXLKbrqoeCO2Y%2Fn1SAtVBoHkjfdL7KziB7Ow0mVp6TexD5pKz0Irc29iVdGQzeDVqHnYPgru%2FPGYb5ERmdXfXjrlrKwjWPkUX4Dzin7%2F1phpZCC6g8h6EVFgnJ7D79CI%2FoRqAOMOJdNmFkHmZTZvi26qWRhwkdXhbsCSjnJX7jmYDCJ0jm9PvEDN7A46FOj3kI1MLrEe3wenff%2BvwyQltQd09YpjQ%2B2hHuc%2FQTq%2B6QjruUBpcrxPyOAPv%2FXxZ%2F6c34Xfnbk4q51gohJnjLzPCIdMK%2Fto84GOqUBku29q9uySUyPUk6U9uSflb2e4VV4JsIyH1FG7b%2FYj%2Fyu%2FBTjb22dbpxztYlJw4aLDIrPEMQMFhC1NwOeBiNbNoaH0plNSaaLbtNS3f8MU39Qz6NVy14WMv84bSU0zwYZICSNQ3csLNNyAD97BIYPCvaOt7usfZ6oeagvLGnX%2FQ0hTc5stRfX2bsfh0qrTe5kt6al%2Bl3CrhVdxKXWapCousXx5Iwc&X-Amz-Signature=cd75f0e4bb3096d779aaf8ddaa5df0b5774f130a3e16bc79ed35484e49a66b03&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666B75HJOF%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134234Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQCiyA9IpVf4%2BdwuX6VzN%2BQnPcVlGraFvU%2BM82nhiQYUEQIgGTFNwtLQoiyps3Yf0jTWs%2F4UsTBUlkcPq9OZfhtZBAkq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDNz3jCnSeJAyYQ6H%2BCrcAz8zRrdbyKQMEPIBXXUfwICU3IUejjYNed4p9HZKZB%2BitImEuPiQ0epXxs2YKfHBRQovRB9z%2BH3ACyBIYfORUeHG7SyKo8RYVVy1RnWkbai64k%2BDymjUmU6Vp0Bo1hNx2JJpKP1GBs%2B7%2FqSMa3pV1vVp4bjhvNHPUn29cU5VK49Ko1R9SBP%2Bsz0e67e%2FDFqghlGep7U5%2F7zKEe%2BeCd7digv%2FPe8UvnzTukA7BpMv4YqqHgwNRFmOjl3DJi9%2FJOsKPpbS4V1ViF4SeWKSnV21HFKc7V1YT24KLV3V9d1YAoiPd26E81A5%2FgCfGR6VC809QgypeNAXOGGpC7mPrnKcKhbtksTO%2FdPSfMDE%2F4tU1HtkQN7XkKUL5JwdoZ97ER0IlVphuV%2FGwUNaK1YJhuss%2Fw%2FCuc7a3oececkJUjHIVrdEmAqWsrCObjDeYSn5dmopayV56uQiuowOAZDUX1hKNUAryDgPpzp7lho7v7jERxntPoAOS75FlmgxrRVzpv%2B5GN5F5rrHdwdtjLtiS2QUb5EbWySlH2JDK5Y3Ee1e1WvAn3QerS%2FbgB%2FbyfVtw5BoEAKXs52pj5Efo%2FoQNbhCN2Kkfi4fyuKZPrz18VE3pXR3OC7wJVOZboT74BlUMO%2Fro84GOqUBIGWysg0M00wjF8yUKvFKI21KwrkqbzQo4POYxQoemARZ45HKJO%2BBTnrBnHF%2F35d6z5B0APvfDhRzcnJSLhHX3qceS9q%2B2Ap3yrV8JAR%2Fq%2Bcrz3RLRmKcCjjwsRL9icnINR7ekJCFl8eK7wT9jRNxfkD4F8XfdfBqA6aOsTbsVTgOI7sNooq5%2BA5gUexuIAZOSxguDJjYmKYuwHZI3V2L5pUi1nlr&X-Amz-Signature=14dda14862f23e449bbc606d631b9a260dbb8c8d387d45e593dc69b0225f97a0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667R4ZMPPK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDDY227p4jCF6kfXSV96oqRNupky7IO0Cecd1eXSpfg%2BQIgElTi%2BRYGrVx1NTgslJK6w%2BHslIIJCU0JR1XuEb5KglIq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDMVeuoZYRET1q2pb9CrcAwLpKNhtuompAdXGsBWt%2F3qzDGHCS9acV49kCgyRI3ux9Atlyd%2BU4tzBFJnPIFI22tOhxSgOCDPltDfx9si8%2BrrP5SDNQairIczNP93dw4AQH337cTwN5CtuXKwwsLfTDPwZzWzjVK8PAxOXH6ygqgNwUp%2BG%2BTIBntDTC4EasZakoFWZQKPQZHWwxS6DbsrkvWj1vWTBUlRniOVITgvPIwNGZ9BOXb2IRXJ%2F5w833eTPjBjFEh4xixQ0PCXOHLTBqASh3umcDDkqh7e651RiZMuMSajSEuPMJrfntLWeTS0MT3%2BbvhbvxX1Lo3FaqwWmwqOTf2W3QPvvbWa9qCUpoET1scOJXXflwu8M2g5uS0fHW%2BGo35gSsoHDhMpCFHXvWqLcqS%2FBHks3Mopt8DIDGsz1tzR5o%2FJQsQ6mX4Oo90pMXIcnknSo8QuHStnoJx3Fexk1aYRg6rNTY%2BtGM%2FCSEaBSzvIOWbjT6wcaqYzgOQ%2Fl%2B%2FCvs98pKClWYfjYs3COJW61RC%2FeNCto1mquk9GA%2BrLC693vhNPA7Zru5j95osTDRR8F7S%2BM%2FsK0wYshQT9Luwnos9lZ2dBv2S6dxx9uHqESLrF2aru%2Bly6ZH9MCqPz4HfGri2pfoxMKmbsjMKTto84GOqUBHrZiaxlFn8kTzq9tAiB5ajSCTv%2BIgnJkJ%2F658leKBBZBJ5gcKi9juyBBOMN9c8ipQBgOtsn1rY2j60ATa1yOgcAmfoeLUVoWDSRA4QzqyGxXFpAnrLph9W0oqF%2Brm10t%2FNbU1CrpzmpC3HfJLgvf5GlkNPZN8HkN7N7ViiWJBVSVnBUQ6piIAsiieVlaSBq7qZBKZDOtLUEFF7vtq4GeO8OlVtgg&X-Amz-Signature=e3cf20a25e819563e631dfd0c0a00bc824f19fde453b08d40b22b8078d1e1219&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667R4ZMPPK%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134235Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQDDY227p4jCF6kfXSV96oqRNupky7IO0Cecd1eXSpfg%2BQIgElTi%2BRYGrVx1NTgslJK6w%2BHslIIJCU0JR1XuEb5KglIq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDMVeuoZYRET1q2pb9CrcAwLpKNhtuompAdXGsBWt%2F3qzDGHCS9acV49kCgyRI3ux9Atlyd%2BU4tzBFJnPIFI22tOhxSgOCDPltDfx9si8%2BrrP5SDNQairIczNP93dw4AQH337cTwN5CtuXKwwsLfTDPwZzWzjVK8PAxOXH6ygqgNwUp%2BG%2BTIBntDTC4EasZakoFWZQKPQZHWwxS6DbsrkvWj1vWTBUlRniOVITgvPIwNGZ9BOXb2IRXJ%2F5w833eTPjBjFEh4xixQ0PCXOHLTBqASh3umcDDkqh7e651RiZMuMSajSEuPMJrfntLWeTS0MT3%2BbvhbvxX1Lo3FaqwWmwqOTf2W3QPvvbWa9qCUpoET1scOJXXflwu8M2g5uS0fHW%2BGo35gSsoHDhMpCFHXvWqLcqS%2FBHks3Mopt8DIDGsz1tzR5o%2FJQsQ6mX4Oo90pMXIcnknSo8QuHStnoJx3Fexk1aYRg6rNTY%2BtGM%2FCSEaBSzvIOWbjT6wcaqYzgOQ%2Fl%2B%2FCvs98pKClWYfjYs3COJW61RC%2FeNCto1mquk9GA%2BrLC693vhNPA7Zru5j95osTDRR8F7S%2BM%2FsK0wYshQT9Luwnos9lZ2dBv2S6dxx9uHqESLrF2aru%2Bly6ZH9MCqPz4HfGri2pfoxMKmbsjMKTto84GOqUBHrZiaxlFn8kTzq9tAiB5ajSCTv%2BIgnJkJ%2F658leKBBZBJ5gcKi9juyBBOMN9c8ipQBgOtsn1rY2j60ATa1yOgcAmfoeLUVoWDSRA4QzqyGxXFpAnrLph9W0oqF%2Brm10t%2FNbU1CrpzmpC3HfJLgvf5GlkNPZN8HkN7N7ViiWJBVSVnBUQ6piIAsiieVlaSBq7qZBKZDOtLUEFF7vtq4GeO8OlVtgg&X-Amz-Signature=6a9da347c3bb249199176d52c7f47f67a3d99a44f9294e1b6ac8efa0dc9dff1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZENTAEN4%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134225Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIEAo4QcNvaNwH5upViP5KEcbLRfXhnIHVd5txHEawR%2FhAiEA7d7t4ebxPyKxKoTaSK8WPlN2%2FQXvpUU1IzLI2rnnNpwq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDNhOD9tbU7ZIP0nZpSrcA1xz3Bu2Cra4to5us%2F2sD6WOFoWzuduj264FGATHfZx%2FjkRH1pzQZlnEqNi%2Bpu%2BNLSjMOttUMMdhZteX9Lp1Aqhl%2BJgJsHQdshX60PCbMJ670UDdpRHgCFSCUrI3zR%2FNznVarVvWIPd7hcSPa9IeHoEDOkR9TDWCXeKQFGNaWuLkgLvA6BV6%2BfFgeWg9lChqgwhX9XGNwUcAD%2FTLb0J4w93VlKws7VDj%2FehForpvwsugEstf6ztjt2cSbxinthQGsi6f0h7vCTNtWfWXwxsq1dbnjjxXSgqog13gVD%2FDrTJy7bForFZLM58S73AYteb%2BLHpAVPoEDZkejAd45YSp7HerPpzcz0Z8VF%2BAKT%2B2QLkjx8LlTKYjQxV8tOxRuXKSnExUxwQgO9810cWeHmfhtHwerhnAeaS2FSXQnIWnLj0gJCqTDfOtMSc1L1DAgL7rGGIxCQtdTHmZ6fMmzCjmzQnK%2Bav%2FloZ91SsR2iE4QfU9MBTGkeL%2BpECXU5CWijOQGEeETYcdHGq3h6Ju8upWM1guzcym7ReoqRcoWjZ0N5sZiGjEOm5xeuriugdp2aVpjsqzbJ11li%2Fzqs49ZjjkE8Rp5Arh3o7V%2BEEJVORO0Mp2i%2BBLgsUvX%2FdJ7EdWMJDso84GOqUBuvsDYlnQTuIBUWhDzM13M3AWVHxvEhBmZ0JAXlZMhZYunYOT8RqzBhdVTEVoYjrUvVi9IZwtNLb7JeyT87TjfZFKZdoMcmrluCX16g654%2F%2BIL1KkDuH3iSf%2Filh4nlMRJ5Rwj0Fh6QUaSyBJV8ZMZZADvG9Xn0aIHRv%2BMqhhmnCjPu66EDrNEusP83sBfz2hBhJVDJXaBgkRybgqJ71VDKe0tdrW&X-Amz-Signature=8d3fe76ca5143c5dc72fa82d5417865cdd82ed6c542f7cf36b033a2058c34c68&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK7L7NQS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD7ugPjIML2jBZker%2FzMoyg39tC30Xic7kEen5a7MpP7gIgSJukzRTKiY4rCvV%2BKoYL%2FrACA38z2CLBfF4Due%2FpQoUq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDE8xfAcQ0I%2BAXCk0ESrcA9cWtvGk7Jbqsa1xxH%2BZ0JpNMwXSt4DL8h%2FYyC8PAMeBgJOwsTeqbJmN8FSUTVpBo%2B7GBCMxes6juv%2BJKr%2BmXlP3kjOAf8gjglYVw3yjqv6KjhAcKKt8ts%2FtsDv%2BO3AOVotGEHn%2FhH4dUsLbgYtBhZSgz6pDzNr8Dnadu5h7VAnaMN1%2F4fEV%2BtVnw15DUxOQvIzdHIf30haaU0z%2BYRpBBbomUCugIl%2B27vxnK2LEqHmULguP2wM1gGlHaMkzuHLxVd3ssc%2B9NrdIVlCqNRE9K6v%2FAPXHfqPBaf%2ByW8rCzIoIigZb6E8htCdz05302CltJzmkA6BvEIu0teiGtCkiIowGJ%2Brf2mupNLbgC3jaQ0i4dtfuG7jj%2FRBjP%2FmwJBx4e2TojO%2BMIP3V41i8OQevbuRUw2cceP3qtwbLnpuvOK6vH%2FH%2BNZ1bRRBsMxLeOLj0CNM9Wp2dFZnvupzh4HIfiEtbWyJdsZu%2FEfA4vVlJqrjNkMx4ISGrfts3YhdAk8%2FWQTfz8HScd5pbVfiy3wCX0zo9YMmeacm7lRy6tMnA4iLkfxeL4vH%2FAx8of1xQuc88Nt%2B6LZge6flaZE2tzb9xLiHcu6%2FbutSlwILVdgiVZNpRXJHuDdDnebmCK1IhMKPso84GOqUBrwz7XhxgxowuD0ZhmbuT1S6qWc96y%2BjGcJ7LY124JNp9s4uuNT9dURqQNYP3rCNJd5hws4teAgQBa1%2BOd6jwSNaG3R67bUZpOi3yFtXWrqg6MHJf8umL4k45Vg4t1A0BbYGJ%2F1pz7Q8zhPal4Zg4xnQUFxD7CxXwDIXSceJ31BWuwCsDdVXmOOV972V0Z%2BDJAbRlSArzEJrcH16T%2BdpM0toelcct&X-Amz-Signature=e9e86c01a375b8a7beaa14f17fb42cbe9b69d33884f3210942128d75c811c7ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SK7L7NQS%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134240Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJHMEUCIQD7ugPjIML2jBZker%2FzMoyg39tC30Xic7kEen5a7MpP7gIgSJukzRTKiY4rCvV%2BKoYL%2FrACA38z2CLBfF4Due%2FpQoUq%2FwMICxAAGgw2Mzc0MjMxODM4MDUiDE8xfAcQ0I%2BAXCk0ESrcA9cWtvGk7Jbqsa1xxH%2BZ0JpNMwXSt4DL8h%2FYyC8PAMeBgJOwsTeqbJmN8FSUTVpBo%2B7GBCMxes6juv%2BJKr%2BmXlP3kjOAf8gjglYVw3yjqv6KjhAcKKt8ts%2FtsDv%2BO3AOVotGEHn%2FhH4dUsLbgYtBhZSgz6pDzNr8Dnadu5h7VAnaMN1%2F4fEV%2BtVnw15DUxOQvIzdHIf30haaU0z%2BYRpBBbomUCugIl%2B27vxnK2LEqHmULguP2wM1gGlHaMkzuHLxVd3ssc%2B9NrdIVlCqNRE9K6v%2FAPXHfqPBaf%2ByW8rCzIoIigZb6E8htCdz05302CltJzmkA6BvEIu0teiGtCkiIowGJ%2Brf2mupNLbgC3jaQ0i4dtfuG7jj%2FRBjP%2FmwJBx4e2TojO%2BMIP3V41i8OQevbuRUw2cceP3qtwbLnpuvOK6vH%2FH%2BNZ1bRRBsMxLeOLj0CNM9Wp2dFZnvupzh4HIfiEtbWyJdsZu%2FEfA4vVlJqrjNkMx4ISGrfts3YhdAk8%2FWQTfz8HScd5pbVfiy3wCX0zo9YMmeacm7lRy6tMnA4iLkfxeL4vH%2FAx8of1xQuc88Nt%2B6LZge6flaZE2tzb9xLiHcu6%2FbutSlwILVdgiVZNpRXJHuDdDnebmCK1IhMKPso84GOqUBrwz7XhxgxowuD0ZhmbuT1S6qWc96y%2BjGcJ7LY124JNp9s4uuNT9dURqQNYP3rCNJd5hws4teAgQBa1%2BOd6jwSNaG3R67bUZpOi3yFtXWrqg6MHJf8umL4k45Vg4t1A0BbYGJ%2F1pz7Q8zhPal4Zg4xnQUFxD7CxXwDIXSceJ31BWuwCsDdVXmOOV972V0Z%2BDJAbRlSArzEJrcH16T%2BdpM0toelcct&X-Amz-Signature=e9e86c01a375b8a7beaa14f17fb42cbe9b69d33884f3210942128d75c811c7ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMYDZWE3%2F20260329%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260329T134241Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEIaCXVzLXdlc3QtMiJIMEYCIQDKePvguWrxgTzlDUhdJHL8qEwjJ03CNYuqa1Kt9P8xMgIhANVt2k%2BjPAmJQ0XMG1lNRJkICUBoki5AeWiRzziiphRgKv8DCAsQABoMNjM3NDIzMTgzODA1IgxIpFwqistPrAeTqKEq3APxEEcdz6eAX02PprscKMQnPtwHC8aIhl09%2FyAIbIMh5sa4TSPyPlNJjZTUuoX9neI%2FsuqV0GlJPgvA%2BA2XJz9Lv%2BLCUUfYirFSx1PCd8uEmazopmUoJRzkwDUweYh0MWS9rIiAPYnHAQa7TuYwdOFC4JuZn02vIqdQYAlPxT3b6vQrdoHakaTv4Ro1TeeT3Rsxb8rWLC%2Fb5DS5f6RoOdQybPXkEwsBo0KLWhjCqjSVu3dP23lE2jBYcPcCaiDDk%2BQeai4lIH5y96a4WW%2BdaDbBe4mOp4sIlMi0tfNUE7TqwwxtIjpXIk5E25M2BgU%2FXIKKpeLD%2FpvU3mKX2m00G7Jv1emVvRseWgwh3NezF%2FWfAE8rf8iCrptnGqEKl5yj4gzp4joambaShcxnlZtBPQCROK8VKFE7%2BuOhAriE7bN2%2BOOv1zXVO4amgiT8hFe3n5nGzbtueCXiLQEc%2BNk44B2s%2F00ntK%2FONFEFS25rA5FwFuEdVYCYM0FPPYvTOYT7zkhVWJcgy792eFGlMuebjXAB9Zpw2A4%2FhHu8bjokIU8QerOq5q41n3ehR9VzwteZ%2BrJAPnuJL2EYMoLFvhLUJPya38U51PLeondY9ov030PJID7sL76Ke%2F9SRgav3DCu7aPOBjqkAXpRP5cb0Cr%2FELzgUfuFxbqJk7M%2BzL68vLjqbnU8nESxlHZpx6ee1YZv6pjT8ZsuwpGekWxQC0DAqHHHGrWLkJXK9y%2B8nPoWYmVap19iwy%2FOqTcSexL2wxQSd02TTHoJeFd%2B0plT4Um1A0Ul0e8RrxMQp8Wc8x3CsoE%2FwmQobKWzBdCIkmQ%2B2zeLrlVNhPCxKPltKF5rosc9zR9TTxWRk%2BjQ3WNG&X-Amz-Signature=dfa1bfcc069951e0994a4c56db49a80be823d166809d8b8b38996e8a1c80df7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

