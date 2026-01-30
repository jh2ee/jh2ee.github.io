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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CAHQDFE%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFWxu%2FRHGR7e3VnxdjX5hpde6H2gRupRscPhqafIc%2FGAIgGax2ZbWz%2FZjx003gsb%2BxaIEJya8yIgjNoEujmwEuEdYqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcs8RARJTtV4QeShSrcA709ZEfNTzLIgmEjvzSCYc%2B48X8YQSRfLDzzLmwwedyrudOibyHL8cptOIsRxsxtxpOmT%2B4nWUb4Ih3F1q%2Ft3BBoOKPjfSWA5rOBBkr91pEkrJ2Cl56Zyhw51syDvY6GkIm2HdNV1ziw%2BE6PNyKIOCkCsI%2BpyYMlZFsmNFGWA9evFbizudtgVFhoR2RnuhPi6iS%2Bbkb%2BhplntV%2FsRnZbcYSDowmQxs4Id8rzH9JR%2BH859cBBEqv8eBeixsvCGnMcOOOEov8KiA7qVR4X9i5%2FIjOCt92xXMh%2FOTzgMfA63nibdEns5UkIhzMCSBeH7YZIaMwvPmTWYPWutLtuj%2BADI6cH6lz3Hix0acNGKPgbAs9YGVWIWUM8NoCvpCD0IxKHKOiAvGu1MtlcxG917gHuAP0RdKsLtfCDQjzoBLmxPZPKu7BQVqCZNS13LhaoLuYLLNDOU51yAbixNDCSijrf6InWyYvorq45R0uQ5hhe0LdNIHH7nuBQVElJTPUpqe2dhQTV1%2BY5dLWFflZDVMSOEP%2Bqejg0%2Fp%2FJwQak%2F8J2aWVMSC14Wy4%2FJVkhjvgg6P7A965wATjXxGg%2F7X5KsXfhQ9oG2PzS1ONpbi4IcWKZXIJVAVn%2Ftgk35%2FISVnsCMOXo8csGOqUBtiRscMbkGYp9we4K2clK4fjNL4U8zNwJVJlTfl8ikwMKGrrO5FhJJe7Hk%2FL1yKKeio8NdPIjD7duQ%2FPDHa49q3MFRLK1RNNmI1wQy9jSC2nHJv7b%2Fq6XPLY2d%2F5iccArl9Rhlhwf0jO%2FELzVfFS2yVdKIZxsS0v6bN%2BVUjf6zRdYCBPfxJSXH%2FNB2n3qJyf5TuKPti7ezulVAQIX%2FLYe0r3LAYpj&X-Amz-Signature=58395c399a282e4efdd1b39731442400e9384b349ca2789a0ed6e98f19f84983&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CAHQDFE%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjENH%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCFWxu%2FRHGR7e3VnxdjX5hpde6H2gRupRscPhqafIc%2FGAIgGax2ZbWz%2FZjx003gsb%2BxaIEJya8yIgjNoEujmwEuEdYqiAQImv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCcs8RARJTtV4QeShSrcA709ZEfNTzLIgmEjvzSCYc%2B48X8YQSRfLDzzLmwwedyrudOibyHL8cptOIsRxsxtxpOmT%2B4nWUb4Ih3F1q%2Ft3BBoOKPjfSWA5rOBBkr91pEkrJ2Cl56Zyhw51syDvY6GkIm2HdNV1ziw%2BE6PNyKIOCkCsI%2BpyYMlZFsmNFGWA9evFbizudtgVFhoR2RnuhPi6iS%2Bbkb%2BhplntV%2FsRnZbcYSDowmQxs4Id8rzH9JR%2BH859cBBEqv8eBeixsvCGnMcOOOEov8KiA7qVR4X9i5%2FIjOCt92xXMh%2FOTzgMfA63nibdEns5UkIhzMCSBeH7YZIaMwvPmTWYPWutLtuj%2BADI6cH6lz3Hix0acNGKPgbAs9YGVWIWUM8NoCvpCD0IxKHKOiAvGu1MtlcxG917gHuAP0RdKsLtfCDQjzoBLmxPZPKu7BQVqCZNS13LhaoLuYLLNDOU51yAbixNDCSijrf6InWyYvorq45R0uQ5hhe0LdNIHH7nuBQVElJTPUpqe2dhQTV1%2BY5dLWFflZDVMSOEP%2Bqejg0%2Fp%2FJwQak%2F8J2aWVMSC14Wy4%2FJVkhjvgg6P7A965wATjXxGg%2F7X5KsXfhQ9oG2PzS1ONpbi4IcWKZXIJVAVn%2Ftgk35%2FISVnsCMOXo8csGOqUBtiRscMbkGYp9we4K2clK4fjNL4U8zNwJVJlTfl8ikwMKGrrO5FhJJe7Hk%2FL1yKKeio8NdPIjD7duQ%2FPDHa49q3MFRLK1RNNmI1wQy9jSC2nHJv7b%2Fq6XPLY2d%2F5iccArl9Rhlhwf0jO%2FELzVfFS2yVdKIZxsS0v6bN%2BVUjf6zRdYCBPfxJSXH%2FNB2n3qJyf5TuKPti7ezulVAQIX%2FLYe0r3LAYpj&X-Amz-Signature=58395c399a282e4efdd1b39731442400e9384b349ca2789a0ed6e98f19f84983&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RPWKRCGN%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092609Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIC2RqTqq78q3ZE1c2PPg%2FWKUI4aQAJUUuTBWs6Q%2FlTKDAiBou76pVEcsKIyqAtoNCtAcYcMHB7lBt15q4hrqzOkbUiqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMF9hX7ppwtgQH2ISNKtwDSzXvJTaGMKQi9mnkQyZlBSlN8jL5MbLuHLgAeQmb3LxmqV2iylCQ3VnikG5%2Boow7bAD2pnEJEnefk1kgCwUxv5zysM3YHuNDeYrnyMbTDs211wkf0UytmO8TxndCJpVYrTfN90JFnvaVkWwHQKpWYywoxzXJH9%2Bh6ptiI7Qk36FIDzgPXMeBOwQSiUfK5jsPvsAXAF8bz8C9%2BZRpdOWpJ0JMgE44oUBmidIBbJsdMGF9BwkM5mU0wTsucOk1S45ZdqMX6JUoPKu1yzfjwzrX1VOxWWna%2FxsAYwzUY6yBGvD9Zk5sMFBX4SuIzJJwiGMSlacM%2Bs9A%2BL98SvMBu%2Fwx9RLUTvWPGhKFvYXg0MyUVaa9UHXrVAkV7OmHchIUeF%2B4NKFknNLY9Q7nSwH1EwjgC3va8W3eca2j5Ny4S0OeLT9V8BnazurEHmdrH6VIqK%2FPB3Uax7x5nVdkz%2B496T1DqhyrAoZkPnn5H%2FYAaypt25CfzJVpbqH5rWI5SnMI%2BKBvaUIq%2BaTQJYbLlXpClGVgeui4Z%2Bk0Q6mWh82yoCWyeAxtvNZ8qkc4VECrpdyPvmwLHxmJHelQsce1nGmXlzTCtil8RU8xP9HkKNWiR3xPZNeTBgdDYZm5z5gAep4wjtDxywY6pgGInUul%2B11wCu5XT5Z73PB6IDnQq6TOcExCB%2BhXfRbmq4YtXh%2BoXn4jsWimQ30FkHrn4iXq8sdJ4ChDFJ6mIOqrQ4t05kEqmBGm7VDdaPH4MXNkZelOIGNqLkYnMGNIgeJ4GIxaCclbpDYpZ8QioOYWNuNYVMOd5dZs46lp%2F2KrmC03vokMRJd%2BSfgRMRAHnIVrWjxhWBx1AzZBJF9sbiN4vR0mYsCk&X-Amz-Signature=05ba078ff61af0b104d6ba28932274033636d340f253143c012434ff11db6d59&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRCEDTXD%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9DoaTDnNSdDiyS29dG4tzfSWGuXUKXnspF1qgjLnz1QIgVQbmws8FkzZREHYXkvpEUUcp8bbrPIhhT1Z8iQ7hmDMqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJZy%2BqF6rfDw0ATt%2BSrcA3iBq7nkKE%2BCSd1W%2F%2BIf3tjHW9F7%2BTo8JIVzsQqz5upolRYQQkuI8FEzQQ8sXfIxbS7mfaodA9wBSIz2akJIvrZFzEwiphDTyawqRoRJE0z8pYgwFRJXv%2BpUBfNIgiiDfJY0OoBHRoP6rNKB02L4iwgcgJvv%2BR8qmLAafpNpiPZ1QfbeTgW3PMgd%2B0i4x6%2FAMkPdu81EbIS6TKS8g9SGnhZTOVx0zXdFi2R6woEgd0qGdefZrhyh9fa4cgAb%2FMYvaXjmtpG1%2FoDfBgkbD6MMom%2FHQevxBjnCw5Ibjr21HCZhEsARK%2BwyFjQIfBfnWBI4b9rTg8B%2F6FRulDV8iRDQHJPQ%2BnTkbsmkbdzKPSTCM9cVmprUIKusj2i3kOUQxJQ38Zjk39njlqKC5akp%2BBYRsRFNYI7na7jUx%2Bzp9zaui52fKl6n3mOihXH73ICa2y9pJv0Ius1t6XSje7dNudLHczOgoAQ%2FKV%2FphrgQHKfcfmEV9O5gAUJq6A9iJlMuxd0wik4A96X%2Fjf%2BDzyH6mrqZwZqZkyjVlo2%2FtBqZHAX%2FWRiKOOlSfPKYX9NBxmRTHoDx8UPdMbTFPCZNy2y%2B4gLFvQckq3yDnKJheQk%2Bz3xTmB8sxDk1ExcHeUYRW3llMOnP8csGOqUBwFWD8JB9oS00gy1f%2BuO1z%2BM1AWm5q46iqxyeATEsZQ6JX%2B%2B5kVTTiBN%2B5gpedi%2B6%2F%2B6GazQ14oUhJWxPfz4sJ39q75w%2BQR6esAdymzRuMoM%2BBDOXoqbkIsK6Ayb5Ukj5BrK832f1347Dj8t38UNMWW0sMhXTeEBIQJhMcZcledgGgPyC9erklL1aNpUyFWPiIdtbB5ERXqbrildGtDs09s%2By77b5&X-Amz-Signature=b1c06f23a05addc94820a16c75b7052f831ba6a0eae1b2d4243cc83c865faf8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WRCEDTXD%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092610Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC9DoaTDnNSdDiyS29dG4tzfSWGuXUKXnspF1qgjLnz1QIgVQbmws8FkzZREHYXkvpEUUcp8bbrPIhhT1Z8iQ7hmDMqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJZy%2BqF6rfDw0ATt%2BSrcA3iBq7nkKE%2BCSd1W%2F%2BIf3tjHW9F7%2BTo8JIVzsQqz5upolRYQQkuI8FEzQQ8sXfIxbS7mfaodA9wBSIz2akJIvrZFzEwiphDTyawqRoRJE0z8pYgwFRJXv%2BpUBfNIgiiDfJY0OoBHRoP6rNKB02L4iwgcgJvv%2BR8qmLAafpNpiPZ1QfbeTgW3PMgd%2B0i4x6%2FAMkPdu81EbIS6TKS8g9SGnhZTOVx0zXdFi2R6woEgd0qGdefZrhyh9fa4cgAb%2FMYvaXjmtpG1%2FoDfBgkbD6MMom%2FHQevxBjnCw5Ibjr21HCZhEsARK%2BwyFjQIfBfnWBI4b9rTg8B%2F6FRulDV8iRDQHJPQ%2BnTkbsmkbdzKPSTCM9cVmprUIKusj2i3kOUQxJQ38Zjk39njlqKC5akp%2BBYRsRFNYI7na7jUx%2Bzp9zaui52fKl6n3mOihXH73ICa2y9pJv0Ius1t6XSje7dNudLHczOgoAQ%2FKV%2FphrgQHKfcfmEV9O5gAUJq6A9iJlMuxd0wik4A96X%2Fjf%2BDzyH6mrqZwZqZkyjVlo2%2FtBqZHAX%2FWRiKOOlSfPKYX9NBxmRTHoDx8UPdMbTFPCZNy2y%2B4gLFvQckq3yDnKJheQk%2Bz3xTmB8sxDk1ExcHeUYRW3llMOnP8csGOqUBwFWD8JB9oS00gy1f%2BuO1z%2BM1AWm5q46iqxyeATEsZQ6JX%2B%2B5kVTTiBN%2B5gpedi%2B6%2F%2B6GazQ14oUhJWxPfz4sJ39q75w%2BQR6esAdymzRuMoM%2BBDOXoqbkIsK6Ayb5Ukj5BrK832f1347Dj8t38UNMWW0sMhXTeEBIQJhMcZcledgGgPyC9erklL1aNpUyFWPiIdtbB5ERXqbrildGtDs09s%2By77b5&X-Amz-Signature=14f447dcb26a67d49f219b24ff5cdcd9a3421ba40ac3f7106f6f463f4e29cb0b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WK24QTTR%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092611Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIB%2Fus%2BsUCGGqydN4SvqYpNlxSk%2B3aMnynV6FHChmV2buAiBazLslbrG3zVGqdd2pRo9nLdHjv4PoPFPeyO9NxhzEEyqIBAiZ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMR%2FIGsVb60ndo6NEUKtwDWMuC%2FOQC8KFwdwehQsO7Tpj51esQjN73lrM2G5gSmSGMcGdo%2BgZtHkbOp85sVGEI98fGb3%2F9JXP1LYQSPYgAVnkNgz60LU4UZoHzsBg%2FjwFiTcrl%2FbwzWhzuC9mQx71VRIPS7LAro1QNZ%2BH3h1CU7ccDglP3fpNVlz3RV27wBAmfEyhAk37LokVagoaDHBzemNyuyGjUKVMBy7fQbzONNlmJoEhioqZQ107IS%2FrZZc%2FhW94CTgtijTwEX1iUtUxj6AKx1iEyGyd6uwrsLKu5VM4LtWeUQFLrTAERuqGADd3KWpI3ohkooysxJEFqhoAWvj9R1uIMv7yy6FzKUsQfHgMNIHHp0DasBKg9Iehu7ipau91Wbdeqg9NwXXP0OEaKIo3Uorgc7hkeE8O%2F84EhlBoS9ZEq8TFfFCXzLmqIyD55lDJvrZB6kMH7mzgL%2FK5IRprR1VVgeQLVQt3M6ZBePKfprVN%2BR5cZrE93hecOzjovtJLNukliMQam%2BcffTjUL%2B1NAl%2FZnBNhUcKKnDHj3l30cJ279zBUT5ZNEccUxcKe4NkXUK6crJHfipN6mRVp3wQtNASUJQ9ASqoqbozWRt%2BQKUUUHH6OaxTw%2BBUpn2QJM9Rubnhs65tjsVEAwtM%2FxywY6pgEK%2BcjFLdEbiZdLTlSMSfO9jpeJNaZRc%2BbYSzWsjYjrMBRrH2ipe6xjSGGWgZIJ28vikFCaVnDld8N583XZuQyJuMsKN8OdofBIpVHTIVMzN%2Fz163cMuxuxvGixB9MJX26FBkuvLdk6FXWsmAAwQZn5pPY8nPWmHA0x2X%2BNhS9wnDCOZsZVj5z7%2ByRj%2Bds9%2FLUuCy2Pv%2FVg9hXsAR1Yji78xt%2FdRYZv&X-Amz-Signature=814fa3ef6b9aa10459413ae6ac8e34ad9113d236dcdefc996fcd10b1d7f96e78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XA6B7PZ7%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092615Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIB7g%2F4c8tCC%2BX4ZD3OBl6vS9wL3zqHkB%2Fyt7w7poRW6QAiEAsCt2O%2BTvoL0dBFjhhjI5%2Fa6nYKda92u%2BMVCROmmOvLQqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHRdE2Eeo8S5SEc26SrcA482%2B5hTkv0Bs262Pkw5DhckzQCw5lHckfXnG0vLeG0IlNmUNveprF6nbm%2BWrSxyXourW0vwvv6wG6cqLEUl0zR9FPOWS4uZF9mGu2CuzFV4Ng%2FYZAoZ3o%2FOVRuJkt8WSObXFBEEkO36%2BJSo0izwurQ2Lksl5JrggSZJLGfH0cmOoh7oqri5HC6WwGqrpZBXJbU99x9jpWAzPW0CqDKD8cSG4wL5iw4nc2zknplOFia83kpr4C2KH8qT29Jyq8bryxvyHnyvLsfPsHRXaN0AFvFdJAc1IvqIBUXu0u0Bc9dYhGzNs1iJsOfGodypH84bsxzn4feGOls74%2Fv40Nbs6%2FZpNZ2O%2FcH7q9dQMVeywQ5cD5DSmsZtp7TCeqVQfaEr8ipRjNSCS1jg15AMMyMLqoVQR7BVVRj5JwtjZHqe100WquhWH%2BRtTrjUNVLEzSXPe0OuzUVAltXmDybBJqzGOA4BIirpHUcj2ImF3B7TZMksNdQDfK%2BHl5tkshnLVUCRQA2PXh4Ib%2FpXZzbxpj%2BcCkFvHxmqclYdMmPun321JOEWhIbpChpxc%2F6qA14yIIS0rSWWHC9D0ipKcU3WEn743o5uPtSs1C19SDTb3Pqxz8ReAtqDe2rHfF24x269MNzQ8csGOqUB7DBzSRX2hnI%2BQxOUzWedpRQu8474FsswNxQ%2FghqfH2BNTDNjHWw3hyUBoXKILLBPm4BSqWIgJC1eLc%2B9njTbCBFX0pmDgznO1zqU0VVnkgc3Wk6A4o8dHIHh6Ja46qEOL2lqSK5AkgTmdqQDcCowsqI3Nhkkw9A7jemrXZ2fh29CIlN0H23hYcMAlGmp5KeuD%2BnrkPQw1hMQl3G1s0XKLyWQJ65a&X-Amz-Signature=eb867a2b7eac9833e3054d950ca266b76e3a1a0dd7aa83bdd183238e52e8e2fa&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IG2EK7U%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092620Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQDhUOR9rr0hZCX6H437Sfs8rBSNGh8s74%2FjImklR0%2BFawIhAJxSZuW0XeWEnVSeY09R2NZQczAuAsxkP4qTCb6N%2FB7fKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwHDo4g4QKXRr5vDtUq3APb%2FIVzl6rYaGgpTpORB06C3rkMuhon1Ou3aYDGA0E5waUsWKlwcjRpH1VdV8I1z5lqMAOaUbPXmZQsxzsjp%2Bc3RHodWqiiLLMysDLH6ub4KDfjA9D%2BQ0CbWfoVX09qyO0g4b2PZWQv3z2sBvtyWE0GZ2r51FeGu53BJQc4eEjnzRYngCdpGZW%2FYXXzPdO843kTKDLOg1FnRbta0UgDD0CHEQnFeub5wiuj1Fgipjhjp5TkotbWgj8AKlMthckB20aSuqFdDCBgR4AnKVSNAS74xStbjVDxRtzcMURnCctXXttu9c3FHuIf7HddEsg2obHNO4PPLSYUoh8ry4mqOCJr7iUG3iSQrVoEM9ZZaYUHfzz745Ri0QVloXNLVH5ZdCpmgkEwQk5j1BWU9EFE0xTjZXOOHHY%2FA04S%2BVT78F2WBgMqzWE9i9AB3IV916hw3q2ctuiPjU%2F8jrKd1cHjWWCG0MvMq3R60j3iOJtpS04%2B2wngV7kLyQYRiuLSCLingp3wJc9xrif3%2BB1F134hpjurCKhkTqcRpTIXsPBm%2FBtL6FPsXTEA97nHtfXBhDLYcis4YbFwnFuhTG%2FtRm6N1K%2FVgWLyI5Nqu90HO%2FjnDsaemtEwsSN6goK00NTmfDCR0PHLBjqkAbLb0DhL8UDVr%2FfSmg7G3DLxXwIkf477gvJ31iB%2FtVRZ1A8lhtktRfMDYCZuEIfTDawYivDQac%2BCd7hgYK7kXzmHJhQkvRkO6m8mpHabxpkLeque%2ByFq18eFCXPCNVPdBqpKLojnOIUgLV%2Bl7rURyeHZm6XHA4bQ8SKAFjETL3UWaPXQnK%2FoqQh2M9cCM9eDrw7095lEJur%2F0wZ8bp6w2Vn3UnKX&X-Amz-Signature=b427b7c1b5d402547d1c2af8e0225f7ead095d779cc9c8482a12080687f401ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUA2ZLRQ%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BPcwlBlvaqpQKcKKTVMfxhUIRWDiwwucYijA%2Bq%2B0PVAIgU7JxlyVR0Uf%2BAyYx4JQ6nHrCuRtZQ3rcgfHaCxzGAAkqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC0rNSbpfu5Pmic%2FayrcA18pzrf6fQd%2BVNgoiAqHJ0Bgk%2F8CD%2Fk1vv9DymzOOTlGtmP7wwbp8mTs3BBhR1SGwMxQIj88aT0nnV6qBT0u3d1N3HtGHJ3rPJP7lcIXSq20XyVwTG%2BKjlZ%2Bh%2BC4ZIpKySqN4EginIHsY4dfOqPW4Ds4Kq%2FGDyrdlc8eNHh6tfVEIKKsgFxkIOzeIXw6o0P3ArYVpSxxWRTB3x66b988V5h471hz7mBRnbqS17pBg5jnZYxXAaQTTQsDI9gkFtUD82iF4lvAC%2BF%2BvsX19kjiktGTVgmUcdZDLAixMxoVagJjzPqxoEpKKSW3d3ayA7AfZzaGjCde%2FQ7f2FgCibhgS%2F470TSeWocDmeiZwdcdDxWpLWZoJarMYuYVKgjfu5LD5dE3nSkWfsIp2yV3hsWTrrCHcyeE6VFo%2ByvOQKtzTLJAqfCB%2B%2F3MUBgONS7KMaUJ%2BxQFM%2FUzSQcyQsVkg9uu8rQeuIN2EssieEhghEbqCQOC7Lj7SZF1UEFinEo0RZAl%2BqkBDy8BrIDbDzvW0EGvKsacSFtu8MzPsRI2IGGRCIXSXXi1GWp9IonCvDuF2dyXwyYR%2FKO%2BudR%2BCcEyfdWJRI28N9BKWR5eue97xBDcNScjVBeWk4WdYrjQp%2FGpMOnQ8csGOqUBmNBIcx8D7e6jRs0dE0wkJwo%2FxU3U8YVMWNih0Vt%2B4isUqW0l9scjPugypP3ZAy9zwHmwGnrUl6uIAkAZIscat4j%2FBigMS63HLjvhnMwe3jM1pxee6v0BJyfusFq4%2B5H12ro981rfTpZrAzivib4Cw9IvzelXQ3c%2BzAr6oBIZbZBqP0PEKB0Io8yTynGDLvjzq8FUaSEH9WV%2B2L%2BJ5sDfR7wWJ7V6&X-Amz-Signature=dd7add54472902dd6c947f55a66213d7ff7035743c82453026f6a658eaf76670&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UUA2ZLRQ%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092621Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQC%2BPcwlBlvaqpQKcKKTVMfxhUIRWDiwwucYijA%2Bq%2B0PVAIgU7JxlyVR0Uf%2BAyYx4JQ6nHrCuRtZQ3rcgfHaCxzGAAkqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDC0rNSbpfu5Pmic%2FayrcA18pzrf6fQd%2BVNgoiAqHJ0Bgk%2F8CD%2Fk1vv9DymzOOTlGtmP7wwbp8mTs3BBhR1SGwMxQIj88aT0nnV6qBT0u3d1N3HtGHJ3rPJP7lcIXSq20XyVwTG%2BKjlZ%2Bh%2BC4ZIpKySqN4EginIHsY4dfOqPW4Ds4Kq%2FGDyrdlc8eNHh6tfVEIKKsgFxkIOzeIXw6o0P3ArYVpSxxWRTB3x66b988V5h471hz7mBRnbqS17pBg5jnZYxXAaQTTQsDI9gkFtUD82iF4lvAC%2BF%2BvsX19kjiktGTVgmUcdZDLAixMxoVagJjzPqxoEpKKSW3d3ayA7AfZzaGjCde%2FQ7f2FgCibhgS%2F470TSeWocDmeiZwdcdDxWpLWZoJarMYuYVKgjfu5LD5dE3nSkWfsIp2yV3hsWTrrCHcyeE6VFo%2ByvOQKtzTLJAqfCB%2B%2F3MUBgONS7KMaUJ%2BxQFM%2FUzSQcyQsVkg9uu8rQeuIN2EssieEhghEbqCQOC7Lj7SZF1UEFinEo0RZAl%2BqkBDy8BrIDbDzvW0EGvKsacSFtu8MzPsRI2IGGRCIXSXXi1GWp9IonCvDuF2dyXwyYR%2FKO%2BudR%2BCcEyfdWJRI28N9BKWR5eue97xBDcNScjVBeWk4WdYrjQp%2FGpMOnQ8csGOqUBmNBIcx8D7e6jRs0dE0wkJwo%2FxU3U8YVMWNih0Vt%2B4isUqW0l9scjPugypP3ZAy9zwHmwGnrUl6uIAkAZIscat4j%2FBigMS63HLjvhnMwe3jM1pxee6v0BJyfusFq4%2B5H12ro981rfTpZrAzivib4Cw9IvzelXQ3c%2BzAr6oBIZbZBqP0PEKB0Io8yTynGDLvjzq8FUaSEH9WV%2B2L%2BJ5sDfR7wWJ7V6&X-Amz-Signature=f3dfd0942786a800df50dff428116789c0f3ca3245ecc2105c4c94bec0c13919&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466U4PHQVAK%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092607Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDHh5A%2BmctZoHtx5Seh1XAXj1sAiRZP0K%2FyBLrSAAFsRAIgSwedwhS3PLREUim1aO5uiOFuANstugXFa5VhJ7oWU28qiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLWCNfw64%2Brrq19GlSrcA6j6QRRRnT4eLRpiih2UGTqlu1emasNhqolLRnHuZshUdsN%2Fqrafn73vTLOC0XraOr8aS5b9rovgEv2YuExsKVzGEf8xZjKRaRirwrFpL15RFXCFVwfjOq%2FlLS2L8A%2BLMrlgEakJ%2BliSNDklyeISj7VEWq4Ci8fjK87Gg9tH7qotG%2FDg7ilkbbG8LPQcI6KIVE95TIyqM59JNrSWPpsQTg1Cq%2F7a%2BOYeLe%2BZyGKS3ANwzGJNZqaVD%2FVET7RhyqvNWnmQetAo1qRj5CiWjE5HLbsAChNU7RrqVJdR%2FhS69Ef2nj6wiDgGb%2FsPiuYwV1nfVYk%2BQ6qNuo4zjUaJwsu60yvtQz7V7uJI3HL6ZeFQ8tf%2F%2FltsybfJEl%2FsAe3ArMJ%2FBHvNgTdFAQY8VYwbNlrF8ha2DTfOPjPj6V9BiANJGRgmfmgph9PRNuBhtcKp%2BrObv%2BRLsPX2cCz%2B%2FT7pEiFTCXoDeSN0P7cyzVpM29CPNV2lY5PrlHWQ2yN9IKrGNlFgmi2s2FJxxeFZaGsS4%2Bhugxyh5k6ALa0TTZ3l3HbwBF3ZlAyQPIfaWFD40tQ3QptudwSUiC4SA%2BqWb89GERb2F8rzeFIP6EmtLUXZEyhaLcEXjSBxJlU6zVqFWuArMJTQ8csGOqUBbCcx%2BkTdcYx7wUhb%2Bt5qTOsFTO1LSYBfXh1H79kiZcCPLPQulddVrNvJN44UJndiWuaFhb2OYPdZ1wav9x9KhA2HssBZa7ngsjC3W1p8eaItCseqg0UYKCHrZVNKXoPALkhbGAI%2BO0AbIayDORP54VeR8Efv45QUcJkWLOKYxkKzIqgffQuhAN6puACOHcTmZLCoHBQOgUIDA7DekAjK8CN053i%2B&X-Amz-Signature=ef9f9d56453b667f1f753a654c20e734e6e1d1076e383b68345cb986b83991fc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D6MXHIW%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCc%2FECafHqeGTn2c1WgZ8sTJY5oyxeyBb0bUPzA5jlxfwIhANRTrkLcPIYUcGsJLAa6j9jkw5rblhVKisrs8Z3Q%2BpOQKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy4BPaz%2BbWdoCF1m7gq3AMFCLpBNzDPnp4RMG6d7urQdJWApKNvp6WH7RKF%2FeuQULksBzFFRvbaAPmvIgsBT06zNp%2Fg59bOtpyyuGsrbLqBjiYQ%2FvEaQAY8Fv5qECry96Eyo3J1VrhFqZaxphsxStO2vfR%2F5Pjr3dT9IuqqrkkxhEJcXqShQARuc37ekJoJWlE7lulaEC97Yj8Y0Wh%2BA%2B8jPEFXxZ2DqS7Zm5c%2BadevhBxpc527dUVS9kypYe%2FSII03r6%2BP502l25KX79LQ%2FDUG%2BZCKjRoizu78EwmUrSmF01PVF34F7eJg03etOue%2B8gON%2FvyZNN%2FVYlxT3Ko1R%2FAugLUV3V1ouhEi2id0BtJDbSH1MSgV1lelYa7BXb%2BJ%2B1JYdVHsns6gRYrWNHfq9Yjv%2Fv%2Br7GiPhWETWvc7re49fk1nBPMuESFcfHYq4%2B367ONc%2BIEKhZ3yPT8FSkZsiX8EaSCWx5YtY%2FzynUF%2FztJ9YWymSxFJ%2BmFtOMdPmSPfMjpOMcejfKXdOf69eghJUum8lFsC5cn6IJnSUu%2Besn9xBMDyyOB8mCWEn9t5eOMUGTKdbO8I%2FtfKT4VoJv8MHz%2FvgYt7tioiYVVaHXMU56Za8B3QkfaCxdr5wWvTVAVyN%2FANwCXQrEI9odlWrzCa0PHLBjqkAY%2FxCFHxUI7dhfaT87OHJ9iW3pSrKBAl8%2Ff1hyHgiKHpPN2u3jpuAEc%2BRp9SW0QPNA4VCp73%2F75TcKaF7YQRmXyfmYdBvv9Fox4tFjhAHbnQZ4czNdQWPzIMFdV%2BYxwcvbUJuJwIBE32gk0E7UiAXmKE8gJINrop%2FKyHQESpnF1tdbUZ3aLr9L9qTSXX7B%2BZvGSO0a2p2KA8U%2BG8pfPD0ARn2znr&X-Amz-Signature=0bc145a52affac07fed5938d162157ba2bd5888d7349b9068eb208f9b408242d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667D6MXHIW%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092625Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCc%2FECafHqeGTn2c1WgZ8sTJY5oyxeyBb0bUPzA5jlxfwIhANRTrkLcPIYUcGsJLAa6j9jkw5rblhVKisrs8Z3Q%2BpOQKogECJn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy4BPaz%2BbWdoCF1m7gq3AMFCLpBNzDPnp4RMG6d7urQdJWApKNvp6WH7RKF%2FeuQULksBzFFRvbaAPmvIgsBT06zNp%2Fg59bOtpyyuGsrbLqBjiYQ%2FvEaQAY8Fv5qECry96Eyo3J1VrhFqZaxphsxStO2vfR%2F5Pjr3dT9IuqqrkkxhEJcXqShQARuc37ekJoJWlE7lulaEC97Yj8Y0Wh%2BA%2B8jPEFXxZ2DqS7Zm5c%2BadevhBxpc527dUVS9kypYe%2FSII03r6%2BP502l25KX79LQ%2FDUG%2BZCKjRoizu78EwmUrSmF01PVF34F7eJg03etOue%2B8gON%2FvyZNN%2FVYlxT3Ko1R%2FAugLUV3V1ouhEi2id0BtJDbSH1MSgV1lelYa7BXb%2BJ%2B1JYdVHsns6gRYrWNHfq9Yjv%2Fv%2Br7GiPhWETWvc7re49fk1nBPMuESFcfHYq4%2B367ONc%2BIEKhZ3yPT8FSkZsiX8EaSCWx5YtY%2FzynUF%2FztJ9YWymSxFJ%2BmFtOMdPmSPfMjpOMcejfKXdOf69eghJUum8lFsC5cn6IJnSUu%2Besn9xBMDyyOB8mCWEn9t5eOMUGTKdbO8I%2FtfKT4VoJv8MHz%2FvgYt7tioiYVVaHXMU56Za8B3QkfaCxdr5wWvTVAVyN%2FANwCXQrEI9odlWrzCa0PHLBjqkAY%2FxCFHxUI7dhfaT87OHJ9iW3pSrKBAl8%2Ff1hyHgiKHpPN2u3jpuAEc%2BRp9SW0QPNA4VCp73%2F75TcKaF7YQRmXyfmYdBvv9Fox4tFjhAHbnQZ4czNdQWPzIMFdV%2BYxwcvbUJuJwIBE32gk0E7UiAXmKE8gJINrop%2FKyHQESpnF1tdbUZ3aLr9L9qTSXX7B%2BZvGSO0a2p2KA8U%2BG8pfPD0ARn2znr&X-Amz-Signature=0bc145a52affac07fed5938d162157ba2bd5888d7349b9068eb208f9b408242d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UJGNHA5D%2F20260130%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260130T092626Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEND%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCaEegHLDVMl1PxdXpsMzVTZj7GboUGtxP1crLm4RJ%2B8wIgWFvAv%2BNN5KceX806kF8d0i%2FEDrY55wlYTKwSAchXxUoqiAQImf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDPLcFPeYC5%2B6fJeuBCrcA%2BCG2Raq3d7us2VIXRpcIf%2FrLXxiGeTzFtNnd%2F3nUFUALjW4H%2FI4cU6B7Zpvht10BuPgeYztiKp1eOPEXrkEsI3TX64pwlGDE1otwNX84DVa4esa3Hfsb0OgJS7WgobNx%2B1BMtAFB8V6np4aGzsDp%2FNWPi%2Fra4G0Dzj6eGb3a0z9SnuY1XpgAqUTGT0BPeALfdeLKBaVjrseWETL8u6LluA2gwQ8Uw%2FYjdmfdfUloJB5OWrxy3nGbYHRh%2Fql9CBXbveZtv4XObr8Exd0A38lLDTJ7QOkFPQBOx9vcqQ8v7w%2FUxhwH1MeEkOmNdaKfCKUkH31RB7fzul%2FDhW%2FHEeH3AIQws5GqRcIb3MeVR1d1pG%2BbDHj7OLLtezMbaoy12w%2FZHWz0hzHj3gB0fGQ2ZeRMQ0%2FoOJ77pHrZqWkNAWySXui8e%2F8vKKv108wk71yEh44qOajf2G6vKBuYK9Ey4hD7H6TAlpjTGWd4gWUykrAHhC9nbx5rOKNYidFd6S4UB%2BxlMRihjTyCIRELsmReQwVYy%2Btr6Eb0S3HeKI4Rh8thHcl0DLIY8YoNgQSt47vxodBdA%2BmtpCiaxNRgqJSiiUwUACnb8oO%2FKm3SbRVlFyNN%2B7eyW%2FClgVhZoL3AEbWMO7P8csGOqUBPYWyqqmTsF%2BNOHdh3KnO0AfzjWN%2Fhh7VprTdK9sdXyX50yTKtBtjXGD8rTGAjaat3MvzQRnOcRK24WIpgS0nnbbsCw%2FB0jaORFJ247DOgj%2F5Wh2Q1fFdCV9xperM88pz2YZCAH2uToJNlDvlBC%2BfWzz1HkFEGXD1fB1aimxyHylLA6Qx6Tu7a7juXhhgVGVTrxguum3pzgLRpAmXlUaWqOPSdNPi&X-Amz-Signature=86fbaebc874f38d000315c55f14055ce55cc9eaa33a42d9da17189b3021e1324&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

