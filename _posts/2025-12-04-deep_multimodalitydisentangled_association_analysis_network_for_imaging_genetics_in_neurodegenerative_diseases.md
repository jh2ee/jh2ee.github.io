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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJQVOAKS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCICQyWaGo5YIidRHGwkXBJF5vqww8VFILEemYN872j%2FzuAiA8OO6NMZ22BF20a5ooGAi7C4SH1mLX9z3BOxCt0QngaCr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMOyR9M0CrEzqnZC83KtwDhY3rzCfbR%2FpAmNCCbDqxEWT0NeUIzS49uwIlQe15Dp3mpe4DUUqU3BEb%2BYeYJ8NCcNYE1t4BknjMvbPE%2FEMIp3wACCn0mc5TLtxTTdRmgkKAQqQw%2BW6WwW%2B323z8ZJecG2OaYk6M%2FCA9wTWUPLa5hyBZnuEdPiNDH%2BAHMSeGB8TaK%2BPU4DUhZSXQig1tSrdmdciFH6Kaufgpvxn%2BMGsCiQsrsIX1d4P7vvH4eu59ZenF0qAay8aY0QRn7Lt%2FDXb%2Brr0zMiMyAcPD%2B4TaSKfdVINTEfttDNL4MQFzH0hJJpbyw4edyLYE9zALCxgZG59dEH5HK6UnToc29%2BR9nrd%2B1bfKihIycbfDk4HChYnH1uv45%2FGgLz4Ghxnsh5670PuX8zPTXb4RU5oL0aH4EEvP1Nez4Y7UZFyJZCcAb%2F4Bf0NBYRhFjM3djA79C92UBVyO%2FvjGRlluCnpQ7c6aw9MBZczVSTI1K8pupBEu4gmvc0uOj7%2FGyaB9JCOQuNPHxN9eL%2B5Mjp1gfXH0mcEFj81mU70JAwtg4t10Tgi9DLDkmfBu7eRZWybQ6ZQe0IIGp5h5srqfxjs07a6EaHtEupOguGO%2Bqel5DBHFMomWjtULRvaKSh2uqGWkyabmX6sw2cmGzQY6pgGODK3kHtcX1Hl2lHV%2Ft1bhUnqINcpY%2B7m6d0y8TBXEXWMxlCpmZViUoKSfufSLcpPMp9d8Mzsq0ce8ter9HY6QW20LmH32j4TL%2Be8nisLEQlnLrOSdSvKTvUcYOYh1Y3eURA0s8Zh3HKMTBIUZ1KBmESzvnBS5%2FmEl2DItRIb9Vii91JqJZit2xa68l16t8Zbjc1e1u1t8kAqRc5V5rHvPzxOG8AKc&X-Amz-Signature=e2bba9089a167a509b89a4a83d5a59933dd2386046fd0d519050ba95ccc91b66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VJQVOAKS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142939Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCICQyWaGo5YIidRHGwkXBJF5vqww8VFILEemYN872j%2FzuAiA8OO6NMZ22BF20a5ooGAi7C4SH1mLX9z3BOxCt0QngaCr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMOyR9M0CrEzqnZC83KtwDhY3rzCfbR%2FpAmNCCbDqxEWT0NeUIzS49uwIlQe15Dp3mpe4DUUqU3BEb%2BYeYJ8NCcNYE1t4BknjMvbPE%2FEMIp3wACCn0mc5TLtxTTdRmgkKAQqQw%2BW6WwW%2B323z8ZJecG2OaYk6M%2FCA9wTWUPLa5hyBZnuEdPiNDH%2BAHMSeGB8TaK%2BPU4DUhZSXQig1tSrdmdciFH6Kaufgpvxn%2BMGsCiQsrsIX1d4P7vvH4eu59ZenF0qAay8aY0QRn7Lt%2FDXb%2Brr0zMiMyAcPD%2B4TaSKfdVINTEfttDNL4MQFzH0hJJpbyw4edyLYE9zALCxgZG59dEH5HK6UnToc29%2BR9nrd%2B1bfKihIycbfDk4HChYnH1uv45%2FGgLz4Ghxnsh5670PuX8zPTXb4RU5oL0aH4EEvP1Nez4Y7UZFyJZCcAb%2F4Bf0NBYRhFjM3djA79C92UBVyO%2FvjGRlluCnpQ7c6aw9MBZczVSTI1K8pupBEu4gmvc0uOj7%2FGyaB9JCOQuNPHxN9eL%2B5Mjp1gfXH0mcEFj81mU70JAwtg4t10Tgi9DLDkmfBu7eRZWybQ6ZQe0IIGp5h5srqfxjs07a6EaHtEupOguGO%2Bqel5DBHFMomWjtULRvaKSh2uqGWkyabmX6sw2cmGzQY6pgGODK3kHtcX1Hl2lHV%2Ft1bhUnqINcpY%2B7m6d0y8TBXEXWMxlCpmZViUoKSfufSLcpPMp9d8Mzsq0ce8ter9HY6QW20LmH32j4TL%2Be8nisLEQlnLrOSdSvKTvUcYOYh1Y3eURA0s8Zh3HKMTBIUZ1KBmESzvnBS5%2FmEl2DItRIb9Vii91JqJZit2xa68l16t8Zbjc1e1u1t8kAqRc5V5rHvPzxOG8AKc&X-Amz-Signature=e2bba9089a167a509b89a4a83d5a59933dd2386046fd0d519050ba95ccc91b66&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RATBMSZI%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDaCzt6x4af1RiflV%2FnIw7BjsLZOn%2B5vSoE6IuCLAPAfwIgdnQajsGYM%2F%2BUFb1sVJ0WqXv1JWPcYD8rw06TNt%2FKR9Uq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDOCyxBHvwstnoSQUoSrcA6P1rPL%2BWcgOuaqq%2FhwU1CYpk3PDMaq%2FEdwzeqygngHBRTtBi8unMpF4S3ms1Kf%2BBf0leGGXxu8XMnxrc3rUr5cRVFJU4Dr48gDyTfzEtuDzzxCeIh3JvpAH%2FX9nnbOAEE8WyviwwWzrgGJQ7w0vYR2IZ25JKULyQASt%2BWyxaRWLPT%2BKpCGyFh%2BE5m%2BeFsXkrJmfuOlUitxZrmSFhhL6B%2FfLKWAbGpXuT151FmjFxcVJiJH59HZ%2ByzxVJhDE5jUTdS%2Fr8H05ifItksR7Gx%2F2pUB%2B9iZxA5dnzr0NCOleUOWMsEteSEP4lLz2goeevmFVAwwqk129UEv2FpLJ3nkyjoypXx1rrZNMbjBMkwGW91x6q3HhgAAuc0RarWd7jh2a8TEd%2Bun6iE7xk5HvOQC%2B9j5XciFR7AY0ZoTTsg4dvqRNmBSKcI5Az%2BJmUH9TXdwst3IxfrrV8ihjH7hwskzR61SUNR6Uj4thzeFkOp%2BpeTv9fa0Ae%2BcPN7A7IEb5cpNZYJcukUyzz7KvqGzpAKQ4iSlge8QC2YoLGpUA2NrnCpHXODHCm2%2FV3f2n%2BwITuJSHfLVEmOKaFGfzpJ%2BcBm7x%2Flh46dTpy2N2SeIGB5wZcGsxKFOcNEHnfPJ1GdtFMOTJhs0GOqUBQAAOlYOoodmmPohwUV0BzsuGPO1LIOl7Tq%2B4iu9mXHoPavEynR%2BXDdSSAlxdNW4xEcQ6%2Fj3G5zLw8JmJscqGRdLigJ3Ad2vt2xp5Gx1zfMagwO%2FYoCKPPbXY0VvIPIS5mIBO8QepmRcEoMH5aFMdr%2FVXKZlMqtoqmkeRUBp%2BpvBxkIASJ%2FVRJTJnkf4%2BvVorNrbdpdAdMqpOkoBSJek%2BBvjn7sUM&X-Amz-Signature=b2444cdc01cb0bfa7190ab8468b69ed030f9a1e735b9cfeaae1a0e92d66b8f16&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ66NBIZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCQr%2B%2F9kAOJ7qNPYjMaYgujoXvNO%2B%2Bp8dT7wJPDUKouwgIgEVrYFBRf424P%2FlBL6o0i14SmJra%2B2Fniwcix6vRISfQq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNkqK6I%2F9Y2rrYcRkCrcA9bGj1e8jt6j64skdylSqR0zywxbAThi45CBGU%2BEHqqM00p3XPva7wIhJS4sl2t%2FyG60cDdSjQOyItC3cQBltuXN5wfuxLGj8JUWlVuY94rRxc8MbXZpWohNI1Rf3m8dXH43D6TYbRbT4YUmZn5D0OadusTPbgcSnN4LoEded%2B9rsdUNxXvTPTE0jwOp3PViw8oSMvdBRKngj5Sp%2FfVGgY6x6Mo4rqc950RUHzhYZ0ec%2FMGOXCrtmL%2B0TtwAikoj%2BA1Mc9NA%2BqIwmClOnjNenqv3H2F7k%2FBj%2FFj5PVFv3%2FE097L%2FRyvP%2FI6Koe3IaI%2F72tSLlsbwUWydy%2F2U3QqLC3y2VcqbgkFaSoSVmJCVqwpjk51eTXuqaYynbdEoBqsDVh7tlFEfH4yhzNCaSHRmPL7x70B%2F%2BUSz3jNpfoJC3HAMJdhPZREae92EFqstawx6LFI9n9pR%2BMXF8D99qi3CsjmaX69VuVrV4e15mkH0yX5QCbB%2BvImBvbL23QEViBoojsWIJt%2B1c7KYAZIJakI0%2Bi4%2F%2FIpcq567JPDH5frsdCySia6DuftqKxG%2FiiLaTKDh7TDCQX0DLLxp%2BLhvdED5XYSb0O5IOo12fc7ML9yI277yJBBZ339n%2FHV8JjfVMPzJhs0GOqUBVtOjZB8cKm8DPGE8pR2og35RdAzvbj1SqnvPqWpSJ2XdNaB7VgahG97KAvc9%2BEss1J7cremBBjTuWIHXhL9u5PHSTfHfZUpXJBrXCrovzmI5V1hNfzvKGy3mzicRY8zepd%2FLcGUsjSJl6CeKYSN23KWuViOUvNOGFYgSmNQf692T9BHMARkfuVAdtfrdkQpICQpFZ9EYPiqIWBNhhs8stoFokKZS&X-Amz-Signature=86024ece9502a3bc89f21f1c80b6bbf1ddcfaf073bc4e6cc7ce1b1fefb56763e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SZ66NBIZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCQr%2B%2F9kAOJ7qNPYjMaYgujoXvNO%2B%2Bp8dT7wJPDUKouwgIgEVrYFBRf424P%2FlBL6o0i14SmJra%2B2Fniwcix6vRISfQq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNkqK6I%2F9Y2rrYcRkCrcA9bGj1e8jt6j64skdylSqR0zywxbAThi45CBGU%2BEHqqM00p3XPva7wIhJS4sl2t%2FyG60cDdSjQOyItC3cQBltuXN5wfuxLGj8JUWlVuY94rRxc8MbXZpWohNI1Rf3m8dXH43D6TYbRbT4YUmZn5D0OadusTPbgcSnN4LoEded%2B9rsdUNxXvTPTE0jwOp3PViw8oSMvdBRKngj5Sp%2FfVGgY6x6Mo4rqc950RUHzhYZ0ec%2FMGOXCrtmL%2B0TtwAikoj%2BA1Mc9NA%2BqIwmClOnjNenqv3H2F7k%2FBj%2FFj5PVFv3%2FE097L%2FRyvP%2FI6Koe3IaI%2F72tSLlsbwUWydy%2F2U3QqLC3y2VcqbgkFaSoSVmJCVqwpjk51eTXuqaYynbdEoBqsDVh7tlFEfH4yhzNCaSHRmPL7x70B%2F%2BUSz3jNpfoJC3HAMJdhPZREae92EFqstawx6LFI9n9pR%2BMXF8D99qi3CsjmaX69VuVrV4e15mkH0yX5QCbB%2BvImBvbL23QEViBoojsWIJt%2B1c7KYAZIJakI0%2Bi4%2F%2FIpcq567JPDH5frsdCySia6DuftqKxG%2FiiLaTKDh7TDCQX0DLLxp%2BLhvdED5XYSb0O5IOo12fc7ML9yI277yJBBZ339n%2FHV8JjfVMPzJhs0GOqUBVtOjZB8cKm8DPGE8pR2og35RdAzvbj1SqnvPqWpSJ2XdNaB7VgahG97KAvc9%2BEss1J7cremBBjTuWIHXhL9u5PHSTfHfZUpXJBrXCrovzmI5V1hNfzvKGy3mzicRY8zepd%2FLcGUsjSJl6CeKYSN23KWuViOUvNOGFYgSmNQf692T9BHMARkfuVAdtfrdkQpICQpFZ9EYPiqIWBNhhs8stoFokKZS&X-Amz-Signature=727295cab75309618e1d8cf51d796510dbda60658978fc0c58223b16c4281055&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667Z4ARFMF%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDPzR492gYinSuWmVmxst9wiSfCO4DJpog1LkrrFjVv%2FAIgF%2F9MAMIBI9xvHSqqGotbiCLAQKuGVMtNfAf%2FmScKBcwq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDMpl8TesjTlUrI7T2CrcA2XBZoAAMVaiayIwDNitEBOunvPgUbK99uao5OrGvTvNPt3lDwHzsoLQgvAFThmLZ4Hwl2AFquggPQsaSFwfiEWkqnqVL0tdiYI71Tx9Uxp7c0ynH9K0I%2FvvA7XbDc9Pu0iAUywCbc3B1NyhadiVyWKywIWm86PRrR1tPIzMOYhn7sFe2yBiVp3dmwi6FSXIYUYNoNF7ZlvIQZitwZ8vgd9izOuztqJzBTBH9ECzNocGBaOhH3WwuNmebqE3WtZx65D%2Ff0LnzrDjot7adyHbIU3Xic58tMzuuo2wikOmCLL%2BuyNtqAMVqFPAA4BfVjqWy3Uc3VXQ47cN69GUdeb874ccoG2eQmKB6utmI9%2FBs%2B5HdLIUI8uunjSk3NA%2BXZlffX%2FzFC4d%2FYW1t2x6hOo0Wna%2B3baLxKxCbqh304AUjw71vdPrAwM6MzWW%2FGdAL4X5Fadi6GQEVmeyb1o22lehg8RNU6T0Nt3SrqCMhoYChohe9EGqH1Kc5jLZi1XzFUui6eLO1ioRdpH9lfUX1dMzjoNc7KFQDyUQEl3hQHKYKeJjvE4%2FXFrrCPYXcQTvklt40p9Aeqaik2QUkZVOaI1HY7043mQCOHVi3ycwo8ns14R6EoVivcC6GPoSl7FSMObKhs0GOqUBaAEi2htSaEOZkHHAAj4mDwfoAKr1lady5gUa2IO%2BDSqK4pLxy%2FySYJDveF5sQ73cBOmhkUhfca7w24VE7wnqFOwi%2BQP5S2LLdk7ZdwU2%2BIApLtfGGV6wjtn9ojBjowFXQmxc5M%2BbzDVXJdaAgZevuJBGwrc2muGFmlXTG57z2U%2Bxfq7jDCrn%2BN37thANOVJfkPpCgJlqUWTQTJt8UY8SiRykQYuI&X-Amz-Signature=39130c6f0b6b46802a62100f9523ed5b407804c677b705c424e50a460fcb0b42&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TJTKM6LT%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142942Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIBrSSkph0aOqrWW%2FB6f2jKqKNag6yEZrlGIgQlBlaGwSAiEA%2FmtdAG3EsBdF95MkdV8ztJhxrUNQSo%2B70FYaLlEZG1Aq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDDTaZbx46t8COdXAlyrcA5mS82h9Xg7ouBh3CWIx5ZNPO6ljAFC3B%2FUK3OVW2Zip7afV03rHr3vvIdOf6lTw%2FHchPWiuh2t6ooYwn6diSUMaC%2FBQrtxOY32uwHRdIi92bf8%2FQWMura%2FbETNzYg2GYjsbhDkLaJYdhtqPieSI66sDLu5X%2FBPS%2F6BJftZFCD00F5HUSiSkPSL0cjkt9j9JvWBR7qAaRMAVhfNh1Njn5GCq2XKrbrUQ5L4xfKf%2BusOyS1dBL%2BwPe3Aq85Mjed19hDq2QcwyGr1ThLDlqjSfJMrY%2FwVcXnHt6Pcz5X14rIQvnPzGO6vkx14QvI0vfnAQwtt4ChRX2TWPabGA7sLbX%2F2GCxQIE6GciYbc3OGZHNpiK4LlZO8IQbZlO9Zv0qKym92sSyf%2BdJ3CTN9umIbv3MXXrcNd9EolI%2BSe72wRtcimM9QB%2BpvEggP%2BPTnLawoz9qrbprv02SaRB9kG7uT%2BLVUcYLMgyLPZVVWEhCQ712af9EBISvygdpEt%2BokXjK1QUJwGnEEocJj%2FMSfvWoxkLXR0c3RPNQbeoqXqMYgaJxD4%2B0ib%2B9fRivwskW3PqTrSD1o%2F6EzMeG6xDF9Sh2x2RSsDZ2005VKhZPmczvPsG6MqqIpcZ7i2CSj4pfgkMJnJhs0GOqUB26ggPOv6Lklqhur8BIUF9XisVkNbOVdt2%2Fk3IYTlNCYF%2B%2F6IjSGtgtnYxiES0cJYx1eDYDklDdjcbN3HY7DzUNY7wL1O9%2FOcKJUkPhiYdyxtXjgeFlH0Z6MvRN5Ji2I8Y5no%2BM35f6q71coi6uqhQggxN1hlmBLla0TjPLIwOKIsPXQ5cFoo3tt0RE4b3LW0Id51Hmo1xBZEi%2FEsw60buOcCldUW&X-Amz-Signature=b36a92a349e9c1a7d2363cd3ca910bf45b4e5dbaf0b89327dd7a64f25a7de2ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664ZKBUNZ5%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142945Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIFEo7JudQMNP1JXVYiggcBaC1HZK6QfrxPPqZu5Qyc%2BdAiBFnLanVbIMlEtKZeC3Ek2CHktawzB0hppGxtIWPWSIuCr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMpZMwOG2vnCjHNRLhKtwDVh4xDXSG9eSZ2rxM27kRgb73vpGRcSxOiS88IYC0Yf559OG3ZmtKvkS%2Ff38PwIulI07Rro2UicyBInUwuR7akPpKU7GSjvGoK67mpyee823iqNjsrvwBDr8Khe4zcV2y4sLckrtQACBqxLmL9X4zEyav%2BYHzJRWj5Ma6QmMsh7td7Logux9yHY9rSXbnhzIaC%2Bfs8tlTHk87OtteTuBiKPsD8EsOTH9kH7VHMuJVOgzz6DOcQJ9moq3cAXz0xqi3yDb4IsPhMrUTiacJXN173kTcgQl%2Faz7%2B9McpWmOHAEYBIWaYSRoDV266YdTiSgQhMhPr1RN%2BbCfa0%2BwzmYikTNsE18fGewDMrlGEg6ey7cd7kX68vLPb2gCboKiZgTZW8S%2FwmxBR5SlwP6oOUXmEXdLwU4vCytz6hx0VoTrSxjB0A7k7oUVW848yAi2j%2FKP5Xn3GadihoP3b%2BTn2hqvxqfLOeH1upQoie1ZbcjIK9JNmkNn8A3JEmUO4Voifdv1zgyc6dRB0ryMtoxZNTc0HTPQwB2iL%2Fn7uxonl26Y07f0U%2BwXkgFGWd6hrRDZbFBBtgMjAB%2F%2FASu0quj%2FNA2ay1iiXnDn2ut4zujLnVb7W7TFPSaFhlgVntRawYO0w%2FMmGzQY6pgEK1GB8JdnbCGpxG44wSi7ZDbSPbpxG6DKdhwUrg6J6H7BzBPwaBsXxVaoH50Cd%2FwI%2BknTMC2DIYQUbuhi83vhMlZUOLXglwfO%2BO9%2BELAnm7mQ%2FyJhPcjaHdYqFBBqLZSeOVuwr%2BY51g9kHuqaH192a6FJ%2BJsqdJl%2BtVG1ZUOgsGw1%2FikPCnpra1xy3E936Py2BgPPRS0L42fPOiYlHBMBYU0qZzJU8&X-Amz-Signature=e4924b2074ea5109f82a6c7f289eab5f6e9adcbb2aacce878576ae7a86e7646b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG74YSIZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCID7q9E1hmoSTSXb5bZcrAouF9EuZsUz16DfusxB8Y1gIhANU%2FuHt7ju5aOmjjTtcQjweA5MTzKKHHuurjC3jktm4ZKv8DCD8QABoMNjM3NDIzMTgzODA1IgxV5uRfaDeUk%2FTKVYgq3AOi0%2FgwvRrkrFY4G9t1%2BsrdpaLv424IfY7xauPhI0NTr2N%2Fo0xt2HQio%2Fn4QPvicmY9GoR8SrSTd29eHs7hBwVyGV63ynUqWJtKEwEjnrQHLcI1ixrDvAd7OD7M%2FHv8r8dPhiC5dBcvuWtVImh5UUmMV3NqvY8l6c7QBDtJQl1WfRQ19Uq5jcZ0G9JVgwBHKQsU4EKGHkI%2FZZyzeUL3TIZTbJ1lRWBCLitZrgXVXPcnq3nQMDuXyD6TckIKSpBIaookD1KET%2FL3KqtN0gh3cSNU%2F0CTdiPAGQxbSIqUOzHvuhZrwHtCFezBnoO7fxNAlMwJeytk4HS2fJIZikLjI8coAC8ySc4fHkROF9wYFzzRXQi05TE%2FGHnp0PjXBVVd7O2xXo674ItMeC4G1sXwrm1iGUeaWb7T544WdLWJTs%2BZdXLWiUAsME6zIaoQkFya88rVrFEPeT67pNVMc%2F3dGkFf6aMVCeEQuqcAf%2B%2BAaeqmwxhZaHMSv9wkf0SWylQ6ZgFfveSKkQBD7gzfhJ7Npz3JGdRCJBtSzU0nSS0zfsxpWZY8G46ImuATOoazl4y4j2nXBE6wP4aSKXgLdK8FBC4hNiIxfG8yAl19eeoU4SdQ5OSw0DijshDcH5X3aTCcyobNBjqkAdTvr%2B8UW00wHf7FL9Bz%2FUxHaJHBgqUEmaGjK827Tgs7kvT8gjWSFEw3RfNJ3eBV0hE%2B6nW%2BFRkHX8cZrcmKV10bZ3JhtrOMwoCM9opa1oXJBOlriGoPJh6jNgYPAuJCqUkXjgpvyu9oM6zLDhjuIecc%2B6WeTOXmcledMmUbyYeOfExq0vFLE2xtFDaKvhUV8SsKrJFnEfemOcZY9NY3KAfdW4P9&X-Amz-Signature=eb8ce0869cf4d9bff56b36739e8b18549e26fd711541b11c24acc217c5dade1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QG74YSIZ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142949Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCID7q9E1hmoSTSXb5bZcrAouF9EuZsUz16DfusxB8Y1gIhANU%2FuHt7ju5aOmjjTtcQjweA5MTzKKHHuurjC3jktm4ZKv8DCD8QABoMNjM3NDIzMTgzODA1IgxV5uRfaDeUk%2FTKVYgq3AOi0%2FgwvRrkrFY4G9t1%2BsrdpaLv424IfY7xauPhI0NTr2N%2Fo0xt2HQio%2Fn4QPvicmY9GoR8SrSTd29eHs7hBwVyGV63ynUqWJtKEwEjnrQHLcI1ixrDvAd7OD7M%2FHv8r8dPhiC5dBcvuWtVImh5UUmMV3NqvY8l6c7QBDtJQl1WfRQ19Uq5jcZ0G9JVgwBHKQsU4EKGHkI%2FZZyzeUL3TIZTbJ1lRWBCLitZrgXVXPcnq3nQMDuXyD6TckIKSpBIaookD1KET%2FL3KqtN0gh3cSNU%2F0CTdiPAGQxbSIqUOzHvuhZrwHtCFezBnoO7fxNAlMwJeytk4HS2fJIZikLjI8coAC8ySc4fHkROF9wYFzzRXQi05TE%2FGHnp0PjXBVVd7O2xXo674ItMeC4G1sXwrm1iGUeaWb7T544WdLWJTs%2BZdXLWiUAsME6zIaoQkFya88rVrFEPeT67pNVMc%2F3dGkFf6aMVCeEQuqcAf%2B%2BAaeqmwxhZaHMSv9wkf0SWylQ6ZgFfveSKkQBD7gzfhJ7Npz3JGdRCJBtSzU0nSS0zfsxpWZY8G46ImuATOoazl4y4j2nXBE6wP4aSKXgLdK8FBC4hNiIxfG8yAl19eeoU4SdQ5OSw0DijshDcH5X3aTCcyobNBjqkAdTvr%2B8UW00wHf7FL9Bz%2FUxHaJHBgqUEmaGjK827Tgs7kvT8gjWSFEw3RfNJ3eBV0hE%2B6nW%2BFRkHX8cZrcmKV10bZ3JhtrOMwoCM9opa1oXJBOlriGoPJh6jNgYPAuJCqUkXjgpvyu9oM6zLDhjuIecc%2B6WeTOXmcledMmUbyYeOfExq0vFLE2xtFDaKvhUV8SsKrJFnEfemOcZY9NY3KAfdW4P9&X-Amz-Signature=60c8552fcbb629bae9c5a89ba14ac1fe66e8d78c4425a965cdbae160a7b42607&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZPT4BJZ7%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142935Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCQFQ%2FqFxPYc2Np3pPd0J%2FpdLUYcaWYuDI1zgsunvqKXAIgetCInOmEjoMTPyIc81ZkFa60dEIqBYq3e%2BIrNYbajYMq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDANjEB%2FsMrKBHYMHICrcAy4D4sOgObyFB6HMo%2ByelHS5lz4AYcxjyGsd2fujgexJewQcwCne1GbFkRsYkVMcwa75fPnwwh%2ByOy2HM3Bw9sW8vAuO6kFYYYFdvBMmHFgAeEETd0N66qGagh7EV81mFHdh%2FfkrYfxgj%2BvYfaUEdqvbFvkSzAEOWIvWEHp%2FjL4G8EcJ2T7O%2FrvD9e1e3bd4Dls66oxYNxHBAShzz%2BuF2hT4yiNWcLDDwDwUFThCbSjeviksiu52dDTMZQVGVWC1CN7roJ6TTlgPpuIZh2oP3xJ2DoBZWYJKoO4tL6Lkrfqf12FqySaAVDjWXyOMdbtj7zh6YURmFN%2BhZ6m5b%2BAlNyqr3J3GpDCJ2e0aUkkAOO6ofLVmALW8z6ufub12Cgints6oPmMShm4hSym29a8U4DHc9aSXUeKkwy%2BYOh6eFPZKmaHOecRgPLfqlTnWbb6hfWdq7E1LGKxzkEvfc5gph75mX982uhoXbFIL0c99XpvSpPKdIsE9D9TGD8OfwSrWuy4k9ShgDg8uodZuGZmgP3lzrSo94sPnWlEJLzOyCpNfgV4cbP7UCfugzRapPpniocgC%2Fgz11kE64vtKqSLSlC%2Bn9g5i0IONwfxCzzi3rLAnBjenvSUQlVzEkrElMJ7Khs0GOqUBKTKpiiT3WSQJpe27lugIaoHEfZEXD5YqeAn%2BOpzuE1pJNRf4dl4HRmQHiNXHx8Y%2Fic8%2FuibyX%2F44CcphGEQRxQCtfzLXzwyADkNYAw2VuUTMpBrJdXFtqRA5oq18pk46eVyQv12kFtGrLpj13UZ7oxwjgjum4nlJLvLwMCFbjEetLYUzdQdiAk7%2BnNZP2TSkMCWbSXu3xmN7fl9yZ4oNJzTCJIlx&X-Amz-Signature=ea1d32533aaf7397d0e187257d46912116969cf371c9392a3eb8cbdea872b18c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB63F2SS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIFtGmc566PYgMPrK3V04k%2BqdR6mRdX5LGEDYl78%2Be1p4AiA%2FdAQ0c7%2FA4HxO94o3djcsTlGHRP1Xat%2FN9j7gQlCwDSr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMmBBBsgsxaRUG887pKtwDH9pLNho1Nb5RDYi7Srjs9eQ9i7xdSXt3D5yFhjNS505o1HpbiEa5l8dXhZnO%2BPVIhSNogJqxpFeHMLm4RmoJMjWE1%2FLhZm1cnzogQ3H9LEA9zHNDQiXrs6%2FWnJnUyyqf2mh9IQCg4z7j%2FLWKY2AQ2YqOMp3d2YRM84I0175bYNauEpBc7Rrm6tm92sQhqJqpMf5oaoWL5bU51j%2B%2BhQ8w0lopMr42AT8S8Z4F6FrLY13h1OL0SUoWkjnxZwrGElAIsga%2BquonbEwTPn9NlX8LYXKxLyV9BtXIIZVF16EsIW2XNfFnLBPQ751jUfyzZ%2FKy2Cpv%2FRF4z%2BvWSuUUK5lXRo7JkzIPVftNVuPhWOqXMlFIfqNbRtog9seYlEYImsguXyy1cT%2Frfdrkq8j56Btg7ChApKk5CTm6w7CedSWjSdzJ2YM6JVmPK%2BkNOgrrXEoJTNIKPYLtjfuyOzRJPsXpCWzac8z7VtSqF5Th3sgNq%2FVGs11Z1I2HETXlVHFNtvZplP8meqxOX8firPGzvOUBAfoa88YM7JiRLLPtrGYOdKY2zL6qoBKESoir3yuBTmZKKOTSy3zxStEgfje0ZrtMnEei7%2BbBOTglz%2F%2Fori84tUWOaguj%2F1flA2BW604wycmGzQY6pgFJOaW3Cn2fMBuEJDzI%2Biw6%2BQgxxq6eriybFc2dbPO%2BorwHVD7cj%2BpTuIJ3UkUHIXh6NYq%2F16bcElEMBBH0Of1tW6KKjYkHunQobPFUmJ1xl6pdMfn9JRMDTie2juJoGhBNWPJnqLk6AMWZnm0hc0o0xf6X%2FL6hjU3G9raK2TeEAdd1uApd%2F95nqwiD4Vv4xKhNB1%2BnDuutO6PZK%2FFgjwUTA%2Fj%2FA5oF&X-Amz-Signature=60d6de9eaf045c514837b93181c413843c1b5a7d9c5d53657dde0c70aa5933d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZB63F2SS%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIFtGmc566PYgMPrK3V04k%2BqdR6mRdX5LGEDYl78%2Be1p4AiA%2FdAQ0c7%2FA4HxO94o3djcsTlGHRP1Xat%2FN9j7gQlCwDSr%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMmBBBsgsxaRUG887pKtwDH9pLNho1Nb5RDYi7Srjs9eQ9i7xdSXt3D5yFhjNS505o1HpbiEa5l8dXhZnO%2BPVIhSNogJqxpFeHMLm4RmoJMjWE1%2FLhZm1cnzogQ3H9LEA9zHNDQiXrs6%2FWnJnUyyqf2mh9IQCg4z7j%2FLWKY2AQ2YqOMp3d2YRM84I0175bYNauEpBc7Rrm6tm92sQhqJqpMf5oaoWL5bU51j%2B%2BhQ8w0lopMr42AT8S8Z4F6FrLY13h1OL0SUoWkjnxZwrGElAIsga%2BquonbEwTPn9NlX8LYXKxLyV9BtXIIZVF16EsIW2XNfFnLBPQ751jUfyzZ%2FKy2Cpv%2FRF4z%2BvWSuUUK5lXRo7JkzIPVftNVuPhWOqXMlFIfqNbRtog9seYlEYImsguXyy1cT%2Frfdrkq8j56Btg7ChApKk5CTm6w7CedSWjSdzJ2YM6JVmPK%2BkNOgrrXEoJTNIKPYLtjfuyOzRJPsXpCWzac8z7VtSqF5Th3sgNq%2FVGs11Z1I2HETXlVHFNtvZplP8meqxOX8firPGzvOUBAfoa88YM7JiRLLPtrGYOdKY2zL6qoBKESoir3yuBTmZKKOTSy3zxStEgfje0ZrtMnEei7%2BbBOTglz%2F%2Fori84tUWOaguj%2F1flA2BW604wycmGzQY6pgFJOaW3Cn2fMBuEJDzI%2Biw6%2BQgxxq6eriybFc2dbPO%2BorwHVD7cj%2BpTuIJ3UkUHIXh6NYq%2F16bcElEMBBH0Of1tW6KKjYkHunQobPFUmJ1xl6pdMfn9JRMDTie2juJoGhBNWPJnqLk6AMWZnm0hc0o0xf6X%2FL6hjU3G9raK2TeEAdd1uApd%2F95nqwiD4Vv4xKhNB1%2BnDuutO6PZK%2FFgjwUTA%2Fj%2FA5oF&X-Amz-Signature=60d6de9eaf045c514837b93181c413843c1b5a7d9c5d53657dde0c70aa5933d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667SMO6XWL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T142951Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIEEsnRkaPiqTO7mKqhKogiRwFgj3ae7F4eFoH1aE8YrVAiEAoIQajkcIECE8g1vqspQVmKuGKmIQCiMOe61%2FFPit%2BVQq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDAYxEMTNEfJvsQg2ZSrcA%2FBTTTj1IjM1RF%2BuzhOjN%2F%2F%2B1523984fTGjTTW5kr5B8PbS3Bh54OaX1aibd%2FJIe9LkfGZ%2FAl8aRGR%2FVdOtvFzdTejF8TFkxYtlvjyzTysUNQ5ep%2FsJQGW8FLZbUqY2v5UyZUjz0TMa9ntaGyazWpRTVQkm2%2F6GsFLRJf3nTDCG4PeClocZuOwFsUEn%2FqdzXCR9pC6WFI97AepytiUYn78GbQ9e%2BD8MSlY9%2FD6RmMTncV%2BiyCqXA6HN1tScRhCilQI21rud39noQCvMcZbMmKVefBIIudFIzgJVwwN4TM8to%2BOb6Kp9qXSTKzqykZnxKqbKFHdxv4V5fTYqfu2d0qj5aJpuuNT9uFd8QQgkoPCnpIk6z1IRkodD1eNsHNIBWzY4rM%2FY9Seig%2FlUBF4Bzl9nOy2ylgzpNwfY6pxM%2FgAScbfuXp8x%2FEkoEbHFO3XJZhj0QAfRwWDYzskef2xZFTdpR5IbW1yl4refA1wtije9AZyt3pZK%2BqY%2BcB0TmFlIypMBHI3hL3jIX1L7dU2pNRrRqBVic4cbffcq%2FUXe0gwe31biQVB0uKrUvuBNhw58jlh%2FHaZjtRzG78tbLZDFQxIXKNZ8LO9HpgdrUaTxpJzHTre3ZW977XxDc7ewoMJDJhs0GOqUBh7m0rb3%2Fm2%2BDvXbLR7RtEliXFf43nHM39jqGopts82nbp8KQFC63OoHpMsWTw6jR5YYhu5bO54gWxdP5OiCXinBby3hVXVejntrMj1pycsxAg9fwx5R5JujpgxmTxpZfH1seh11dQvSKHIxW1f4XSAYVQSKosZ2%2FZAhqEbMsckjI%2BdiXSgWSZyBQUbRUaPOIKbc38etNSBxGExMVrEa%2B8im%2BGV2V&X-Amz-Signature=de42241525d27ecd22ea6b007baedb042a149a3cb8778a5b536f3423e480fe19&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

