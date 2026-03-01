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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROYOBQUH%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC56rnNwOxlecQr70BDrBzWBa8OsEtA2gROySNK%2FzyxOQIgNEmjrbispQV5gRhCIC%2FLj2StQ%2FcGkVejyuzPklXsoXEq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDCx3iLWgpxFfAEmQVyrcA4VoCvE%2F%2FJO12jySzCnIDiW1vde670oFvwAXY3BhXpsTE%2BGf7i8FZwXHP7xBDT0wCiKl%2BZszqow1OvF3L5kzZFUES%2FRiyvBaPeZsz%2FCZnfC9Djm3vdWJYqSKposze2sav1D2IpsFVkpY9YePUv%2Be3YRF7w%2Fj8zxLbHtRJ7gF27GWuyjqPRwgTDw0ddGVS%2BQ%2Fdy%2BC6HK5rvF8wD%2BGrhGlQRTZQ9mbZC0pyR3CJwpiG4G2fJ1HDKgb8kxNPKtWLAISb6%2BQeKV%2Bw%2BOmuXsVaNzjznH7MN4mN46QQX5isRwhoLR4%2FbjSXuxHo%2F1sl8%2BcRHQ0drvtfmtxsLuFf7lGvxR0MHcpLUkTXyO2pa2gf1l3k9Z%2BHR0a16t%2FMnvBpqFOVxg0C5FXomlbVQMUuw7DCF5D2Gdh5ACPFVT95noGL4LZgsp38gDfqOh2vORD6LDhRCN%2Fx7vXmuHSA%2BaKjWG7Qe6X5SLAkgpZay%2B6rm%2FFg81inuxMA%2F5t%2F59TXlUyL6jBBLCkpS4Y0ovCX9ySKLNmptRu11jID%2FoudXuJBRi9yxx5LZKwPsjL0k%2FDavai5J0n5E0qfuXUWag0EsThaITyXW03MhHQDrwhqxSJPJu4UPNyw8uC2qbiNknI9QxSHBKGMIqAj80GOqUBVy6D2PPoBsMU%2FyQWM5xAon7kHvY%2FURmgA%2BIhYSna74dYXzDMiv1WQRCjEYml5Vk%2FIh0jMCJN1d4u1DgVZWOW%2BNCxuAozt1iWwhwsZ1Gg6R27TQqn%2BIJKf%2BuoLYPRK6oOdteddKQWm5N1WmnVTXe93gM4S9oJptyo06J3KmPvs5wqjCnMS0C6jt27R9xC0DXbghI7rW%2FFfrqjvwNk5d%2FbtmGbM0sN&X-Amz-Signature=97e902619ff133de6066fe7edd0b6c6d4bd0370ce97d6ee0ca5e56540a061953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROYOBQUH%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC56rnNwOxlecQr70BDrBzWBa8OsEtA2gROySNK%2FzyxOQIgNEmjrbispQV5gRhCIC%2FLj2StQ%2FcGkVejyuzPklXsoXEq%2FwMIZhAAGgw2Mzc0MjMxODM4MDUiDCx3iLWgpxFfAEmQVyrcA4VoCvE%2F%2FJO12jySzCnIDiW1vde670oFvwAXY3BhXpsTE%2BGf7i8FZwXHP7xBDT0wCiKl%2BZszqow1OvF3L5kzZFUES%2FRiyvBaPeZsz%2FCZnfC9Djm3vdWJYqSKposze2sav1D2IpsFVkpY9YePUv%2Be3YRF7w%2Fj8zxLbHtRJ7gF27GWuyjqPRwgTDw0ddGVS%2BQ%2Fdy%2BC6HK5rvF8wD%2BGrhGlQRTZQ9mbZC0pyR3CJwpiG4G2fJ1HDKgb8kxNPKtWLAISb6%2BQeKV%2Bw%2BOmuXsVaNzjznH7MN4mN46QQX5isRwhoLR4%2FbjSXuxHo%2F1sl8%2BcRHQ0drvtfmtxsLuFf7lGvxR0MHcpLUkTXyO2pa2gf1l3k9Z%2BHR0a16t%2FMnvBpqFOVxg0C5FXomlbVQMUuw7DCF5D2Gdh5ACPFVT95noGL4LZgsp38gDfqOh2vORD6LDhRCN%2Fx7vXmuHSA%2BaKjWG7Qe6X5SLAkgpZay%2B6rm%2FFg81inuxMA%2F5t%2F59TXlUyL6jBBLCkpS4Y0ovCX9ySKLNmptRu11jID%2FoudXuJBRi9yxx5LZKwPsjL0k%2FDavai5J0n5E0qfuXUWag0EsThaITyXW03MhHQDrwhqxSJPJu4UPNyw8uC2qbiNknI9QxSHBKGMIqAj80GOqUBVy6D2PPoBsMU%2FyQWM5xAon7kHvY%2FURmgA%2BIhYSna74dYXzDMiv1WQRCjEYml5Vk%2FIh0jMCJN1d4u1DgVZWOW%2BNCxuAozt1iWwhwsZ1Gg6R27TQqn%2BIJKf%2BuoLYPRK6oOdteddKQWm5N1WmnVTXe93gM4S9oJptyo06J3KmPvs5wqjCnMS0C6jt27R9xC0DXbghI7rW%2FFfrqjvwNk5d%2FbtmGbM0sN&X-Amz-Signature=97e902619ff133de6066fe7edd0b6c6d4bd0370ce97d6ee0ca5e56540a061953&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667M4RYO7M%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054150Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD3CmwHQo1rbez5iL782mzYrmZLniYALyPVnTWXMU9JSAIhAPG9dPjx%2FZYV0PT7Y%2FVwvoRCZOJ8Ib0BmgPkOiZgBw8XKv8DCGMQABoMNjM3NDIzMTgzODA1IgwpHDJJ7TgJDpsUkowq3AODrNxmuxiAyg9bel9aA0McDdyjOhXepM9a1meVTGoxWsdQlQhICTsNYdZ4vBYlDatTvsurqbgK4lZClpVGziDcof1JBDduIcjFBKvrVnJPNbXTD33Bc2Togs0tPvrpI0nR8iY7cvUGyAi2XfFn3Hu45AQBtlKn48pXtR19okxnRgewzt9avsc0Fk0%2F8RMEtGrDt%2BaGrtX2CZqHBj0EnkA%2B6dxsHyB4odwEBkNwCYmkH8ANH2ksUK5C30UUAaSR0tJW%2Fd0UMROq%2F0Rvv7KeY9qmtQ5MDRDgz5fyp%2BRRKNoYo%2BFpbCA%2FdIIlqdZOJjdJySRvejJ5%2FMz2Bonywd35rSKdI7G2x%2BLFCZzF6nUUMOL4KA3kz6sQjrxk6Ycoi6h74eUegWGBLvtKGC%2FqSZWFQwFkowOWrvGHCJ1yO091%2FOYCj2dOws8KkUXpgqFhT%2FI1mGr2hjmT4AkEomaYp%2BsW4he6OQNOKwAv%2Fu11r23jzG5sEuCa7gcqSdtmwEGQm1BfGyuFWoeYgkrl%2FKtUJ45dQuoB9E0BVd6Ej3Dxo0x2jU5SLmVXnn6XAi5TyYH938%2BgPCyg8DOOIRvc2C%2BlPdmYWmBEoGu1lqP1n3LkJ9leR6m2nbz76iHdKVfQDHOFCzCauo7NBjqkAbxAG9pq2ie5ZPQS9QI72nrQn0YGE0vGjW3tkHweXRF%2FePoUTebjnbxwYbj%2Bm1hpX0H98Zlk30kBmdb8T%2BB0%2FsdtTwpPJ7POcak9gXdoQh6n%2B1x1Es5kAXAQOKvz8y%2BXsDUOfKMu3v7mzOQ14MagfhL7WyNePfOsS7XoFw%2Bvve73XO774MITmz6l2%2B4KUbMWHAm%2FOO09q1ovB6d4AoiXRNXQUhjV&X-Amz-Signature=563edfebde032e4f852ea83ca8426e0d79b8e3c4a122be9d6c6901fcd72e2dc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQZCOGWS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHjjy4HvCXpRq%2Fyy6xZ8n1CJ6IhieBYTGZLbboKxqkiXAiEAme8wSZUaf%2BJJ4VcQqMbBJi%2BGQBFhTYJX3hVFBgyTrAMq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKD6IQavK9zCpt7jDyrcAyGWkj%2F6fxIgRwuSfZVXq%2BADTtD9F9UdlpFwiWJYPFDb0fA9C1fF7%2BGjIs5aUEmIye5h2cgaiy2KTAmpElOSyIqwqGj%2BGrjez3bsoDiRW0b6c4VrXwMvEziFIzl5LmzkPlo%2FuaOIRTdms3MQ8VokZ2mZiILS%2BEtgSCJWGIg6rGkOmlS0b8vF7LpITc1NwCRFgSD%2FL6kSWDQcLHZCNse5CITv98RhsVg9XF7EUGpkckIJpHRncweGUBFd1KDLJTdztlroec62eTGQiOCJoumPwEYQWGxPUEG7CFYSpyqvpeuLArkHIi3%2Fk05g59L4aCdzamn%2Fji%2FR5eaGzfEKOc3zCnP46ZVl4e6%2FvCXt1lYpnA34iRmqYF%2B8uRkvdCYm2YVyvnJLsIkUfk8%2Few3MU6tDWUEDf%2BGpBWZGxooZzXFSSM%2BUJHPuE%2Frf5EsyFPRrkSerbBlVpAjqmJmSyaoYyAIaa6k6rNLdKbRAY3RPTZClcs2vIrVcvL%2B9TqSc74lTydTLffvh%2FxCjOipg%2FfbQvYRfzmXppIEQr47iXfJq1dwYST9YLZojRBdm1TaV4AIdmDKeSkzyZVR4pcGrwPQtSzVj7IGGnZSYHflsd5ZwEcg%2FSyi1AV5wa954YYmSmIfwMOa6js0GOqUBucSlFL9rQC0OsoMSWTZ8Ha7lPcuMpqsBfmdMM33oKfRnNO129UlLHFEgUJvQxZCFD5fYWUHXpB5Ny66lb7rOk%2FM3BhgElM9lzXcDjh6dIltXu69aIBHs4J5mbapUd8sqCMmSVILNZpwmwydioSRBiWlNsQz9JNLxnm6dk3yHICJwrkN3OcfvrZRqQkt0%2BOa2vfFvAjuxpNTZHmd%2BbfzxRgM%2Bxg9%2F&X-Amz-Signature=4f3733ca6a184e977b69c78c84fb8f9aba32c1e5c2a4dcef16fb9413d184404e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WQZCOGWS%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054153Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHjjy4HvCXpRq%2Fyy6xZ8n1CJ6IhieBYTGZLbboKxqkiXAiEAme8wSZUaf%2BJJ4VcQqMbBJi%2BGQBFhTYJX3hVFBgyTrAMq%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKD6IQavK9zCpt7jDyrcAyGWkj%2F6fxIgRwuSfZVXq%2BADTtD9F9UdlpFwiWJYPFDb0fA9C1fF7%2BGjIs5aUEmIye5h2cgaiy2KTAmpElOSyIqwqGj%2BGrjez3bsoDiRW0b6c4VrXwMvEziFIzl5LmzkPlo%2FuaOIRTdms3MQ8VokZ2mZiILS%2BEtgSCJWGIg6rGkOmlS0b8vF7LpITc1NwCRFgSD%2FL6kSWDQcLHZCNse5CITv98RhsVg9XF7EUGpkckIJpHRncweGUBFd1KDLJTdztlroec62eTGQiOCJoumPwEYQWGxPUEG7CFYSpyqvpeuLArkHIi3%2Fk05g59L4aCdzamn%2Fji%2FR5eaGzfEKOc3zCnP46ZVl4e6%2FvCXt1lYpnA34iRmqYF%2B8uRkvdCYm2YVyvnJLsIkUfk8%2Few3MU6tDWUEDf%2BGpBWZGxooZzXFSSM%2BUJHPuE%2Frf5EsyFPRrkSerbBlVpAjqmJmSyaoYyAIaa6k6rNLdKbRAY3RPTZClcs2vIrVcvL%2B9TqSc74lTydTLffvh%2FxCjOipg%2FfbQvYRfzmXppIEQr47iXfJq1dwYST9YLZojRBdm1TaV4AIdmDKeSkzyZVR4pcGrwPQtSzVj7IGGnZSYHflsd5ZwEcg%2FSyi1AV5wa954YYmSmIfwMOa6js0GOqUBucSlFL9rQC0OsoMSWTZ8Ha7lPcuMpqsBfmdMM33oKfRnNO129UlLHFEgUJvQxZCFD5fYWUHXpB5Ny66lb7rOk%2FM3BhgElM9lzXcDjh6dIltXu69aIBHs4J5mbapUd8sqCMmSVILNZpwmwydioSRBiWlNsQz9JNLxnm6dk3yHICJwrkN3OcfvrZRqQkt0%2BOa2vfFvAjuxpNTZHmd%2BbfzxRgM%2Bxg9%2F&X-Amz-Signature=96e83c1968051acfdc19ca9318d9d5e2411fa75ce3ca7b6ff20ab4e9592e3a77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663UYG77Y5%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIGW5L0RRCbS7r%2Bf%2F5aK7djuyZSqChOqfpjKCwKSR7GsVAiEAuvOztTBnUY1LMX7tvKr1RuOonj1thtrzMge%2B5qinwV8q%2FwMIZRAAGgw2Mzc0MjMxODM4MDUiDGRKXJeEqw50wpb4ZCrcA6pt%2BNgCGD48U1iC5kpnwV96w%2FXEucIeGeKBKAt6kIBP7RPOQWR3my6p%2FagesH1R7%2BYx%2FUgqO6sCCo6RPF%2Bl%2BctgS6Aoal1a1cK9LAtgK7efvvKOGNNsWfOnu%2FWKmgHOgGQpQFhU5gj4BgeKD16ZB2A7qIYGtRymgSP0GTKZ3F7wuvVwxmYalgnRRg9VWDzzIt2Rz8%2BDW6m3lAGOdLAeYsOI6u2C6ptZARWF0SE6Gv84CdAny9wDz4Zr9D%2Bhcytmve73iJyn6mrw5q1swaCwUlK2Tq%2BtoT7UFJCbq%2FtH7oPRuoi28YGjyUASVZQoIheSrNJUlGcHnnXrbJMz5Pb6zHEUeaGZMMhpPpW1L7ktTIZS38hiJs%2BOH9sb7rnmkwWIuAA29fedonaFVC6I%2FOBfQJq5Tz7jZejSPW%2FxHf5uiFONHlEu371PhoLYw30umOB%2BK6y2SNyjmjO1wZCfa%2BZj8x8%2FNMqqC7zfwNaWJHdRVvYL9qQC5D%2FtXpNGeWqXYZYzjRjN6aXMM5395TvExHJUSaUnZx4CJ6I%2B1x%2B5Dq4pIY9kwqKAfHp1j2Gy3cxHWE%2FS%2BlS7G0dToMsfkFYI8D8cRuKLdRkWv35%2B9gx5r55xbVeYEHa3X%2FgyXk%2BqY99nMMLxjs0GOqUBE01xgUvpUUXDF1hQ12UfztBHF9l0eXllnXmlHlapCAPNekvmL2yBZmB81L0vgJ9rOGGQswR%2Fm%2FJsn2cv4FV9g6lu4m%2FaTgFjnog6MTKF6FzxlrGN35%2FTYh4C0QLibwa8I4g0DgXCy68C31WbqOjxYPZ%2BBsWZ6bTBUSHUfM2U72Y1RFdexzgM3aUmSvdtRzhLSfEM7VJj%2BD5j38G399PtER1c%2BqtA&X-Amz-Signature=bd0fd6ea1b7018801471f2030123a9607d7576c850ffc5f4d89caa0ddad4e09d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCTHXIF4%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054154Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCPDgeT6YvBNweeHrIRyurAbK60pHWLSXmv3aHDNKRMWwIgO8KVUNjx8EnGYbGK7RVJZ8Kyh7fuoAUPQ9h2KO4CDI4q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDFyJnUYqW83jCPZvPyrcA8um%2BjoStcciIokjzXQhs%2Bq%2B1MBqLMLmQu%2FCkiOhO644qqlj7ZnkhBmNO9SoqeNzRIjryruacDg4bpKxuMOoiY8FOrMLvi1HWxvncCdZJyKQVIpaUM7SqPoXBdDXygBpM3Rm3VXJVRQSFzNwLPBMzn3CpYF5846nmzC4AZVwoeVCus8BQ7J6cJKRsabM0DQl4fWjiV0JTDGC6HzZT7p%2F7UtaLJY03VGyQ5cOnyrq54qnhPHO1cIwhmrjLxJUggsD38%2F3RRur4aXWn71gVOT0ruaLEFQlno1nx6wlR2Ivptu5xcn4Q7yo2a%2B%2B4i0U2zJVxzBOYp14bSXtKxYWjDPUpMGDxbMJ1jK3lLmxQwrZqvc2b04j%2BCmdpKLRGs%2BWPWJyk0W8FRUwZ8AkXgryCKbwtzcKwWnRFNnEsshLmyBHxQRF7CLkxj9xLJadB0KSGY43YRgvs%2Bv0l8b7eNE0WAtoGhf8CDH6ol0o2c8DFzXnFAxObroxJ0IiFFgl2i9jVlo%2FYk8kWs6IEF90Dak79ufIjDljtlXOebAyUUjRz3C6CPpzLhK6bZ6B22k%2F%2BxbLtjzJE4mfe1B2GSh%2BGDhROTf8KEWnTnHXJxQAzWtNAR49uU0K8OlL%2FTBzWxjuNUm3MLS6js0GOqUB4EpD3D%2BQdtvScamqpNobKzn0DVVjRol%2BsUW5BwJF0P2qMSNqFOcPo6dMsVN6otH%2B%2FwR64kXlyHuP1HPJQdpQMoeMiQrvuE6dzoSQrqimat6XVQt7JGBCos4VBtzci0VG3ZwJI1%2FMOkC%2FWD1Bf0qLKfy1af5WjwPv%2BhVfz472fM2bFNwaV59tkmwZXDP0MOFPAuIIAZUVRnxSaJzJMXuSJzc%2BNGVj&X-Amz-Signature=3dfd8e75bd4381c2cd7bf1b83cf08680010fded8036816808ae5f8caaafeb573&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XFWKICNV%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054156Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC4J%2FRVvyyd%2FqGS5fwh%2B27Fc6f525OVHvh7Ds2m8pMPvAiB6Nv6J9KyhlXNLoSDO92zfHcO5enzNs%2B3oCt96pIMOOSr%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMHcJox%2BYHsvIX%2FEPBKtwDoSOnBGm5peszcEf2qRA60zrgxLGzPJ6TZ1kvcd1xtx%2Bpb%2F142L783cmZ1OmJNupKke4h39IDsxb%2FdFKPP4BQlMeJY4jxHX9H8U1W0jytcGqdGicBDZ8cDnzaTqYa0H8IbGt7Q3rM8teeWUcwAWymBwzQs92Ik%2BOg7wF78i6X9IktgSzLVB3VOIy5QILSWlbgYCWrbNkg5YzK3itZofZ9LY%2B7J960Q298UXRh0Bf9IAmz4q%2FzwVNCvBBBkn%2FixAnpjui24dy0Don5B4KWGUfrVfyNqXzyDJ5OG7cakL6KzoQRJw4lNG4SwG%2B8O9SYVZ0S75X2KsQlQDi%2FpQKmLTQhMayQ43tKLairZ8mNyM1NVufI%2FUrXCIFTaJ3rLy9yruorKM%2BEflOl8mzecndqHJeNMoEKEmLYlpyds69ThtG5QrviKX%2FebAGpbOVzSZarc3Qcw66t2K6d4XjOdygPE9v5AKK58vJg1ruP9LPBdMOD1OYvWJQ7ZqO5JuM1qtctSX5lhYgcJKX4%2BJ4NVA%2Fg5OtocH40PlmSfSD7dnBBW7UBA5xHamDWeljr1qk0lQYVcEeBrg3rZynJUCTUgTj1KHr3fi61RZoMFa396mwEhQzUxrYgNkTovW44xMeDU6Mw2bmOzQY6pgHN%2BqOuY1XDz2l9qnUMdThZqsiw%2FiOACe95mIgOfQMK6zudfyb4uflp%2F8Uty6eq8hvjCmWaIKnv830EYrspbtR1CoXhgAKZfOfwJEkYdBIZ3p602jVrgSEhqqG0B87VApqYhA3mvN0D9BGWW23nVjtRQaR%2BkxIKUvHiYdHVj4k3zlfw9tHw7L4UHmNAE0B4ahAmj9whZJ4OmwHnKVAjxJlX14M2a%2BK7&X-Amz-Signature=ed0a7cb579c5c124dc2892648c2c4a0263f80d007cd05e50f8f6dee5623bfd4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4V7MZDG%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCW9VHwB14wWbllujMoDcvIfZKaS%2FUm%2F%2FYbcld8itQKpAIhAKAlWQ3AA0G3BWzSXqcOPSompml4SiDWp9Hsge8hMN8SKv8DCGYQABoMNjM3NDIzMTgzODA1IgyPa9P1nFYW%2B5s69b0q3ANzWomlCx7Hxj6ezQipNv3K1WB8F5q1dz%2B0sqpTnXhoNXIfsT%2FDq7ReQcc0jd6xi0GMql2k3yh1zO6tC%2Bb6Plrs5RuV0cmSTQM7TCQT8sJUlhOD19l1CwMRFkp8NFtQ82yEIlWUvGeUrBNQBa%2BUHl4re7rqI7Rhi2UMVfJ2UtFFzxShHWkurHwXWS6%2BjzhZhyHMPUJuXetEayP30jV5EXgIzGnmRM7uYd7cgipzzgeHQKQygaBbRO4YFZRGfCLq4T%2FfmCaVIBXB9W54itn%2F3Jd2mRfzBnJA%2B1NJTor6gMzhpCLUACvteZnXtb%2Fk3uLquMd5Pg%2FdTJ%2BehdfcjbKrz8pXAdxZ7uQAdognJKIJWd8ndF%2B6KG8VAyV4TUz5mjBTScV8TYQ%2BUj0UGQMGbl72pMpUXxm0xWPBFIXGRWu2%2BN4Hmf4gTcamhNriIQC4%2F1yZXPdd5he9V5rVVtkrc66MRz2vYr7yH1sEPwjfJkFMrEKk4PF%2Bvtf6e9n20ADaYL5Rcn7nNrQ%2BC1yl8JGN08ugJr2iK1pXJmkrmmao1%2B24zmrADzDrNbfT2JX94eszIxVAiTFicwGETwV%2FVQSDImfrchDd8N%2BdhnU7RX3ljIWVv794SJTKC9e7bwxgpCe1gDD%2BkI%2FNBjqkAaYsCty64prRkpz0UBFJ2cidOiRHCt1SpWPF32Wi3agd1gflaWHFSqx%2FVoKxCoiBhi8JUe%2FGlmgE1TQH7DkUGXKnlrBdZbm%2BhzuxZ0J%2FEPgcGNL6qQabBdm5jrt%2Fmrz89B5xgh%2BvBlnOLH%2BvV5vq6BFE2RjVakMIs8SoiAvjiH4cmW902K8BmkU3aKaBpxDRyjuI4CDrgCe73yn1xN39jG0gXvC6&X-Amz-Signature=243c5cc9a08a5f1d418aa3e435230381313203f1cc85b82d795611b2f1a2dddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W4V7MZDG%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054157Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCW9VHwB14wWbllujMoDcvIfZKaS%2FUm%2F%2FYbcld8itQKpAIhAKAlWQ3AA0G3BWzSXqcOPSompml4SiDWp9Hsge8hMN8SKv8DCGYQABoMNjM3NDIzMTgzODA1IgyPa9P1nFYW%2B5s69b0q3ANzWomlCx7Hxj6ezQipNv3K1WB8F5q1dz%2B0sqpTnXhoNXIfsT%2FDq7ReQcc0jd6xi0GMql2k3yh1zO6tC%2Bb6Plrs5RuV0cmSTQM7TCQT8sJUlhOD19l1CwMRFkp8NFtQ82yEIlWUvGeUrBNQBa%2BUHl4re7rqI7Rhi2UMVfJ2UtFFzxShHWkurHwXWS6%2BjzhZhyHMPUJuXetEayP30jV5EXgIzGnmRM7uYd7cgipzzgeHQKQygaBbRO4YFZRGfCLq4T%2FfmCaVIBXB9W54itn%2F3Jd2mRfzBnJA%2B1NJTor6gMzhpCLUACvteZnXtb%2Fk3uLquMd5Pg%2FdTJ%2BehdfcjbKrz8pXAdxZ7uQAdognJKIJWd8ndF%2B6KG8VAyV4TUz5mjBTScV8TYQ%2BUj0UGQMGbl72pMpUXxm0xWPBFIXGRWu2%2BN4Hmf4gTcamhNriIQC4%2F1yZXPdd5he9V5rVVtkrc66MRz2vYr7yH1sEPwjfJkFMrEKk4PF%2Bvtf6e9n20ADaYL5Rcn7nNrQ%2BC1yl8JGN08ugJr2iK1pXJmkrmmao1%2B24zmrADzDrNbfT2JX94eszIxVAiTFicwGETwV%2FVQSDImfrchDd8N%2BdhnU7RX3ljIWVv794SJTKC9e7bwxgpCe1gDD%2BkI%2FNBjqkAaYsCty64prRkpz0UBFJ2cidOiRHCt1SpWPF32Wi3agd1gflaWHFSqx%2FVoKxCoiBhi8JUe%2FGlmgE1TQH7DkUGXKnlrBdZbm%2BhzuxZ0J%2FEPgcGNL6qQabBdm5jrt%2Fmrz89B5xgh%2BvBlnOLH%2BvV5vq6BFE2RjVakMIs8SoiAvjiH4cmW902K8BmkU3aKaBpxDRyjuI4CDrgCe73yn1xN39jG0gXvC6&X-Amz-Signature=9638371c4c7de0492e1c862a639e7607e31e6148e6ad06c7efec71d44431b9e2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664HB4NBQV%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054147Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEFwkc8ud3XiSsNzrrF1O7AwvQX9W4lytBoYfJzDBqngAiBEazics%2BmZ6vo6jUXAqzyPOiJaB62M5S0eFykq1Hmtzir%2FAwhjEAAaDDYzNzQyMzE4MzgwNSIMNKLOalA50NWfN8HGKtwDBnh4s7LIgkNcgVrmygPDU5cBFnJJbUeQ27uqm9lFkL9cuZ3AGbaPjxzGMmnV7fc4u%2FXKJfGr%2FFvNiZNLKW%2Fx1xSk5nowKCSL9RrFOUxDdFdKyD8bPNWKehSBVH2fGJqhisO%2FMhbJE7IU8Hy5GJzjPe%2FlgGd7ZbwzLWMOqq8RIB8hwVRjQV0iCib40AC1jNi56rWMwE55LvHcHxKn47qJXA%2Bx%2FCReH%2Frs5M1WahhJEloOjp%2Fwe9I5yTfbyUOh7bZ3%2Bmulj9sNwrym3Td6eOLiRFPlTF9f33Gm3ihJRSou5lVrf%2BLKu%2B9jMvxp2vB4eopKsT5%2Bw8b9YJzaW39pZWxenhTmyOVZrBHlN0e%2F9G2F4uIoFiJvHDDWWKwjRQ3CAFmMfoFQ5FgNs3c4r1sOcRBZ99e6Mhswzle%2BmsAMGii7qaSZeiNik16CB3L7UOZPg6fZJp9m%2FLfcOm2x%2B%2F1k5fxHFyzL9LgqqhCBlB9RLMdQcwgdPq4T0DjwPALlb%2BgsExOYb%2BRF%2B0DjNW6eam%2BffpPdlRKOnCH8YIG7Fm3CrepSbm8gOXLtCeG30rTXO93q6TLLyLxR%2B5j4qTa7rfl4ydJ58rQfAmolH7gXc%2FUrt28314OFZLEYnGDPKeqHbGcwxLmOzQY6pgHFF%2BDis5Yu%2F39XIWb%2FLh3bdtOUKfPNSirlai%2FNgoX66IXZ%2B2f82r%2B7yn6KjjFceYGMvcfmpMPoQpjX6NX2r1%2By3%2BfVIGD57OKIkVOL0MvYdsCZ4Lg%2BUazDrLYXD33M09tFlpyivG%2FfnFErlKkof2YMGE%2FTQJ3JpkEPUN9Y1y0ySG8opsUcJ3mhQEDjKUd4Imn598cYCCYNJp9kp%2BRjQdDBRqX7LAXa&X-Amz-Signature=222fd4c75e9652bf69bad875d0db62d65906d09a156ed57947accb737a157729&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MS2KNH7%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRThWnEDxgtgkSihCTmNa8JtOtpHhdkQaEyRiyf52ccQIgR1jl8msF4M%2B4gfklKGpXuCuO2TiZ5Dx6me5V%2BcChKY4q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKcbWdyAOlPu0jnVWSrcAxRkpXReecwtredQnoMNsbZsGd1JVqhkKQnB2BiA8niam8lbe727yCPqfVv7cVDtw8pBVh8qPWI4aN051YqfAPmGKYtyLHO0XUC5CWxn9CmM0pq8MAFs%2BFDwRzyk9FHfRdVEECg1eqK%2FixELJ9ZJz%2FOHc8%2BrkzEYgXE47Fv4LzGRfpFFH9ACX6jhKVhe41GRBMXaP4mD%2Bk3zbuJzwOOohH%2BIlAB1MRPJYrK7EwTR%2FIokfp7TaQXacrnbUl4tmDTsR%2Bog0PFUNfoC1Q6%2Fp5yhStX1JJWZ%2FaZscnEwIIqKGCCMwfe7iYhxODPjUSeD0bIadgVeR4ZULbhAxNt9C%2Bvsci%2FANU6RIOsgVBUUgS%2BJslFoJpbFo4Y42CMsd4k9vgWjwmQpmnx5TH61Lj3pBgVYZrnk3fx4fjTAuWRQL5bxGh9p27xpao0CLBBqANl%2F9xwQQlSDfHTW34at7InsNb1dEZWgwrEUaUCUetYkUmUSARA8UIkDJgHgESELhddurKdhukXVuZeBp1YQ2pQHTFzY4Ld3KtLgI02EDN0Z6%2B1Lnmjquc%2BMtTKVVJwiggdeDWg6sNQQZfxT0RZpNShad9KfBvUPvxujA%2FaSVxvdyotuABe9wzPem0Tiz5WqSQbbMPC5js0GOqUB4LhWZ6e1RiKZC9%2FopfvxT1dS9a4rlyYsPVO2T8sX8DQpd%2BhyYz5jjpeuippACHV3we2SOrzJilxRPqMVbCTgXjHH1%2Bo8k2F9kJ1FLi%2BYTvnTKXvtxonnaYKLFBckihh9IcEyMTQBMJciFUT7IiJHJDJoiK2gwcutfWD0T3EvGwFe8uzPFYlvni2J9vt8ZDTg2EwN8VL7ba6ab%2BZQFC2dbVQWV4ay&X-Amz-Signature=f93d088ac918c7bf6112f161b4e7f0e415160789b1bc8bc155e80cb2f61e7940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662MS2KNH7%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDRThWnEDxgtgkSihCTmNa8JtOtpHhdkQaEyRiyf52ccQIgR1jl8msF4M%2B4gfklKGpXuCuO2TiZ5Dx6me5V%2BcChKY4q%2FwMIYxAAGgw2Mzc0MjMxODM4MDUiDKcbWdyAOlPu0jnVWSrcAxRkpXReecwtredQnoMNsbZsGd1JVqhkKQnB2BiA8niam8lbe727yCPqfVv7cVDtw8pBVh8qPWI4aN051YqfAPmGKYtyLHO0XUC5CWxn9CmM0pq8MAFs%2BFDwRzyk9FHfRdVEECg1eqK%2FixELJ9ZJz%2FOHc8%2BrkzEYgXE47Fv4LzGRfpFFH9ACX6jhKVhe41GRBMXaP4mD%2Bk3zbuJzwOOohH%2BIlAB1MRPJYrK7EwTR%2FIokfp7TaQXacrnbUl4tmDTsR%2Bog0PFUNfoC1Q6%2Fp5yhStX1JJWZ%2FaZscnEwIIqKGCCMwfe7iYhxODPjUSeD0bIadgVeR4ZULbhAxNt9C%2Bvsci%2FANU6RIOsgVBUUgS%2BJslFoJpbFo4Y42CMsd4k9vgWjwmQpmnx5TH61Lj3pBgVYZrnk3fx4fjTAuWRQL5bxGh9p27xpao0CLBBqANl%2F9xwQQlSDfHTW34at7InsNb1dEZWgwrEUaUCUetYkUmUSARA8UIkDJgHgESELhddurKdhukXVuZeBp1YQ2pQHTFzY4Ld3KtLgI02EDN0Z6%2B1Lnmjquc%2BMtTKVVJwiggdeDWg6sNQQZfxT0RZpNShad9KfBvUPvxujA%2FaSVxvdyotuABe9wzPem0Tiz5WqSQbbMPC5js0GOqUB4LhWZ6e1RiKZC9%2FopfvxT1dS9a4rlyYsPVO2T8sX8DQpd%2BhyYz5jjpeuippACHV3we2SOrzJilxRPqMVbCTgXjHH1%2Bo8k2F9kJ1FLi%2BYTvnTKXvtxonnaYKLFBckihh9IcEyMTQBMJciFUT7IiJHJDJoiK2gwcutfWD0T3EvGwFe8uzPFYlvni2J9vt8ZDTg2EwN8VL7ba6ab%2BZQFC2dbVQWV4ay&X-Amz-Signature=f93d088ac918c7bf6112f161b4e7f0e415160789b1bc8bc155e80cb2f61e7940&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SMDV2WFT%2F20260301%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260301T054200Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDirw92ErKVIPsPhNC%2BimDo6iLp1yu56AmYKtVJ5nWq2wIhAMpA1ao1MCvyspesZ%2FV9C15Qqo5xmZTeJqpwqk09YFpLKv8DCGYQABoMNjM3NDIzMTgzODA1IgyzJoVh3SssBhgcotYq3AMX2eBUCjtGKm379KzzTt4y1SePobSGEaalsA3yFhrf%2BXsf%2BMSE0ERTY7MNm%2BJZBU4uMV2knqPYHPjWn8qf2%2FmI8QdGCckTW6r17f0cf0t6wYJG2A3v4WlSAW1hMxOqbyM87VAAkoBM1pzr3TRHP0uFQk31FzWmsk266n004hm8xq8An2fG%2FzwWr1OB9WIFtn6WHGbGjbP%2FOqri12cvjK%2FTbjR%2BQTZRAoo9cUIEPo%2B9DKGV9PnjMJlj5mBPZL9zxmNM8mAWuIzz1je%2F5Lj1QrqVOvpVwBL%2FRsurz6cqF4oApPnU%2BhwClDHrglptkz5fO1PiKk8o8nMUGb%2FZBjE41zhsQFOPRaHt9R%2FwhX5RDvZgVReJLzFvIqhp7dFVghDOIjm%2B%2B0MaJf%2Fx4Fd1hqQyrNqgFHk%2F7pQvXCm1p%2FRWj65s5oXxKuXGQu4oQ8aSRhi5LIs6P7kX9LKG4ni%2BV1yHj9Cd5ilEloVKlGQEoYvMC9ivinZtpOEUPnJKt2SyrBtHkh9C5BPflop%2BeoeGURqJjx00QfsHfdJhIKDhL7%2Bm7ekiGy77POk0rJKmABTVxPFPq3D7H%2Bd75zmdV%2BneuAZXM2xamHIkf9meitB62I4B5OH2QQKI8J9r34Sw7q3S6zCTk4%2FNBjqkAceeDWklnvKqsnkrA%2BqRMSU2nCZg2Ls1ZmJroBpxawTs6p0FdL%2FjP0fi7g5KTmCS1fXbUJ7j%2BWFnyrTVI6u6vHhrfBwpD9ztRLPNf9RbjF8qk6%2FwVo0o9fkGbCW91MNtaUU8iAsKBXZldQ0DLaq%2BPi4hqCNaE2d%2F0h7QeyI5tb0jzrMSHg0kUVVDerNSLezF0PYa%2B1%2BQxUcePtfPapCK7buUlBLp&X-Amz-Signature=bc3e2a16aa4460da0e0df12242f0fa077213435aedf99ba12a3e29d77b6a5194&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

