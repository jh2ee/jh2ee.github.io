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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR6VUGWA%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCct%2FUT%2FsHB%2FCY%2FttdniSJD2vCPxNm0bVCW2lCKnfnT4gIhAM0gp%2Fm3Mp1XSNm4V62mtfbOiHc8Nr9ntQIRi7e10xkoKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIDUGNycCSglTEGs8q3ANNYdev7CJmgYKn8J6JY8Vgx9yIjShsGHhH7USlHYaRYuB7sdjj%2FRCe9Vu1WOuNlDjqdrHtC6gWmx53%2BslDWOurBVOK0zRSkkOBPUp4w7OD0vJd8wNHJ7BeHCKIAWkvhDrE6W%2Fh35jo5c%2B1x98Stm%2F%2Fi%2BEu37DfL9zw8P%2BekNVu%2F8nhxJkrTP4JEMhrsc%2FjeJBeTYKfiIbXKq2C2Jr0%2Bp0qWBQ24AuyUzu%2B0KyAH1sFdoliO9%2Bf1AxgFzlrkgT5tM%2Fby6FhcJH3MMuDr7R2qeZSyitj9JcJo0wbbPqQYUyBgE6ua8WqBQAmun%2BCkEBw3XDiJkZnehBQDWQ%2Fii8VI6wg4XR35pIBipmp4SuK%2BiNmCaY%2FSSJeC8ESQTHXDiVleKg5q%2BrPtm1NIklj1Hlm4d3MmWx1MzR9EZjl7wF8g7r3GOVtt%2FNqILjHq54ALYBxNnoGVKtOE%2FDavrKlGqvbi9JOWgfXeo0r974gmilw%2F%2BD38RZ3n%2FuljSHGdMU2yxdKfSrFX57AFOUY72arP4ONSMbJIx3wgsbql24w4cjQZmSO0ejySVa%2B4qb302J1melVNhbULMgYCZhiUq943fqE44jKgTQ9FCI2lR5TyUx%2BIsWkmI59Y5%2Fv%2BLukJ%2B%2BmAzC7rJ7NBjqkAbzTM3tJAtaLlbWgDMWVTwFNkkDFeEZlywtVoW1c%2FVJN7o6FL4I3gpC%2F%2BHNZBfzNbVscqI5jQ3mOit7e2OshI1ZfDtZAb5o6ZeRvyzWY73DODJicVNzyU84n4UsszaJeJYP1X0C%2BQ4wZ2p2F%2F4jZzIpoe%2BQsRdpgK33WiqLSHfBCu1bOsGK6wMQJRMPjz%2F%2FR%2Bxo6NzT8KerLWIJHILHGkkSUzz5x&X-Amz-Signature=240741839ebcc56202833509b2bea8bbd379f65c8859ad2cb25651e1c2c6f8d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR6VUGWA%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031632Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCct%2FUT%2FsHB%2FCY%2FttdniSJD2vCPxNm0bVCW2lCKnfnT4gIhAM0gp%2Fm3Mp1XSNm4V62mtfbOiHc8Nr9ntQIRi7e10xkoKogECKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgxIDUGNycCSglTEGs8q3ANNYdev7CJmgYKn8J6JY8Vgx9yIjShsGHhH7USlHYaRYuB7sdjj%2FRCe9Vu1WOuNlDjqdrHtC6gWmx53%2BslDWOurBVOK0zRSkkOBPUp4w7OD0vJd8wNHJ7BeHCKIAWkvhDrE6W%2Fh35jo5c%2B1x98Stm%2F%2Fi%2BEu37DfL9zw8P%2BekNVu%2F8nhxJkrTP4JEMhrsc%2FjeJBeTYKfiIbXKq2C2Jr0%2Bp0qWBQ24AuyUzu%2B0KyAH1sFdoliO9%2Bf1AxgFzlrkgT5tM%2Fby6FhcJH3MMuDr7R2qeZSyitj9JcJo0wbbPqQYUyBgE6ua8WqBQAmun%2BCkEBw3XDiJkZnehBQDWQ%2Fii8VI6wg4XR35pIBipmp4SuK%2BiNmCaY%2FSSJeC8ESQTHXDiVleKg5q%2BrPtm1NIklj1Hlm4d3MmWx1MzR9EZjl7wF8g7r3GOVtt%2FNqILjHq54ALYBxNnoGVKtOE%2FDavrKlGqvbi9JOWgfXeo0r974gmilw%2F%2BD38RZ3n%2FuljSHGdMU2yxdKfSrFX57AFOUY72arP4ONSMbJIx3wgsbql24w4cjQZmSO0ejySVa%2B4qb302J1melVNhbULMgYCZhiUq943fqE44jKgTQ9FCI2lR5TyUx%2BIsWkmI59Y5%2Fv%2BLukJ%2B%2BmAzC7rJ7NBjqkAbzTM3tJAtaLlbWgDMWVTwFNkkDFeEZlywtVoW1c%2FVJN7o6FL4I3gpC%2F%2BHNZBfzNbVscqI5jQ3mOit7e2OshI1ZfDtZAb5o6ZeRvyzWY73DODJicVNzyU84n4UsszaJeJYP1X0C%2BQ4wZ2p2F%2F4jZzIpoe%2BQsRdpgK33WiqLSHfBCu1bOsGK6wMQJRMPjz%2F%2FR%2Bxo6NzT8KerLWIJHILHGkkSUzz5x&X-Amz-Signature=240741839ebcc56202833509b2bea8bbd379f65c8859ad2cb25651e1c2c6f8d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ROHMZYXW%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031633Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIBOLYfU%2FeCap8VImHPYhQ6bQQXHeIXULI7jibxkXvzfgAiAwCh1cr7lj7zjKqLTmU9xImJmY62me4AYw6ec14uiMKyqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMpQc1cPl22jBWB9FzKtwDBzptycyziIXKvzwueTPMHkMv2BYcXbkUujaxA45J8M3lLKjRRsZ%2FcEW9deHgQ4i8dZJq03zPbflRlAz%2BjqpuIgqW3DYCE%2B5C2TeLmHxW%2FbCc42cB8COprxnZ38T6dJlV6qCVhvIxpVW5tcVq4HYYi%2F8J32JScvQ5qfBNvRMazk4M7oyl%2B350Hlqlzo9cSGWjtFcYEMaN%2FqZPLcWHQljrrVueFilIet7RG0%2Bpnrk1alMY6w3dEp1A4vIie9GshK%2BSNhkEIyN%2FfwWex7kiNXEqV%2F07p31VxGyWNxcJHKtwZzQaUjHmdYwHj8c5jGr3q1kNPximOjlH%2BXBqJKcWNMhcDnd5gGvcgjFmrWHDE9nkr7kSaUWPq%2FV72Z6sJOHnA6t7onelMdJ3qWejOFPPSld80O711lxNY59wMjWFjEJ%2FNBRbaKllZDcu29ts5NtB3QPEdhQAW5HpGqhcW4%2FGs0gUT9YGR0qCF5DioECHcKo6mROHo%2FlKmniHqxHagRb1P9xnwF9BWF3uL9DfnZFwHMCsD9OlYftSfkG4uSMAu0mLg5ov78k20Zq88Us9D46OYJBCSkO21otswE8mUZjh6HvNQFp8IWuIr21FNC1dxyVubKZ3hcImqXPUsoptThQw1KuezQY6pgGQ79mM76be0O6KU8mBRVm%2FDiV6qIa0B7of1CWhOtiTzKhaVGCRdEBjkcLqgZyaEeJ6V9Yf2UUlvVzJl%2Fusg7U623Rq1wlS%2F781UMJ8zdeh5L0QS7RJhhgV8Hwb4XSfedcWpITk47LZKQ3N5yRHOMcbXV2fsHBdo54bx%2FhqTBgpWVfYFtVYDTBiBe8FWw7L0KLmi%2FPqtLTlkc0ohtKVvvpUXFlXY%2BfN&X-Amz-Signature=40f13f1e3c78032ab4d9c6fbc6f241ef35d7477203457b6e32ed37db54650200&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYZHT4A5%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDA%2B388Z3bVu82b%2BmWsZv1MpybXW6I2lS0bU1RRrUJSlAiAdhdwxnY67JCjP3Q0pGaxqDphANiA7eRozn%2BsvNPC4ACqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXUi1dttlK4a5lgTiKtwDLXoJIDT%2Bco%2Bny0HvyRaY9JWrK6kWsuxwZAg3X96C96ItJfg1XdgvZKYsAQCfyw4H%2FG9nxLhnhlgB4YqfCSJjFG3qDlZuFn1tR90LXDf8h8ejomXVolqRV8o3HSujEUb4x0wUWSaD1z9Hd3c5Th7xiod1q1jy7Dm3aa6Il6cfQe9AEISozBEMb6K1AfXQMY5wMbvZCRoH7zoR77PHVYQpFqrcv2DsGX8CzLGkag35MM0W8JTgrECwWzhRTbhhxhGmgPTvGcS9ywynz1B9etOvDQUSwCkWSSVvSMjQu7R98m%2Bl8F%2Ftak%2BmQjVX72J%2BP1FmLQwDFuWdlvzDvign3lxb7TSQbIVoc6CtX76ce0hCJcD5sXyMjqIxWkfXEdCvSCiTpdM%2FsfBV%2FIlr8PXpVELJP7kY68bsgiPDGjDcevUWgBSEKBX%2BFXIrxsSiQuYO33X05%2FJzpGN%2BssRQngTd6DnNmdbyRrAhivy5L9tFRwLagjj7BpR0v2N%2F4PBwfk4YgRaAGVBANqbEhJMxom4FSZpevEWz4SUZlFee8PbMNNnOWh6n2ckY8Bqi2Vd0M0u5nTywjx7HTKBaZHuGeUHPcAR%2F5Tu8e18Y4hAYF9403lyzjKbm%2FU6FRZlkCOpCn%2FYw2quezQY6pgHrf5FlZQE9G9VoNM6at%2FdXFP%2BLWFdYHi59O%2F%2F8xXGJzE22lIfMurnnoIwTrY8zQAG2opSYiO7G8GWjBoogi6LEdO2GywYlifUqrZADQU8eH9XYgzVrmj0cLwMSJPaHfl84Kr%2FVM8zPjF9%2FZW%2FTxZqfoKi3OPaeozVk%2B2pZijYfmdS8iFXwdhRhiSUR%2FgAyA6QvGV5u0vqpmfAixROJWa5m51uuZ4j%2F&X-Amz-Signature=f7d892b5014aad0ebc2e1150177a1cbaf67eedaa7b01ace71786fda9a02c4b04&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YYZHT4A5%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031635Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDA%2B388Z3bVu82b%2BmWsZv1MpybXW6I2lS0bU1RRrUJSlAiAdhdwxnY67JCjP3Q0pGaxqDphANiA7eRozn%2BsvNPC4ACqIBAir%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMXUi1dttlK4a5lgTiKtwDLXoJIDT%2Bco%2Bny0HvyRaY9JWrK6kWsuxwZAg3X96C96ItJfg1XdgvZKYsAQCfyw4H%2FG9nxLhnhlgB4YqfCSJjFG3qDlZuFn1tR90LXDf8h8ejomXVolqRV8o3HSujEUb4x0wUWSaD1z9Hd3c5Th7xiod1q1jy7Dm3aa6Il6cfQe9AEISozBEMb6K1AfXQMY5wMbvZCRoH7zoR77PHVYQpFqrcv2DsGX8CzLGkag35MM0W8JTgrECwWzhRTbhhxhGmgPTvGcS9ywynz1B9etOvDQUSwCkWSSVvSMjQu7R98m%2Bl8F%2Ftak%2BmQjVX72J%2BP1FmLQwDFuWdlvzDvign3lxb7TSQbIVoc6CtX76ce0hCJcD5sXyMjqIxWkfXEdCvSCiTpdM%2FsfBV%2FIlr8PXpVELJP7kY68bsgiPDGjDcevUWgBSEKBX%2BFXIrxsSiQuYO33X05%2FJzpGN%2BssRQngTd6DnNmdbyRrAhivy5L9tFRwLagjj7BpR0v2N%2F4PBwfk4YgRaAGVBANqbEhJMxom4FSZpevEWz4SUZlFee8PbMNNnOWh6n2ckY8Bqi2Vd0M0u5nTywjx7HTKBaZHuGeUHPcAR%2F5Tu8e18Y4hAYF9403lyzjKbm%2FU6FRZlkCOpCn%2FYw2quezQY6pgHrf5FlZQE9G9VoNM6at%2FdXFP%2BLWFdYHi59O%2F%2F8xXGJzE22lIfMurnnoIwTrY8zQAG2opSYiO7G8GWjBoogi6LEdO2GywYlifUqrZADQU8eH9XYgzVrmj0cLwMSJPaHfl84Kr%2FVM8zPjF9%2FZW%2FTxZqfoKi3OPaeozVk%2B2pZijYfmdS8iFXwdhRhiSUR%2FgAyA6QvGV5u0vqpmfAixROJWa5m51uuZ4j%2F&X-Amz-Signature=be8b95652162ccaca0f17a8054ef8bee414e361fbbe61a429326d757cf52abc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q24SGXHJ%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDtAHPQNLMssoGsrBnujR3%2FBBvqeqVUh3FMNMvEUqj3fgIgA3SatuCkHIPjeT4eA31y2VkMGgNWJNEGIIu6lhxV1AMqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOPSfgFYWvy7d4vs4SrcAzVgavvrR9bUT5t3ZOp307x7KAw%2BHesUQLcsV3Gl2VJxmex92%2FoJWQKElmKr488non9lg4ub4PE7myF3VZ5pSjUOxdY4xCZ1odWfRKyenQBLT%2BEffI5K5sR8%2B0PbLqZUoawhXNLuBZgP80txk3TgdayYVxyy81j45EgD7AnW%2Bt5zbHRS%2B0IWM2%2BdKLB9Qrvw3dexf%2FOFQxzfXYjZRoxhBveTBbBM85hm5%2BlyDl4ZcT7mEP18zo2Gv1p2eVGUaVV4E2vRlJud5Jhrfuy4KuGNd0Vo4G6mj24C89zZsXenC067FswpAvn4yTWdZ5LrI1kZhGYKPn1cG%2BxtyFKlIFZ%2F9hypYHWhZGHXJxpoxhl41MnrwuwXOL9lP3cq2lZ4G6l98KaKZv20hI39M5ZTMJT3X%2FXjxPRlkTIeCDzJHqOZdJh8B%2FjgTIHTOWszS%2BVgCRipT6EXhN%2BaXGka2WMXW8p8rIuhhHYS81QXeCzuGkCm%2FyVj0oBPmskUTwUNml9SAL4chAR%2Fz7rR6ROcjmknIyEcwxxXgkHXOHcXFj6Xv4ibmAk%2FhHsFSNNsAvh7LRboYz%2FKFvUkh1iKDzOkOMA4ge6KxdqhmQvE2pJRagBhF2Q2bU9Hq%2BqCPlt0Q1skq0FMMNSrns0GOqUBUuB2PySA8v4c%2B0kICaNH8mgs%2FptkqWKHT1G0HtMjeRQ3JDSNjGFveWhVXYM9LHtUsTaqeij7FcxZ61fFtOET5jX9bQ8ltFxsUb9h%2FCfkE4d9JT3wATCNxl5dhxijFQTzSLdehpRCvMOBxfYISMG6zlIzApJVQi1UgTEDyFcVYdS9%2FFDHOj28Qyq8SnFgM3DgKMosFrgDh2%2FTdXyg3vMaQ%2B0X9tX6&X-Amz-Signature=363a66886ab9ac1a127b1b805c321739cb9f3ab4d07a9ea161fd083778bf60f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CMUPUPZ%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031636Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDd7ChidpRfj4XnC%2FbBg66pxdiMyPYNXWFh%2BoYzEbRaSQIgXx%2Fdi7GcjQhZmSY%2FITNrDNLvB4kkFBPZhXhb%2BKkJs%2BwqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD7NKAvqULMggSuzISrcA4K0teA3Ut5jwfnNjdgsbcQA%2B8rltQpLQ3FcIpuBEuqGLrrUAzLe%2B1sa4cvWBngkuDRWc35pYe1HlLqzOGEjIoXTsO%2BkANtvZXJJFvrpbZiliyzAxwhGZm8JD1D938S%2BgBCblQzWbd7sgulnWwlvTr3dEEesAqX0wKPfshqMPOXRyw4Oj3EtBPqm6FuTC6BSG%2B4OAfymJnURNG1414bm29W4cjPyudC5FvFbVTaDsD2DCAw0kGUKmgiOAoMWc34Br5o8MHtxx8a75xrMzAM5L2suz%2BQQZjlf%2FhBfHPMFcFsskcRphXo4VXj2QHMHCn2TyFV9KJBhYp8gnRKa84efZWYymq%2Bna56nHGoHi5mRFIbJRVsJMAVoq9ZxN0fqoZ9X8LTfIhXNk9jJckXDFKTASofix%2FHIy5Sawgsashg%2B2uY161qiqzys1%2FRyuxVq%2F9sGZIPilP2bKWpWj2FLeD%2FVadNaPKiAQkhUjREXqWleX%2Fv5DS2Xy8ppswJeneMbrD2ASMjGy61%2FDnwKovkBvpqdv13mYvAfQoaeW2R6IhPKlIFuI5BqZVJwL4o6HSKc9qL%2FQ5d2sl%2BbDTo5HZFn%2FbfZUVrhNi1AAgc%2FD1U7j2RvIfXaUBLxHYK4nyQwtP7gMLmsns0GOqUBg8BaaBwnE7IVZbYWYyHTVF9yxUWH05y%2F%2BDdlSwEmSgbJrBMDGWpshC4zbVJ4LqS6aMGPlkqfpu7MinuEO%2F5wyw2s4wpnhuTUFWRoiOoDvC1BnP0Cmjp0NPXJjf%2FVECoK1aSgi6rhhJH%2Fr3b%2Br7U41OHuBB%2Bf1iE7Ka0%2FTnY60gtgsAeidJlcqTcfAeim9hvcvaebB0GDvBSyXm3slEnLDlU4ucaa&X-Amz-Signature=49c0a8d87c851eaf7945854ca26b7973e6c2a846d2de9e36aa7a09271c4afb5a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q5QSR7HP%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031638Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDCheP9mUk7E01svD1AwEb2PEgtIYvbIadKPNojDOQkfQIgEeyoWmRm5mjHsv0nJjJHk8xoAaboKqau7KRgCRGol64qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBNnS33J%2F20ql39UbCrcA4qJCOfiMlj6ceh715GctOj2Lye%2B5WJAeu6JG1r8tlpysIzLl0HIoJsPHm0sLwHMp87YZoVD521NCTih4%2Fuq01MsPw5fhN1lFgCvLa5u8CqsXKZlx4VOTFIj4xPRbIcktxc2WFlsX8IMca4YUQavuwz2R6U9tazQFSRbMdt5YZfu6wEK%2Fdtz9%2B%2FnuElgf2me1WtUiQHa0ctzrFxmbF96IY%2FVLGYONeQspXt0b6uAK2988SFDQRHpdIP1rMMkTTg33NWwtz0S98%2FFv7euC5ZgB6TZgm9Tys65hHHkqzbsfnSWc%2B2RlNWMxZkBPcim6P%2B%2F0AKPWhCCx0hsZoByh1zvV4zV5HjTA4w9zUUJS7tZHaXJezXUdZ4zuNx6jwEvrB9pLgzxmpMrn8cwJ8jqARU%2Fpu6wXc0ded8khWu6HmMtQb%2FuxLMwWX4uQQHTtHi0NHqD4WvAZxAj1bWNi1NcAYeCsSaXh9S865bolZi8xypw7NXleb20b8Lj2mI3kP8jmurYn2jEtCelqjF5GPEZrz3Hb0K40ZZeFBkfuRO54A9zo6t%2B7e7XE8bDvu%2BOkbSFcjI7a%2BeOMoZzQa7gg5rFwwhDXJINB%2FcoDFSXB6o4d0zw3gbe%2F4PcdiVVY2sxkhFMMJGsns0GOqUBfjVnpAG33cIr%2BfFJs%2B5qGEJyONTWKUdxy21ldLbDzkugk9zOIUPQEzIt2XBn4uMC%2BvQLKmjxTaWVKdfMgIgSDhjNKbpqGRXAGwJyGEnY0Hms9ONGsO4eoGifDtv0NP2K3NsHkq0mwCkQ7uoZQf7g3qV8IXi7pHbBwk9fJBxAp8noyx7blqaqcMbwX%2BwqN3T7d7IG56j1lQHzJi2vjVRyk99b2mc3&X-Amz-Signature=e595ab6d0b733e989fe1081290f10c4350846d22cc5c89b3dfc9ab085ccfc836&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5F5HH3L%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAgR8Jm4G1iUmAc62auI4mwG29MnxreMGoO%2BZINJrftSAiEA8Ufe9Dpg6jE2Iwh2olxr0PX97yIDvkeFSbrwRjTW%2FeMqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEDET6%2FEDPtvIIXdSircA4MHvWtL186RwJn4Mkt%2B3mlTf4x1pJ%2BdiWeLzYnGP4sNNNGb4S3%2FZwWHQll2tuDauvBqd5KCCeUAiemTmVChypxMaOas4QZ7rQVDNQvpUoBMRR2%2FkrJJ1Xg7L%2FTWoAIbsaL41PnI3cs66sHWwO%2BgO4BX51mHFg0dmaYxJpuPUelMhrQZuKNdSMCU95TBMn7JOO7bAmM1Oh6oba9EdJ%2FzTX%2FSf1KTiBpWPHCyF%2Bh7MwIEkE4v%2BHWCNJq%2BC063eT1ElOgzYKn2RlLvsSMy5pmKMLHPht0eTN%2FYh%2F%2FfRTHAqyZj0O5kTdKJBrSJ%2FERCOewtimkSH%2F7PfNaydieYtMGSfAXLEgS%2B90eNidKf%2FQigK9XPIin9rDX7yRXT7sLnOXCZJjqQkELEalixeFRtgnyZkiHFb0%2BpGLTjGdWI5W4eTRfh%2BJyMFalC3ssrrWWhGHITmog03dnFfi9%2Fc0%2BoUdOk8zloOzXnl6LIXopxJ5t5PeVUUvS1%2Bt3qXtwjA6BzEtm5sls0E33DmC1n7OOggWh7B2msKhHlqEE0GQxOXEkTb4vw4i%2FvTuftrC3UnI26kKzPLv1liGtCAeb9B00rbqsP1OgC8wdJJlxCqNS7pjhUNMNb%2BhluCgqdyXE0pHuKMNarns0GOqUBKWG%2BU0zBE2KxCIiaEh%2Bvyua8DqdJ2aaW6oWz7ZsnYme0v%2BG%2FWXYrlb%2FQXjZIs9Y3g7YOQ7V9SRxdATLWT2djv4VNrQJJUNFa%2F6%2FvDAQmcvyA%2Fg7ZV5QoR4lLw5DThJVfcPLBF7ZN1sKTjBHZABLALcw443OO57qEt5405Rz9N6AJQsYzgGThWugxsFuxx6RGyH%2Fwm7Mlseb2KwkPGswNyg067KrG&X-Amz-Signature=c630700100142ab215ab12d0ef0efe16a4c0bff0e00efa15fb5fde1cf8dc3e1f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S5F5HH3L%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAgR8Jm4G1iUmAc62auI4mwG29MnxreMGoO%2BZINJrftSAiEA8Ufe9Dpg6jE2Iwh2olxr0PX97yIDvkeFSbrwRjTW%2FeMqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDEDET6%2FEDPtvIIXdSircA4MHvWtL186RwJn4Mkt%2B3mlTf4x1pJ%2BdiWeLzYnGP4sNNNGb4S3%2FZwWHQll2tuDauvBqd5KCCeUAiemTmVChypxMaOas4QZ7rQVDNQvpUoBMRR2%2FkrJJ1Xg7L%2FTWoAIbsaL41PnI3cs66sHWwO%2BgO4BX51mHFg0dmaYxJpuPUelMhrQZuKNdSMCU95TBMn7JOO7bAmM1Oh6oba9EdJ%2FzTX%2FSf1KTiBpWPHCyF%2Bh7MwIEkE4v%2BHWCNJq%2BC063eT1ElOgzYKn2RlLvsSMy5pmKMLHPht0eTN%2FYh%2F%2FfRTHAqyZj0O5kTdKJBrSJ%2FERCOewtimkSH%2F7PfNaydieYtMGSfAXLEgS%2B90eNidKf%2FQigK9XPIin9rDX7yRXT7sLnOXCZJjqQkELEalixeFRtgnyZkiHFb0%2BpGLTjGdWI5W4eTRfh%2BJyMFalC3ssrrWWhGHITmog03dnFfi9%2Fc0%2BoUdOk8zloOzXnl6LIXopxJ5t5PeVUUvS1%2Bt3qXtwjA6BzEtm5sls0E33DmC1n7OOggWh7B2msKhHlqEE0GQxOXEkTb4vw4i%2FvTuftrC3UnI26kKzPLv1liGtCAeb9B00rbqsP1OgC8wdJJlxCqNS7pjhUNMNb%2BhluCgqdyXE0pHuKMNarns0GOqUBKWG%2BU0zBE2KxCIiaEh%2Bvyua8DqdJ2aaW6oWz7ZsnYme0v%2BG%2FWXYrlb%2FQXjZIs9Y3g7YOQ7V9SRxdATLWT2djv4VNrQJJUNFa%2F6%2FvDAQmcvyA%2Fg7ZV5QoR4lLw5DThJVfcPLBF7ZN1sKTjBHZABLALcw443OO57qEt5405Rz9N6AJQsYzgGThWugxsFuxx6RGyH%2Fwm7Mlseb2KwkPGswNyg067KrG&X-Amz-Signature=da4be1f446df1608284477e76268039e6f95ec6219a0b784c52d07bbe540b27c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QHSIDQMD%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031631Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDUcPHVoFxvsJQf6fvr%2FUs1gSpMmMQG%2B6cgHDLoI3tdgQIgOmnhIPvnNE%2BT3bvpJXP48%2BnrbrNwPYdXcECeCEbwg58qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJeyV6NfHG%2BsvSjypircAyoTJ15t0yzatFlZDnq0e04BNsb7jsbV5Qkk4aIWxB1JlJ6B9J8ot%2F7EAseLLpNpmNzHh0rQnre8VcKG3ha2S2lEN344iwtk6c%2FORK%2BFfT83%2F%2FWFboUSD%2Fd4G3Y%2FjVT7FVtMeOGAWKy7tzASsM46Z8Mpz7eaarn6%2BVGK7xCVX4kWxajnqBuZkr24%2Buf5K7xHZzPS3smhZ6RUR8EyTvqiB2fbDpGwoISk8dTfvhrxp2PksosjdjTQAEqBdL83J%2BPWBF88OOKE5ljKnfBQqarlr6ravhieMjmBpfXGNxmPyDrEogtqU3ur7nLr05bVbNtOMrgpPAwkr1hUQOZjSz7%2B3hkcpDo38MKsL1iLcbWlYXW2kPIuIbkKdRsFQjw3hgGswtaj9BFjSzw3ny2aCUpn5hUcMHhJOVhRa9ee3SCEHKvD%2Fm7%2F9CQb6wDstGDlXyROfhhoffE%2FRapUnUqh2TtOyWnumkYE%2FmjCnvZjInszhCloI%2Fa7ut%2FGHNsBgS%2Bpkl2BCXCCDCMEuRC1Ror9UPdYCCiXZAaQPHXxRRuI0he5z7VdDWt3svmcns%2Fw1JGtTBrCdjkB2W6Ejh1MeWPonznqNkH101HWEBCnRhJJGWZsz6YWFucE0vVqNsFUdFc3MJ%2Brns0GOqUBoT5nAKRO4yJ6PWptr4wDQqbRr6SH9vxK9gmQ8KSdhqg96QN7tynoP%2BZUPsQp%2Bt6XQrb12U81fL4FkHq1Eqx5NxJMUKxLX4pJs%2BaxpqMn0ffcCOc3B4jLReOh0MX4HxXmZbaPN3HO18sc39bQs%2F90a4hkDwTGgUhFPx9n%2FOjJK1oGhUAyy66oOmdMMZoDXGBXf5Bts8itf01eWPJnGU8stb0Fit9s&X-Amz-Signature=ee94a8227fd17aeb1462f50761f2f435a1800bcc97f0e56c5fd2c2506aa20efc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2IZBJW3%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICUWXXF9ydIZr208T4ve07cljGn26cArvsqfS8jLUv1iAiEA5ZSDjCR%2BPGFKCYoJpL8WbXnP7DIFxVbGYpHJl0hzbzAqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLeY88Zwte%2B6kOQbHSrcA89nFtLyXG7Fnq%2FPChriJRQEU6Jrz3soENlN%2B%2BbSWKxDKVEupRIfarsk9jcWR7%2FEKduCTKepehq5yiAEArPjzdcj1P3RFxigBCwJNOPgOmvuPyOeZCRF7aZk%2Fl3HhIeZ8xev%2FRUS5sGgwMJ7QKqsp7gpLdXsqj7kwBGsOc9kdpm8b%2BtXUVQiWy0%2FQeOg%2FazNYtaMjP0xmGyiOWyLg5cAW1F1IZW2KydLSr6wxSTVia8YFDt%2F2dFnvuVyBz5XU9xBzMy91IL98XKPdJVgkReXzCMevbHQjB9%2F%2BgXYRsv0htam2jb8IJ1fGigJddERblRByDw0LQsu4ebRzapp9t%2Fz9qfEIY98Kp17xj%2BMlgS5bj6CtW3JGH5OS908l0V6iGUc47Bs9J8LD3k0sThqzIMiTABmL9IIB9uRgaiZFRUHJ2KpxZvMVTkX1sltqG7c1MY4b8a1kG1QlsTZjz9cSWpNGqYqP86pYMamxalj7lAouXUQX960WKoupvvTU9FDZQOrg1%2B1IdTH2Uio%2FxCtoYSeJz%2BtsIAmrLs5RWVJ8rZlI0Qpevl%2BYvB3ZG%2BA66dMKvMy%2FBInepibQClxH1iwZ3ltOGEQ5%2By%2BIq6gP8OhouGNyTL%2F46y7xkvMT6xpUnrIMLOrns0GOqUBRk4muExlwSpgVAWgq%2BTPP%2BXq69qF6B%2FYIFAOzycoEoXMs3Hh%2BBPb2cbrH%2F%2BlemJbBKpZS2FipDgGI%2F%2F0BEFGULLqDXDNGUrthOLT7dLC2isBN4ZSjooZ7p%2B1yh5qbJmInobihIbMYCR3QfaDoSoUTOKtM5kwgHVbMee9dAJ%2BCcyZ5e%2Fx%2F0tamH7asx2oXx75YhSsyn6pRWpsk7JH884fjq8Pe2XB&X-Amz-Signature=d1fe4b2bef16d5aba9686dd7746ddcbdb1cd7050e587fabbd69a4a1f9489130e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X2IZBJW3%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCICUWXXF9ydIZr208T4ve07cljGn26cArvsqfS8jLUv1iAiEA5ZSDjCR%2BPGFKCYoJpL8WbXnP7DIFxVbGYpHJl0hzbzAqiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLeY88Zwte%2B6kOQbHSrcA89nFtLyXG7Fnq%2FPChriJRQEU6Jrz3soENlN%2B%2BbSWKxDKVEupRIfarsk9jcWR7%2FEKduCTKepehq5yiAEArPjzdcj1P3RFxigBCwJNOPgOmvuPyOeZCRF7aZk%2Fl3HhIeZ8xev%2FRUS5sGgwMJ7QKqsp7gpLdXsqj7kwBGsOc9kdpm8b%2BtXUVQiWy0%2FQeOg%2FazNYtaMjP0xmGyiOWyLg5cAW1F1IZW2KydLSr6wxSTVia8YFDt%2F2dFnvuVyBz5XU9xBzMy91IL98XKPdJVgkReXzCMevbHQjB9%2F%2BgXYRsv0htam2jb8IJ1fGigJddERblRByDw0LQsu4ebRzapp9t%2Fz9qfEIY98Kp17xj%2BMlgS5bj6CtW3JGH5OS908l0V6iGUc47Bs9J8LD3k0sThqzIMiTABmL9IIB9uRgaiZFRUHJ2KpxZvMVTkX1sltqG7c1MY4b8a1kG1QlsTZjz9cSWpNGqYqP86pYMamxalj7lAouXUQX960WKoupvvTU9FDZQOrg1%2B1IdTH2Uio%2FxCtoYSeJz%2BtsIAmrLs5RWVJ8rZlI0Qpevl%2BYvB3ZG%2BA66dMKvMy%2FBInepibQClxH1iwZ3ltOGEQ5%2By%2BIq6gP8OhouGNyTL%2F46y7xkvMT6xpUnrIMLOrns0GOqUBRk4muExlwSpgVAWgq%2BTPP%2BXq69qF6B%2FYIFAOzycoEoXMs3Hh%2BBPb2cbrH%2F%2BlemJbBKpZS2FipDgGI%2F%2F0BEFGULLqDXDNGUrthOLT7dLC2isBN4ZSjooZ7p%2B1yh5qbJmInobihIbMYCR3QfaDoSoUTOKtM5kwgHVbMee9dAJ%2BCcyZ5e%2Fx%2F0tamH7asx2oXx75YhSsyn6pRWpsk7JH884fjq8Pe2XB&X-Amz-Signature=d1fe4b2bef16d5aba9686dd7746ddcbdb1cd7050e587fabbd69a4a1f9489130e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XMQGIH3H%2F20260304%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260304T031714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEOL%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIHthAiCKSGQQhMWZNKoBgxFWcgIw1mDidrHPB0relaKPAiEA%2B7oj3%2BNap8%2B3o%2FjQZueaFxbwgTonvDfqxqQGJsOIsF0qiAQIq%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDH5VIHChte%2BCsWSKxSrcA8G%2Bglmu%2FjESJx2%2BupPBsiTzNEf0%2Bp8ZCgohAqjr6cCOAy8pv0xXIuGJxci%2BNGKDyXa1Sw8nb3HBdClZbQXrnJ%2B11PhNBMH%2BzBLqwv0x0p7Jw91fPgTYRnHqocCBfXf0kL%2Bzh80q7HD3JpvfgR8U4jrPN6iTzlR%2Fw%2BnRj8k5prPjRL08nnvKJ7q5Uk2Y43CqD0GaOCVk%2F6FbfRBMjCAUejYU63FE2SldCkXNm4hPTcua5DBad%2Bt05IPwWNn%2BA3KzLJky8ISdovQDGQ%2BIg%2F%2B5AT020fnWvm9Vxgpwp4o0tAE4xAk95rpqZ%2F8vdf%2Fgc1YUz%2BIB7PpKyIY3PfCu8DpklQVBB8aMEy5Ig6cbqXi5WTvVoBXwu2ucSThf%2FoyIESQBVl5OqLpq6if5BF7hTHY1PTQHAx%2BG6jQrYkTzLE7lszqengWS47ImgRpmRv%2BEulNoAz%2BVlPhepxPx1%2BJVOMPwfzNLDAADb2vgDv6Hp6zXlYKL0rfyn81y%2Bx5LOgxux%2F8i82H7N6QuNJBSOl%2BFoJ45JEUQzvjuYZi7hIS2ZZWWo2Tr0ArGOygCPCD8rG6qSqnMPw4SxkIAzriIUbZJMX%2FAyGhw8fdK1J7QKf%2B6oaN9vXugnXOT%2FnQhvOUvzRbcMOSrns0GOqUBl6pa0HdiDSOJzLJRUO%2FFZvp97%2FsPTUmYZt3i3DnLXiMw%2By95QNIyB4Qt9tfGxS%2BLJ%2F1fauzWC%2BwfTaedYmEi%2FB9LKqo34z3k61gMDUuGBTOVUJ%2FtNKpf0wbV29yznmT%2FJe%2Fq%2BFjuhjsALEcCj5RtQAZKR0X64sHGfRLaOgLq2ZCuNjczhpMZi%2Bh01tu4voLi9LmK0H6fYZwlvqPNP%2FjO%2BXZVjnBK&X-Amz-Signature=b4a9d61b10ad5387755c8e104994c566148891a97c8784f4c3633a3a65576212&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

