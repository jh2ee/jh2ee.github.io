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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCAUER5B%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQD9IMk97XcgVrB5D%2B3Bs5WoOUINB96FjfqHsLq%2FJD2LywIhAMUpdaKwaUYLnjbaDt0yDWXwvoXeW1fTR0sG5uvikM3AKv8DCAkQABoMNjM3NDIzMTgzODA1IgyJxauAJrhJ6XlQvwwq3APGQlvT6VJERiHYRR8aES78YstwFtESX0aNr11oaHxdSJ0tL4L1e4E5zWhPwLcbOUs1S7IgdyYPBv32WcYZzanu6TuUcqbqIU5hDfWcE2C%2B1uXJr9rQrBaiECm8CYcmswAfg7RQuR7HIpZE2NeinMadTQcEJcI%2F5aMFvzI%2BJTDWVd6WsxDcG3AiYV2v%2FLLuDnqFj63uB%2BFuUkTnVZfoDJO9JXZSyU7U30DyZF4RNFmodAkFaJIqjABQmaXm9yc7fUDgbJ4cu%2Bs46piYBl%2BpdwlzZuBLN6HLv48B%2FDgmSnqOj%2FTT2USpA%2BAckod%2B7WXQy9q%2BppFx5fg3ykJ57%2F84Fhg5UjmoxwHYnk3d185p2nzBCI4%2FLZVNb6kF40GkKtXgDMJWYI4jcx2u0zKn9zVJCfU7o8aHsskCPEH8J5jBvvSE%2FvRfMeciTWuEypdMs%2Fsy5%2B7xqYuBMd0hCa5a6x%2FZD6nUHafA0TRE2Tf7JwVdSAZUwsInwtEG21RHwJra5UkHGjLIxb4HHaX2x3AsCPzO4ruYO0GvkCR7R9J5%2FS7OGhsnhougPqv%2FVukMxv14oErqnNh7fcTtY51DMHSQA8SdCGBslW5itUQugR%2F6hmT8VZV5INYBlH1QOBCjp0%2F4KDCcl4rMBjqkAS8Pq60a%2FpLQsJyHnNfZsR1P6OdrazJIrn%2BWMT1CGw6cmMYRx9iRVBvKWWD8Mwqr9xUo1ZRs5KxNPeNeEEgRIY7pOua99GBJCFsA1QhWpYZQs55oSt4IgBlMjJ%2FQuHlyBmHK0MXpn306uoTvVeNb6%2F0pQryD58tfHr%2B0SrZsedsb4mCtyCu3upFrcFlpuD5nM0S8geVe%2F8pkzhzz8AYoEl5r3Ao8&X-Amz-Signature=3a2ed3b50c3290d03cd7ed9b2226afb50926fd8745f3303d27edc8d1a544ebdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SCAUER5B%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005313Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQD9IMk97XcgVrB5D%2B3Bs5WoOUINB96FjfqHsLq%2FJD2LywIhAMUpdaKwaUYLnjbaDt0yDWXwvoXeW1fTR0sG5uvikM3AKv8DCAkQABoMNjM3NDIzMTgzODA1IgyJxauAJrhJ6XlQvwwq3APGQlvT6VJERiHYRR8aES78YstwFtESX0aNr11oaHxdSJ0tL4L1e4E5zWhPwLcbOUs1S7IgdyYPBv32WcYZzanu6TuUcqbqIU5hDfWcE2C%2B1uXJr9rQrBaiECm8CYcmswAfg7RQuR7HIpZE2NeinMadTQcEJcI%2F5aMFvzI%2BJTDWVd6WsxDcG3AiYV2v%2FLLuDnqFj63uB%2BFuUkTnVZfoDJO9JXZSyU7U30DyZF4RNFmodAkFaJIqjABQmaXm9yc7fUDgbJ4cu%2Bs46piYBl%2BpdwlzZuBLN6HLv48B%2FDgmSnqOj%2FTT2USpA%2BAckod%2B7WXQy9q%2BppFx5fg3ykJ57%2F84Fhg5UjmoxwHYnk3d185p2nzBCI4%2FLZVNb6kF40GkKtXgDMJWYI4jcx2u0zKn9zVJCfU7o8aHsskCPEH8J5jBvvSE%2FvRfMeciTWuEypdMs%2Fsy5%2B7xqYuBMd0hCa5a6x%2FZD6nUHafA0TRE2Tf7JwVdSAZUwsInwtEG21RHwJra5UkHGjLIxb4HHaX2x3AsCPzO4ruYO0GvkCR7R9J5%2FS7OGhsnhougPqv%2FVukMxv14oErqnNh7fcTtY51DMHSQA8SdCGBslW5itUQugR%2F6hmT8VZV5INYBlH1QOBCjp0%2F4KDCcl4rMBjqkAS8Pq60a%2FpLQsJyHnNfZsR1P6OdrazJIrn%2BWMT1CGw6cmMYRx9iRVBvKWWD8Mwqr9xUo1ZRs5KxNPeNeEEgRIY7pOua99GBJCFsA1QhWpYZQs55oSt4IgBlMjJ%2FQuHlyBmHK0MXpn306uoTvVeNb6%2F0pQryD58tfHr%2B0SrZsedsb4mCtyCu3upFrcFlpuD5nM0S8geVe%2F8pkzhzz8AYoEl5r3Ao8&X-Amz-Signature=3a2ed3b50c3290d03cd7ed9b2226afb50926fd8745f3303d27edc8d1a544ebdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X7AXKOCW%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005314Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIF787eIQNdiN3y%2FXg%2FjLtwOCpRahRYM6ydWSc0YCvMaRAiBB3FmFTYtmMSDXBYrkKEw%2Bc%2BIRBU6hVHl6N%2BmtvoHU2Sr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMNkZUzjlcUMmfoNs%2FKtwDk7d1%2Bv5xqpMFIk93%2Ba9fO9twHcoh2syhpscn0qRJpI3uXuxAOaToLxr5qudaUCE29rEjWdq0hLT4O%2BUOM1D54i6v%2FMhyEDqJdDLDPa13VtVQIcT4nQT0OYAS63GfNOFWQ%2B3KVEZ9izlBJdqQkyaq0D48tKOga0XmzAf70V6kV9vMMw0u0QrO1tyg8Jt1miS8ZBrhxq4TDiIXUy%2BEhZ5HHolNypO4GpR8kcJSwBo7rvUBIyLNNePGX7aacUtN0Wfuvc25wNdXPGy%2BP0rgMtv7ieb8DiD8LGGSU%2By3OdC28OR8bcuHTsHwWVaT%2B%2Bkmu9BYmAsZ6eIYCRDhxDgadWOSnT7b9RiyU6D4ktXJEfG76ukcSQ1eeCduJxtkXuaxSoI1Bbqk7NcW3XL3NiJWiqd3Zgu%2Fw8853CATVrQNf6lswSGvzC5cDORwoUJOaYqXHhsaB6Zo71XAWGr%2BGu4Nbvephy5qvZ%2FXibjamM8sX1u6R1BE%2FqqG1eHfG2zURVgr7Zz7ntANw3P1Q98qKj60iHdO8WWl%2Fn%2BAAp6fIqS87u8dENoOXJfdpvlapHfZhB3xT4xF911b5tAXSzVdHZ8g86xUtbVJkRilRzM9ZV2Olz5LGCwdGvqmxpKo1pz1vr4w%2BZaKzAY6pgF5jIXdNBWtQZxmZcuUX8xOzqq7xb%2Bpcvu4315dg73iPHAB7OzBOspm%2FdLE8YJXcXu3s6KhWuipL5Ff%2FEe9pBIji%2BMz2TqiQ2N4bhuPuVcHJv%2Bqyk1EAMPlZfi7%2BRgTOaODhhoXUEk1dQ3PU3x1Pt2rzJ6VVlvah0jvBHkVDcSd5ltnh%2FoATJ5%2FoHiomy9rAp8jN%2FLIVrw5z92CiblTnnuQYljntsSo&X-Amz-Signature=53c3685087861bb63b43334129a542699eb47337ea7302e367c7801234005eed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCHDOIWD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQC9JKGk4OUcKGI7ztnU2%2BbdOEz5tIwaAu2VY2QrNZnLegIhAJHPw%2Bl4F4xVlpHh8hN8JpJgiO1kSJQEcVQgnPFAoJeFKv8DCAkQABoMNjM3NDIzMTgzODA1Igw4e2wlCFbJPJzCgHIq3AOVlWSeCtVxWEH5tXhvjrfrP4AxqNrEU0DaWU75vNAdi6gW24M%2FPtpHKxXZvApEI8670iLyXf1hDg5wi%2FJDkj7OXuowxFOdSfLSZtsSvr0nFEx3pEgi1uXtX%2Fa6aiA1JW%2BueUb47VFgo88WZVwtAbeWOfC5oJcJMbO5TeHax0Rh6olQWGAXiqQe%2FgmDoYR9%2BUplzvnENyOBVEqVG9TGC9oBVLs4Qdi6l%2Fad%2F7IhNsG7QwaU88pRAu70c%2BveISTQDfMgHtTuyl9Al7PLWOuXN8NheAjFMhqihqoMb6lT7I7T2GBW47mlXCX5%2FZVTiV%2BcjqMjOEBGHnIHgRFd9x9th9kQAijZa3RMkkzeqhspRnstAs99MtpLqF063wRb6wRPJrRoPa2aCl8TBxeqj1mLiN8TN2DQxUM4s8Y1uSg8dJVTKJQKS8XPZ0JktAZoTiUMdLolB1kxUS9U2xkPw%2BQhcGbxUz7YC5UI635p8fZzyB5PsmaWr0u0dHFxF0FlT0dBIgN0IRmfMRIy1uR58clVbVwpZhlfbb44fVIJOLn3qcoHDhxVlBRxFgcrvsfd9TZmXrRLTE5wWkIOZZqTlSqtz%2FHmlZqFblcb73He1IA08cxz6pi5jzflVE6vSRjG1zCwl4rMBjqkAReGr6X7ulYYyonll7ast94cVDBmUuDvNwsaqkxPCD%2BO9UoYqX1wOyLDZzqvcwuyjPiphjE5EtlrMpcXiiqBIPU5KkurLwtHTkToMvVw%2BGO%2Fodwl2DAcZ4IcTT1qUSt3UxyDfVzK1ahV4K%2FcA9UfT7BPTXMIfXuux0cu1%2BJuKdzHIUUuLE8vxIpvI%2Bwxe3SI9asUFARaW%2Bb3wiWNZC%2FEgnLliTTj&X-Amz-Signature=25629199b7e5cef2d134840733d2c0559ecf38abb40d0eabd8d97199921c0f46&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QCHDOIWD%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQC9JKGk4OUcKGI7ztnU2%2BbdOEz5tIwaAu2VY2QrNZnLegIhAJHPw%2Bl4F4xVlpHh8hN8JpJgiO1kSJQEcVQgnPFAoJeFKv8DCAkQABoMNjM3NDIzMTgzODA1Igw4e2wlCFbJPJzCgHIq3AOVlWSeCtVxWEH5tXhvjrfrP4AxqNrEU0DaWU75vNAdi6gW24M%2FPtpHKxXZvApEI8670iLyXf1hDg5wi%2FJDkj7OXuowxFOdSfLSZtsSvr0nFEx3pEgi1uXtX%2Fa6aiA1JW%2BueUb47VFgo88WZVwtAbeWOfC5oJcJMbO5TeHax0Rh6olQWGAXiqQe%2FgmDoYR9%2BUplzvnENyOBVEqVG9TGC9oBVLs4Qdi6l%2Fad%2F7IhNsG7QwaU88pRAu70c%2BveISTQDfMgHtTuyl9Al7PLWOuXN8NheAjFMhqihqoMb6lT7I7T2GBW47mlXCX5%2FZVTiV%2BcjqMjOEBGHnIHgRFd9x9th9kQAijZa3RMkkzeqhspRnstAs99MtpLqF063wRb6wRPJrRoPa2aCl8TBxeqj1mLiN8TN2DQxUM4s8Y1uSg8dJVTKJQKS8XPZ0JktAZoTiUMdLolB1kxUS9U2xkPw%2BQhcGbxUz7YC5UI635p8fZzyB5PsmaWr0u0dHFxF0FlT0dBIgN0IRmfMRIy1uR58clVbVwpZhlfbb44fVIJOLn3qcoHDhxVlBRxFgcrvsfd9TZmXrRLTE5wWkIOZZqTlSqtz%2FHmlZqFblcb73He1IA08cxz6pi5jzflVE6vSRjG1zCwl4rMBjqkAReGr6X7ulYYyonll7ast94cVDBmUuDvNwsaqkxPCD%2BO9UoYqX1wOyLDZzqvcwuyjPiphjE5EtlrMpcXiiqBIPU5KkurLwtHTkToMvVw%2BGO%2Fodwl2DAcZ4IcTT1qUSt3UxyDfVzK1ahV4K%2FcA9UfT7BPTXMIfXuux0cu1%2BJuKdzHIUUuLE8vxIpvI%2Bwxe3SI9asUFARaW%2Bb3wiWNZC%2FEgnLliTTj&X-Amz-Signature=c2461d55f3b18fb6d0dda617bb4da61873ea03a87958226e8accbc63cfbd8348&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46642ZGRKKS%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005315Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJHMEUCICgqDNqSkr53ELO51GTZF7y%2BwCoUcc3MdN0QlbnUx%2BpjAiEAqNOlIaBIKTiDvVTcVbMOFkOHkhlNkvh%2FNcZKgCtkoDEq%2FwMICRAAGgw2Mzc0MjMxODM4MDUiDNQJQ6FxM9SUy3%2FDvircA2zlDD5Wr6DhQ7JorTlz5xW6qJ3Y25KMCA1WxJi5QCV1708vlfx2zyuvCflZ0Jnoeesetb0twp4FtB9gP6zlw%2B6Lw11XsWSfrbWjzXqFXuVTryZxyEZUG78Yj6HzTobeEL9TktUvOZROkGtMHwo0fr5sRq3sJbpLZEVMl4CuSJW0dUy4OkUeMN1pgA7eOjh2QP18NberxLxjNsV6lHXp%2Bf4iSdFJnDeehXOfJ9vFBh2gDxgBkn%2BByrfTH9LhblACffHJNTBXBakwtYpt9U%2FmvFEVGEjZtOUbYMzjKl43jG3Nsde89ctBajFONkRmNq1q0Cjb0uQVF2dVRY%2F9Dzr823a36yfFGf7xEfBZiITCIheB6WVT6DZaO7jvRIfWFy48%2Bi6sbwqDFX6xE%2FInDXIC6ORv%2B9AgizBHcPl0Le35oJ3TCAcKe6r8r95XdLRpo%2B2Qf2R9vXwYvtK9ER3CF4gEvZuV%2BsFTGqdpHiizzs7a7Xhe48tRrgq7zHOxA0zb2hxf0ZfIIY%2F7Gt1iPwG5wBkw6GM8sC2kQ8B7MXiKceJq%2BvShIz8DGOIGLMDc2kvgj018dQniIivyVhbMAAwB7eCbNkUjsF1Os5DRci0MGMD8DjqqzBfv6tXQUt7B9WqqMJuXiswGOqUByRxetfTN7Crxcdxi%2BfpsCH5PufSGqXc5%2BicCmE5ePUk9kLssl8ruphiLa%2FBUE4FLmfrsIc7ZCHcM%2BPzgOmKadZ4Q6HtrCjYm31BGG7EOOQkJRIFq1CeSAt4wqLWTVHybepqLQBpKd7FRwfq9Y3Q9VYv6zTmuC0ZGL%2BihkQgn%2FmBZbW%2FqUKHPR53wmvWbgMugNgSF9lUYBa%2BVoZPbNOP9m2vBbRKX&X-Amz-Signature=e88f2d981fb7f63d9affcacb3aa33151e1db3d4b35f5321db980dfe54355e719&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VQNNZISS%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005316Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIE0nzSM%2FUE4YYUEWTG2mBv5fdyoZlm0Sk51uKav%2BL8hdAiBvyqXaZelpt6bSlXk8POSOG8YzXJq3ddTxnzPU36VWtir%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMSiBo0a3ee4uP3OXAKtwD0EtKVoIZTuBhmSMXq84TyBKa%2FAyS8UqhgHyxF0T%2F1jZkplgJHS3yUXr7n5U%2Fhih5DUsANbqhY9a0i3ncWgfXP7%2FGLpchEEZK2eLGXpnld7%2FFlZ9bCcMFTKh%2Ft84%2FtEQka86pzxE5AoxRGLq2yNauw66hGV4hd3ie0HHiNYAf9PJxQVqmKvX2fuve5oWZP9NlqJDNJKXYGya7p8eGje2kmC%2FPKQ15zKFaIO274RxbOI00THZQw1TH%2BN%2BWpT%2FnibMRDxr9DzNH8%2BTNnLdF8JTV5HEaz9DR2b9wcDIfitE1okEu8P3z6gW%2B53nL6oETXjy0xw25JjUm7kIWKpBPrHTaiBzsIGhYg4zktwXM0Rje2fEhjAhkgrz4K4OHOG2GNmV7XG2yq%2Fa9cqSfBw%2FstvwbSbcZeaHf1%2F8hHd5YADlYBbjxKqiZ2p5N8nMPcOfxrMo1NhxhamylyChQZBAAw3bbyNVe0%2BgVDl%2BW0VHobWI9YvB%2FTM95RyiWmhXSO1Wg%2F721VGqMoOSOr%2F8oRKfmksQPnNGrqOEKOqrYdoCMdYxC%2FYA60b2FSyM9zSxnJCSUvfi6BTi2OJfAxZckO%2B%2FFSzyWV2mbg8F0elikg7cdtMXIBEHwKB%2BVIILc825gz3Yww5eKzAY6pgEPgJAPWz2UWPyiGNa0gw9WzPGZUIqpVqyAcRY40fQKeJuVCy9I4U8fI47xaYHjvG1AFDdoODysa6IJwuFeSw%2BqitGRNBG2106hMaWLgUvGig23rP%2BViphhbOvRyHi6hD1EBHaTbKtz9OigqrDEgAk368D8SaKG%2FIcyiv2DgV%2FeKrLvUqJ2Uo0CvF7SZNFXeMXsz8eVNeLrL8wzfdq3r2w%2FDsQ%2FbCTu&X-Amz-Signature=779becc64fff39b6e9d1bb2b9a486900144c2cf6f7be19dfb241be6992db74c7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46633DAEHME%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005318Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQCODiOYiDVji8dvPnu6CL8utE4qfJf3l7uLZ8fVvk%2BQwgIhAPj4gBLdqSnyM6VCJZOnBjdaCo5j5JiTgepauw%2FztZZ0Kv8DCAkQABoMNjM3NDIzMTgzODA1Igw1NXmAQ4%2F4ScCWZekq3APi79FbnZR2vCl%2BHoGS0fAirvU2aHd9J0j5hjEk6QFha60Vv8y8bSnRBsLCiA1GkZM9jG45B5lEqi1ity2QI7iDmtd5%2BxBeuFoj3rEKKkzmiKfoRAUo2YTFC4APlWpoCWqfXEdvre2VvPh1j7IbbXLsCNINWaU4qdBrD8hzS0GETsbfJEJR2KkvR2%2B9sXBwtaDZOiQBnsbpKf6Dl8weATLVfn23Mt%2FczF%2B27DChi6PBnW4BgsQzJ4T2lmC6w%2Bnsyk1eLd5iVm4lAXdWXrdRXDlWC8bH10e%2F8uhWt4KbHn9YpHWiesR6n%2Bja4owWUCxZRqz5VuZ5sN4WRP5sW5mtIIPQ3185iPWo%2BxUag2QM6%2B%2FxYXA3%2BRJmvwDuG50OxqUCWT5DLQ66Ckda%2B5yodu9YXz%2BNGeOb4Zk6Q1P0Ic5sCXmvN%2FMkDoK8YRCTJXpPgiWtUScmHZHMBNQNpv7YfsUbR1ankhZqPW7jG%2BQ3FZBFwbpaG6WcnupJL%2FQay%2FrOYa%2Bw%2BpfFtn8q7y0voks95mt15nZL%2BXk%2BEEdHP7yet8pHPj%2Fxf0ZCBNfwPokRR3E8P9HXcxXT%2FGDzA0zqQBSRb1gPQdcN9OHQEOlzZYdHGvCVpQeDCcCAyla4eI3zQwDLKjDTl4rMBjqkAdizf9BneAMFolzxhRcq%2B6wk1I%2Fc6IvnQYCkFjJ76eKlxZH5ilyroMkw8XwrAymob2uT34Gicp9WMeLRR7q4H%2FUFI8lbmSb3q%2F96wn%2F8QCycstmoygU9kh9gEqLxybYydprxWsbz0HXHaxzowgLKvIo5weVQEf%2F3%2FhQPnX6q8GkmPU1mEGU8y79y1w1c2yk1QKe8AfdccHjmaChHiOZr9FIA5jO7&X-Amz-Signature=fa2768bd6fde7f50f0bdecf54f6e178e3c3d61c9522d91a9b0b22332d0c4df5b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSGCHWZR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQCUHfiLWCB7V%2B7feUcWAcRL%2BwO%2BqZ998ovM5uK2tC45ZQIhAOi0YhwCoOlNEmWh5c5TgE4njYq51%2BUr3sragZ3GWDHxKv8DCAkQABoMNjM3NDIzMTgzODA1IgzYICanZsKV38jH5icq3AO4jsWdsbBmGIX6XNtiKR6UsGWFp1F8CW3NPtlD2L2cuRv06%2BCNOgbjBUiE9oOC7VAfLPkTnPnp%2FzAOaKS4pC9yw5s7gRyILqPIG1hk9xl7OzXuK%2BuLuy8li4%2BGYJwR9LXYM5La7GdvwlIjm%2BUD8sEVDZ3HgYKdE6LJfeohvgP1BR%2Bus0FPNdWwXUeFpVNtESI2OZXW81yvR09rsS4Aitb%2BPTBrj8npWYQDeaG82q4j1S4cqzLLb7fBtthLpcjy6hdCOWaLghFq1Yr5kCnp2SyUZFNvhV78l%2FRpQlRniFM4vYbmBLTFzuz90kYJ0eTzgVFdfU%2FP1nCakko8%2BGJejeeOYoW5Ae52YQIgKw7imtQcD%2FsuzIUGC2tixICMgWDduCKQgHcZnuCKBr1Tq1z0b%2FYA9OjzO2cDgQDbAQKMscKKRkkGJMxwYIUR5E%2FlS%2FY3U1dwtyJ%2BT%2B1PwrEr21i9iVJnpV4aQt1ASJLrFKu5OYAoIJamcmg61EddGOxKMeTQhEzuwOsHj9JMhBQUm5D2d4f7xF%2Fp0aibWx1GoUBz0sWu3zUfnfc2oq8IP8Suyn2TiHqsT6Cpi3TbSjZxwPnXjObUTy5vcOupS83xH5M%2Bq5ehBFQRvAtNj22dryhlXTC1lorMBjqkAddMzoo052glTiDvcW4FdvLmUpW%2BhGPnmV8wX7a7VqYFJ753G%2Ba%2FkWsx352OYBpgmijazns9OpavU4T36%2FGM5tHy5GLdYX7W3IpOFo%2Fk1B%2FnZ5%2BlvvNp9ssLbw91MAdZbwvCQeX2tSaYY6aIjXG7QE0IF%2FcGR0Pk6F%2BtSSribN2ObwUe7hEr7FcjunPj6vUCEcht%2B0fyklzPSlFBufi20LRPha%2FW&X-Amz-Signature=8499d7068c929e5577d737c2d81890c57ecc2e42ba85af17c34ce76ef20d5418&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RSGCHWZR%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005321Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQCUHfiLWCB7V%2B7feUcWAcRL%2BwO%2BqZ998ovM5uK2tC45ZQIhAOi0YhwCoOlNEmWh5c5TgE4njYq51%2BUr3sragZ3GWDHxKv8DCAkQABoMNjM3NDIzMTgzODA1IgzYICanZsKV38jH5icq3AO4jsWdsbBmGIX6XNtiKR6UsGWFp1F8CW3NPtlD2L2cuRv06%2BCNOgbjBUiE9oOC7VAfLPkTnPnp%2FzAOaKS4pC9yw5s7gRyILqPIG1hk9xl7OzXuK%2BuLuy8li4%2BGYJwR9LXYM5La7GdvwlIjm%2BUD8sEVDZ3HgYKdE6LJfeohvgP1BR%2Bus0FPNdWwXUeFpVNtESI2OZXW81yvR09rsS4Aitb%2BPTBrj8npWYQDeaG82q4j1S4cqzLLb7fBtthLpcjy6hdCOWaLghFq1Yr5kCnp2SyUZFNvhV78l%2FRpQlRniFM4vYbmBLTFzuz90kYJ0eTzgVFdfU%2FP1nCakko8%2BGJejeeOYoW5Ae52YQIgKw7imtQcD%2FsuzIUGC2tixICMgWDduCKQgHcZnuCKBr1Tq1z0b%2FYA9OjzO2cDgQDbAQKMscKKRkkGJMxwYIUR5E%2FlS%2FY3U1dwtyJ%2BT%2B1PwrEr21i9iVJnpV4aQt1ASJLrFKu5OYAoIJamcmg61EddGOxKMeTQhEzuwOsHj9JMhBQUm5D2d4f7xF%2Fp0aibWx1GoUBz0sWu3zUfnfc2oq8IP8Suyn2TiHqsT6Cpi3TbSjZxwPnXjObUTy5vcOupS83xH5M%2Bq5ehBFQRvAtNj22dryhlXTC1lorMBjqkAddMzoo052glTiDvcW4FdvLmUpW%2BhGPnmV8wX7a7VqYFJ753G%2Ba%2FkWsx352OYBpgmijazns9OpavU4T36%2FGM5tHy5GLdYX7W3IpOFo%2Fk1B%2FnZ5%2BlvvNp9ssLbw91MAdZbwvCQeX2tSaYY6aIjXG7QE0IF%2FcGR0Pk6F%2BtSSribN2ObwUe7hEr7FcjunPj6vUCEcht%2B0fyklzPSlFBufi20LRPha%2FW&X-Amz-Signature=3c1cefcd0aa9d6f880f0a8e8fec51cbbf20d2e580eb157f59c50aa5da33a516a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TYFHPZ45%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005312Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJGMEQCIEfMHujRZAGiPZq1V3vebmnVzK%2FasJ78ebIu%2BOUbjTfyAiAjM1XqqBjy1sOF%2FEdeqt3jPvxCLFU2SjbcCLGKdE3EOSr%2FAwgJEAAaDDYzNzQyMzE4MzgwNSIMFtKeClNDYdqwhOEIKtwDyoit9s%2FDyBCVt9sAFIcqTLnklW36HGq825ide8yNzAKln929Ros7VQS3x%2FyzH6RIvAV%2BzDzJfgWrZZngPhzxn2AgCdxlLEhPjyTWZvLX4cJS3Twi6G2BLsS7S6wuSQzlYHZn5kFSEJEA2xTbAJAUCrqAigxECvRatI19hkiakoYCbhk28XHyqit7ZA%2F1wwlgxSkpJM9llrtuufhJC%2FRpdGFpwamKsP%2BONBuqOnM5ZPRQKs9rNZ3LxhILXLBOTcgWu%2F7%2FIp4lmzyOo4XlAHRR%2BdZOvbQ1maBubpYiAc9He6m8LhaP9B8z2dRGx0D9qSsUsFi2JmGR%2BwkOZOrKRcgCTidyg62tlTZaDfeMD%2FDU0R%2B6rRZRPvT4fOZhyXxB33DsVj42PhtLxHwKFvS%2F%2FRuJTeScdPVHR0HqsClzl6ds5H%2B%2BbQW%2F1bzcWw9YmEZRs6qSfU%2B2FG1Af%2FvSEpe8JJweLVsoPpziNT3vygDnHnYDeykzI50GUOVACPUTYTOb9zSZNdeFI46KrDFc88zufCZb1GEa%2BcUDVo1VkentjXx0d66lkdx1%2FE%2FLi8sOlxzmeJ%2BHteKLLMZOFyB6Jme2rIYLdoAn%2BI5jwrOijs6aQMP%2FkIHTz6v4yleIDxgwvEkwlZaKzAY6pgGMP8ZNjec1y5t2%2By6aBGepLX8zMIVTtVzY%2FAQYO4YKPTq%2FblrnZXMN%2BaiGfFKb60dFfTryYTBKHz4dAqEAT0D96IpHmdQbFuIjAUXIQ8UQ0uTbvnWefi5KCEReZijrg4j%2FQG974LYh3FLYL6DifZ613jwQhZnFfRQ4SZxCwxMDVULotRu4yo%2BjtezFYaJEGbmyIIJ5JB8S3%2BkBfLY9QZEy2WBtuwvo&X-Amz-Signature=8848f5b57a270af5b4b3574573840aa4c4d70beb34d5443b74f7e6a7718ce350&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEFZXRHL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQCgctVS8Apq3YstBn2dIwWbIUp8jb%2FbSXIuU9HqiaVeTAIhAJY9g7JGiys%2FDVPhSv3%2FC4rOBGcIki%2FxKsdiPJq0iNQhKv8DCAkQABoMNjM3NDIzMTgzODA1IgzC9Ikbrhujd8%2BhJQ0q3ANAbD4C5f8U%2FvtrbHzLynmJ%2BJqdT5MAx%2Fbl6IYCNQzxtLJeF%2BDNHESbOtARwPjjSoUSSlS4gILavAflUuBm%2FgY7POztdDc%2FwsVnTdFDd%2FP69fz3WkGfsE%2BWenCqrfqcMdI9066ZB927yjDrPIbBciPYPtYPG8rk%2Fuij989fMetyi45Bc%2BEx9B4lzoLYKAaJLr0FxGWfmeav%2BRhlRWaMEAIMJWxMadr5oE6Tx5eICaEtAtVePxmocA2dAQqQ1wq7KFSNSfevSsAmvhgJwBpmzg9ovE0DCmKxii1w2aPNARWPSvmsG5%2BqGevh8HnNirS9ycfidl9SmCeVb77fY9fSAspYTTraS4KJQniUpZuYgkgSC83X6IHX8O%2F5AmenjCo6TYNxsOMf6kA0GD4lO4vH3gidurqdDl2icLId7gdrMgYUqJFhOWTymyvJ4SHPFwU6rBktUqt79Fok9W3nIbKuA2PiiIFMnBuwSWOaSMrivqJVtkl0sQ5JY4iACcglU2js3lUAssL7Kl1P6rISqUFA7wxQfDXP8Ma%2F8pOGLSUhw4i5mDRdHG77f5EFJMGNsSzkRnHEdvJGLJqM8I8%2FqnnRoTofErKhzgsu0H1224BhjzxhUkJa4fU8%2Bu8sffVgnjDdlorMBjqkAZ7asEzfFykmdmhfJTV1R%2B%2BkL9opCyFTK2zerKWlwR0rqP87rVmn202mlThS0T2JHTtRXM6XWlM6arvkzHjEpRo0x9Rz47%2BkpIKHUTfugz8%2F2KX6cyl4tzuIwCWq71dZiIosWBDD%2Foj0gEdP78P%2FgNpjsB2UB8E6itCrimpyaZRzu%2FCYmVbS4%2FfB0rTnnl2XiJ3b9N7xa6XAhG2O6gx0mzNvmidI&X-Amz-Signature=d5ad4564637f163e597d6f56ce17712fb7469171031eaa90c2c6ec492d1d1940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEFZXRHL%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQCgctVS8Apq3YstBn2dIwWbIUp8jb%2FbSXIuU9HqiaVeTAIhAJY9g7JGiys%2FDVPhSv3%2FC4rOBGcIki%2FxKsdiPJq0iNQhKv8DCAkQABoMNjM3NDIzMTgzODA1IgzC9Ikbrhujd8%2BhJQ0q3ANAbD4C5f8U%2FvtrbHzLynmJ%2BJqdT5MAx%2Fbl6IYCNQzxtLJeF%2BDNHESbOtARwPjjSoUSSlS4gILavAflUuBm%2FgY7POztdDc%2FwsVnTdFDd%2FP69fz3WkGfsE%2BWenCqrfqcMdI9066ZB927yjDrPIbBciPYPtYPG8rk%2Fuij989fMetyi45Bc%2BEx9B4lzoLYKAaJLr0FxGWfmeav%2BRhlRWaMEAIMJWxMadr5oE6Tx5eICaEtAtVePxmocA2dAQqQ1wq7KFSNSfevSsAmvhgJwBpmzg9ovE0DCmKxii1w2aPNARWPSvmsG5%2BqGevh8HnNirS9ycfidl9SmCeVb77fY9fSAspYTTraS4KJQniUpZuYgkgSC83X6IHX8O%2F5AmenjCo6TYNxsOMf6kA0GD4lO4vH3gidurqdDl2icLId7gdrMgYUqJFhOWTymyvJ4SHPFwU6rBktUqt79Fok9W3nIbKuA2PiiIFMnBuwSWOaSMrivqJVtkl0sQ5JY4iACcglU2js3lUAssL7Kl1P6rISqUFA7wxQfDXP8Ma%2F8pOGLSUhw4i5mDRdHG77f5EFJMGNsSzkRnHEdvJGLJqM8I8%2FqnnRoTofErKhzgsu0H1224BhjzxhUkJa4fU8%2Bu8sffVgnjDdlorMBjqkAZ7asEzfFykmdmhfJTV1R%2B%2BkL9opCyFTK2zerKWlwR0rqP87rVmn202mlThS0T2JHTtRXM6XWlM6arvkzHjEpRo0x9Rz47%2BkpIKHUTfugz8%2F2KX6cyl4tzuIwCWq71dZiIosWBDD%2Foj0gEdP78P%2FgNpjsB2UB8E6itCrimpyaZRzu%2FCYmVbS4%2FfB0rTnnl2XiJ3b9N7xa6XAhG2O6gx0mzNvmidI&X-Amz-Signature=d5ad4564637f163e597d6f56ce17712fb7469171031eaa90c2c6ec492d1d1940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZROAO2I%2F20260204%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260204T005324Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEAaCXVzLXdlc3QtMiJIMEYCIQDOwIkCR6A4zeNkv2a8DnoGHmHh7hiZq1y7woJ6UXRZEQIhAKfSjqBa5gNs9SE0UQ80ojo%2BiIjsJrR59w8Ib3tA06D4Kv8DCAkQABoMNjM3NDIzMTgzODA1Igxt3H1JlOZG%2Bi8B6%2Bwq3AO9FRB61xVlyDmMMmdirGaHkczBcWe4p7%2F6XDwFzC8xu1BefwwQowi44EB%2FI5Wh2u%2B%2F1DZk1XMzDVnvzWs5X7z4MUYvAwqbGNNIbZDeCdB1lyyFaDLtyDuGrcICH3Z9l%2BOOCTWxvhHPNqktaU4Y1QPM6GAbrkkiZkc8fmLTWW%2F22avMTZgZZEJfKhXORz0OdEzJXoxI9DpeHF3xgWRuuaLSVppqlvA6wIPO2cfBSle5CNnlxftlXyton2ilQx6kx0D0fpTfJyq%2BSp%2BPNAtg8L9lWcPMmZro2KOH40auwRBkScHxpONLWIWSTb7CNQxp51YXYi6ekp8w3gEqfWRXKpzj372svsOtoAOrlyDXQ4De5hP01mWxaE3L0lHrKObmAWfrcOywX9aACHZcTd6ATi9XBHYMCuzajnFnAChD%2BM7E6ZCgLS4HHPVu%2FZmuSGm2qGGGDuoWyw9fFBgl5UGX47%2FXv5DWESlb%2FWIZjahONJqMymu3ioNDBARVQgzXWcmveKyWERbImuC7lhSTgNruKP%2BdDrEm7ZAck5M9pJUSPEoo65pCLJSohkelU2THTasKzXfRJCUb23cU2zcTlZ7rJNdfQ7p5bSTxqzBrwtXHN%2BQiHpV5WZl7tC8u0FDP5zCul4rMBjqkAU3wkrq9FcozkNlPJMX8uG%2BGsKrYKSjfsBpMMEHQm9eBHgfoA0aBuLeuN%2Fa79YNVcD5E0zF%2BU1CtZ%2FCQfedzGkD73lvMznmBpodEb83kTr9MedmNMFSZ%2BL065aFtliE1S5VP9QSClPTe4YmkD2WZVkvAWoOXF3H12gSE9tluMNL2Pa1GH0HupETIWVwcD7ez46xkyuN7uN88xkSMT%2FHgS8Q2%2FXWz&X-Amz-Signature=adc6ba3bd5d937b234575c1d5c958877515a184423e3e201bf6a4470dce6fbe1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

