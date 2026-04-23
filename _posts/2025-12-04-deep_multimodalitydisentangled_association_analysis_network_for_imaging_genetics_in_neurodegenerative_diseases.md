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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSP4CIIC%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhLbda%2Bh9ehCPh6M3g01OSjEIIDM2MVY6JAqOBKg7KnwIgLKJrH1Pyp90f0XALAbCai9AAggfq7WmgYcJrhL7HHhkq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDMU0m0qyevpd7tyKbyrcA8e9PxclgQkd6%2Be28KX9X1jdEs7DpBM0C799COkSPlqWJwaLNz08OM35Ciq%2FxSOnM%2BFIyPcvIqTM7GqZmicYmv0jk81NmV2JPLiPd97hQOf%2FvomoVY2ahHjumOguU4dVQlb4OGgOPmlfqd4KNreZZHgSxXfwWE%2BmwI95%2BURUNeoP186KVe4q2tR%2FblIJrYGFI0rLEt0IM7e7yu9A7ABRCbjzkYOhITjS6kvWFuWCZnn74qtZOtzongNRbq%2BXl9L9p6oWLRijFlYDL3Vvw0t6ADxxqWm5vfX%2FZh7nnnG%2F1jp6ukQHdB4R8OeOumTPzne8wSYB3rHvW%2BHNVGq6tTRHsdLi7GI0TW2xrKTk4D5JYP8j9oMiQmR5IsxrTHP6PAVstB5FqfcGRfhRnrKyBpJSiYzi8cV94HsHyJKntg7olKhXrrMvjy54t90KhO8GuoO1iYnW%2FWmCP%2FlFTby3UShtj84%2BKAJtGXNLPy2xlPtWBbznwpWLeZD5e6jlWRPsdciTe44p5NIwIcHSThSIR4Zk6nc6WCr1GsZOMLrw%2FmssLPM0rXzdNggYcUVjKgZBkxTR2NUhDLH8pL1WucutL%2FSe2XsKru8UjllTWkzJURAin5UQ6UH4VRuKZG%2FvYW%2BYMI7ZqM8GOqUBF5WjgHQlHgNZDPT9qvo2So4aIQFsCGQOmhnkBeb%2Fn95dGzqpkv0ltujT2sLhma9x1%2Fl22VhxO8qtPFUitLwVl9GE3k%2FPmEo5xWmi7ZB28%2Bl69gfX3VZ2xUAKMYC4KstDRstx%2BkC%2Fkgv47xoy0IYIdjr0CciLHPGsB%2FIcEwkBHI533ChLZjLQ4iOb7%2B30c6MajZ%2FQW2PIXX3CaNnDUjUJbzT3EJzg&X-Amz-Signature=17ca4fce2ab1abcab545a77ef817e37e148fb2a74c1d405cf3515354ecda3f88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZSP4CIIC%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDhLbda%2Bh9ehCPh6M3g01OSjEIIDM2MVY6JAqOBKg7KnwIgLKJrH1Pyp90f0XALAbCai9AAggfq7WmgYcJrhL7HHhkq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDMU0m0qyevpd7tyKbyrcA8e9PxclgQkd6%2Be28KX9X1jdEs7DpBM0C799COkSPlqWJwaLNz08OM35Ciq%2FxSOnM%2BFIyPcvIqTM7GqZmicYmv0jk81NmV2JPLiPd97hQOf%2FvomoVY2ahHjumOguU4dVQlb4OGgOPmlfqd4KNreZZHgSxXfwWE%2BmwI95%2BURUNeoP186KVe4q2tR%2FblIJrYGFI0rLEt0IM7e7yu9A7ABRCbjzkYOhITjS6kvWFuWCZnn74qtZOtzongNRbq%2BXl9L9p6oWLRijFlYDL3Vvw0t6ADxxqWm5vfX%2FZh7nnnG%2F1jp6ukQHdB4R8OeOumTPzne8wSYB3rHvW%2BHNVGq6tTRHsdLi7GI0TW2xrKTk4D5JYP8j9oMiQmR5IsxrTHP6PAVstB5FqfcGRfhRnrKyBpJSiYzi8cV94HsHyJKntg7olKhXrrMvjy54t90KhO8GuoO1iYnW%2FWmCP%2FlFTby3UShtj84%2BKAJtGXNLPy2xlPtWBbznwpWLeZD5e6jlWRPsdciTe44p5NIwIcHSThSIR4Zk6nc6WCr1GsZOMLrw%2FmssLPM0rXzdNggYcUVjKgZBkxTR2NUhDLH8pL1WucutL%2FSe2XsKru8UjllTWkzJURAin5UQ6UH4VRuKZG%2FvYW%2BYMI7ZqM8GOqUBF5WjgHQlHgNZDPT9qvo2So4aIQFsCGQOmhnkBeb%2Fn95dGzqpkv0ltujT2sLhma9x1%2Fl22VhxO8qtPFUitLwVl9GE3k%2FPmEo5xWmi7ZB28%2Bl69gfX3VZ2xUAKMYC4KstDRstx%2BkC%2Fkgv47xoy0IYIdjr0CciLHPGsB%2FIcEwkBHI533ChLZjLQ4iOb7%2B30c6MajZ%2FQW2PIXX3CaNnDUjUJbzT3EJzg&X-Amz-Signature=17ca4fce2ab1abcab545a77ef817e37e148fb2a74c1d405cf3515354ecda3f88&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WHXGBMDC%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150333Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGNxQIzPyyd%2BTcmMVMeOaXyIRBizEfcT9%2BKzPhCq6rw%2BAiBDAf8xoSkqowmgr%2FP0qeWzirYhDZSc4ALYSmukLrR1dyr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIM6m%2FgHTY0P5NAYdDmKtwDoU7gULZXUUEEswemV4R%2FvzOlWu%2F%2BRekLyFGRIFKB9JU79sKQ7Bkm4YOUDx47JRSvz1OyE5WJvk4%2FY0BRMzHBY5218e0INfbZLQnKTCMptOX7m%2B37IKek1GJBzJ8iS7kKCQxRp4OrBM2cI1656neceK9Ck%2FoRyAK2u16kVNBUqIX9dPiEMtwt8nxMpqtSSzZtsnwA%2Bqa2QtT9QdMqBcIWhehZkYPGJSDo%2BVFpT72y%2BbGVqOxKGwgAQcHJ6tJEf%2FEuz9MqrNUmT0oMEMrRJfxV0TaQ0soNABt4MAiDdOLGPqI2sZlKrMulwIuTx84E%2BceiP3aEQi9UDr%2B4f5DmkOeLZN4dF9jnjmdpso8SSf0QZ0aTzeZoCTccefnEYuyBplKMO8sVfvD0%2BtHn7h%2FM%2FKYJNFWHTI%2FFGOfk6Lpnw0T9PrdJjU0VpRAoHBiNsJlbxcZW%2FcGxDWVdD8zeP8s%2BrGbrIBXBfeV%2FyMTBo7%2F7ZRIS6tq9PUFJ3pyM58SrVqpd1GCwQ5mqaN1HUNcgYtPxgW9eGo0SeTGQHtk06Ww0A%2FZGMS7jhpijHumLo1xcmyH6O9UyPDpzzPuvQmxQyubl8u07MetnitS8cdsYdZKakS14reAEH3nPEb%2BOAH3mKQww1dqozwY6pgEI4CVRKYrpqMJ1GyQH32%2Fm320mhwCGYOhORp%2F5CqX3OX%2BdVVA%2Fv7ZYVqXLwh3HZ3kAB3FH8PoXP0X87Z3gyWXUYMWCdlXvsxCyypM6P1b%2F2h6OVH4ylsko1Sfib3vMHkED9quzZIhfa%2B%2BJ2DAvSXDP4vI%2FjiI0N%2BHAe9YzBYDjcRk%2BS2bagqUMTTeOF3e4MZMkhwMNleyZh%2FFBI%2BfmWlMLYZCUgFeF&X-Amz-Signature=899ad8b4d2ee3d5f1cd88bc8ccbdc6cfc4e3d044aba960005207c569b011d07f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXIHC47Y%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICZ14elBiXi%2BZZFBby0TlvYmDuMe2zAxcwAr3gCj52P9AiACyyjvQgpVHPL%2FzDoyhUdOVJ9ick5TqGXBbRP%2FGHEloyr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIMBYtsyjiYLQNta3qnKtwDdHcfF5%2BS%2B0YXl1%2F3flW51J6shQ99KlXk7q5vLb72lXBE8dY6mc%2B%2Fgy%2BKXpA0Xx23Xtl9Uo2iRTX9lUNkpto7FEeUc4BQ3KlGvd0nn7d4TOqlSi0C%2BEh3i8KJA9o3Qm6pYxVqiasA5zIUGCqszYHicjIRmbmkwAB%2BgfYMucgXzMwptoGbCJK2sdFNZ1Y%2BMfKsH9Cy7sbHHTjYlUsw4vTefjbMTW5%2F2RUW3%2BLo51MqTiQCrbIT2XsYLa8mFiqCb2LmDRMW4vEHtAkqipq5hODFDF0IqPsMjHkJySUjT7A%2FCMn7A7KS5fCmXORzZtbiNftaJDsvoY0RzI9q5PoN2Wb9Cn69%2FCSEx4oS2wg4FBQROkAvFBjbNjak2wGi9kr86K7Jr42ZecsBZ12ZlNUV6M4qXVtF3%2B8t1%2F8yhI068CE1YLt1suw7BGswCMsr6zcRjspYZ1RdevyntkI%2FnbLSGy6A9ndn8TPi0WZEEdpRRSaRFki1EEV7e4jRDRqE0Mxsoo4ZRp4qObZxleuZI4otSID3oA2c0esyXYpH6nlMy208rGS%2FfqP91FSTpsIJ6raYhuQmZve%2FUm0cWa1nfrMrR1XMvEBUV8mLXsFSw%2Fqnc0p8PI0VgJeIbGbIrTGLU8swl9uozwY6pgER2paXFMuyAvtbyQkYYf9%2BgOCOHDmvS7T3C3bGeHUSILUui2f3eFNZnipge8Ve7n%2BPUrG0LqSbll66p7nGl8dvAeXRrwo5NrR%2BdZcu4i6cm4j4PwR5EfjhMr2mCnsWg1mZVg16tgzhs5h9DdXmBdDUntXrRe3ZU%2BMPW%2BpsmuUgVIQIGuAxpLZPkRYuOdNt3P%2FOTeRZVSj%2FmpruT%2BsOzMmcJPAZQBTF&X-Amz-Signature=94e2a5760cee3d4bfa6bdf8060052f3b894864a1254c3e36f367ecec3c7ccf3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXIHC47Y%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICZ14elBiXi%2BZZFBby0TlvYmDuMe2zAxcwAr3gCj52P9AiACyyjvQgpVHPL%2FzDoyhUdOVJ9ick5TqGXBbRP%2FGHEloyr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIMBYtsyjiYLQNta3qnKtwDdHcfF5%2BS%2B0YXl1%2F3flW51J6shQ99KlXk7q5vLb72lXBE8dY6mc%2B%2Fgy%2BKXpA0Xx23Xtl9Uo2iRTX9lUNkpto7FEeUc4BQ3KlGvd0nn7d4TOqlSi0C%2BEh3i8KJA9o3Qm6pYxVqiasA5zIUGCqszYHicjIRmbmkwAB%2BgfYMucgXzMwptoGbCJK2sdFNZ1Y%2BMfKsH9Cy7sbHHTjYlUsw4vTefjbMTW5%2F2RUW3%2BLo51MqTiQCrbIT2XsYLa8mFiqCb2LmDRMW4vEHtAkqipq5hODFDF0IqPsMjHkJySUjT7A%2FCMn7A7KS5fCmXORzZtbiNftaJDsvoY0RzI9q5PoN2Wb9Cn69%2FCSEx4oS2wg4FBQROkAvFBjbNjak2wGi9kr86K7Jr42ZecsBZ12ZlNUV6M4qXVtF3%2B8t1%2F8yhI068CE1YLt1suw7BGswCMsr6zcRjspYZ1RdevyntkI%2FnbLSGy6A9ndn8TPi0WZEEdpRRSaRFki1EEV7e4jRDRqE0Mxsoo4ZRp4qObZxleuZI4otSID3oA2c0esyXYpH6nlMy208rGS%2FfqP91FSTpsIJ6raYhuQmZve%2FUm0cWa1nfrMrR1XMvEBUV8mLXsFSw%2Fqnc0p8PI0VgJeIbGbIrTGLU8swl9uozwY6pgER2paXFMuyAvtbyQkYYf9%2BgOCOHDmvS7T3C3bGeHUSILUui2f3eFNZnipge8Ve7n%2BPUrG0LqSbll66p7nGl8dvAeXRrwo5NrR%2BdZcu4i6cm4j4PwR5EfjhMr2mCnsWg1mZVg16tgzhs5h9DdXmBdDUntXrRe3ZU%2BMPW%2BpsmuUgVIQIGuAxpLZPkRYuOdNt3P%2FOTeRZVSj%2FmpruT%2BsOzMmcJPAZQBTF&X-Amz-Signature=aafbd417b3b51b2b2befb791a27f211c33769c85ec6d61a209c77905f0708fc9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UTSHDOTR%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAQCwsT8X7XnrZivOo0%2Fd9NgRDgLGBaHBzGMsHExoJpgAiEAzJSQ8hEdftFzAH4R9tQ%2BSaUGfzJwIJ7DVUxlHNjoxisq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDFUR4ZDOzzBGKk8nyircA0qI6c0Y0nBLAGsvKNdiu6bgVMyF9oNnbfU%2Bn97jEJfuWhDa4vWCnuUc8OsgCsCQq5LmIIhF2a8GMJBIddvV%2Bx4Q18v%2FtHvt6syesvylqOS7RXlTz7tQO9soHZ94Mkb%2F0m33BfXBTz4Ww17hyQqfc2lRuMb9hqo1gEXNm%2B5ogG2N79V7kB10Pt8PtI%2FvmTywrJfFVYPqOzErycF9IGaMx%2FRCoCG%2B5R7eb3btMFrLGecuj4jAlu89sHzQy%2F2JNm75RDOT2qF5rpHT8V812wtcdfH%2F2ZrmTLc5lsRbN6Fa21Im7x5bhm%2F5gQgpsbII0qC7OoWaR3cACN45lRJQCNbGudM%2Bq%2FRcI5T0B3fYMMKOemRjpZrNHZwkyEoxf6TQBd%2F53YsOgU%2FKKXudN2kd2mVBhd%2B4X6Ict8k%2BKXw6Xa%2F5Kvo7I1ZS8eTDX8bc33dhejhtgCggYwVFaEdLP6U4Ls4PKaG078BcBvTtC2wCQ2y4GROUTXdxmiypBb4CXGh1zpXsKo4wgUEUgpt9kqGYajNlaWQamzqFOVadidHp2CjLojrb%2FlLqfftmqR8KonS5A9ehyvkgOdU88meJkv4yLBV8nfCgXaUFXCfFKf2zmazlSyqGJ46LouR2ayQvxIAWMOfaqM8GOqUBcwSfeexsEGmyOI%2FGG292Q%2BI8vCDV9H8amHTGmISeyWr3u5GqH6U1wJoO%2BnFRmb6oTRrsDoLk757WKVLdrKsNlrn721xtNd9h69Jh%2Btq58lSunFAMgKLe7sFyZ4XGiWi6khdckCoqDxNgl5r6KM74yVX2xhvm8NrPSqNDHPQclPc8Ss1M5I1iZim6GzNz4FfO8BNnvrxucId%2FhXOhm%2FRujHqeCL%2FR&X-Amz-Signature=a6a70efb04e042ec34e9268af9060414c12477c67245f0623f314d05ddba29a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VF2VU7ZB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150338Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIFsGpnKwEUY1uugi8k4%2BaL%2FVgAImiOk22%2BzXXqjKiVKMAiEAxn4Q%2FRbk8i%2FgVTIMHRBeTrc93jeAZXiu2Jr%2FrPyIKcQq%2FwMIaBAAGgw2Mzc0MjMxODM4MDUiDKO6dS%2F5ahSP%2Femg5yrcA6Dd92KKQ73%2BjqNklTovQIszeejH%2BqevuT9%2BYc5Qpj3uRULvGiAslHxtEckKJsY0NzGFWW9fLIyxt3INL4bNMWbwIOESYpbFYUEznMoxHGlw1fqG%2FiZeCdYSUEbnv5KCAQqXz02xlJjK42bgEyGAsAg5azR05VPzRden9YAm6OrvqHc%2BcijHwq1jp1%2Bk7PMUqVFymW4nUfFxBUsj6gJ6RVkCltzQuaN56SOGM00hWePkbhPrZ4vLZC1EhjEAM6KyqhY%2FM05ZJh5lBybtEHtzgGIbRZ0dEE8xqgqw46ya%2FJjEkuyBW2Qr9tKxZ%2BTlR6InaOy92xrkwxrlNXsNjzsyz1463IoC%2Bo37BRvy%2FOLgCEOOQVDk85M2V3wwuhBSaqvbbzfIcJkIz5kcbxDl3gzB5rg6QOCFGb6DNX1driGlnYGAcNOi%2FNUNynU%2BwsGVfqCZVHo4ruVkjAV3I%2BzMH%2FotN1A5gTiGJ6qxFM6ZxkCZbo%2Brzk7Xtgp8LnIXuGH6Aa8we0dDIW9GEhhnT5UYZOBRJB9g7d4GFQ11r%2Ffx%2FEnqNhAv7%2BJc98bfn5a4n6JbbUansaj1Y8DvThFlfB0lMnRJeBKl1shxdAWi%2FlbgVnY8h4C1KHEy3OBpVBM6o%2FgUMLraqM8GOqUB%2BQeqonXEtkZmp22w%2FPRvE6R2Yb56wMeTKUxiMVgAzYnui63NKpxO5koFL89PYtpKIq2rLZuWbmJW%2BDi9ne0wohSG%2BR3ohmdncIinKMFUHa8XJey8cIrYe8MCiePuh3UfH7oeDVwjCsEwznnkjGTeoNrFLDCGZr9a63Xxp74HXQ5X8%2Bbe1OtvYsi6MyZkCdAleo6xA4eLsQ07N2LlZk8KVwvxfVwo&X-Amz-Signature=b54acc76e19c28bfd896492168d418828d55f6fb7cd1771ed8a2d339a5ce3403&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIUHM5WW%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150342Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD0hdE1mWMSZnuWBE9o%2FihvshdmsY48wSdZZxF4JCQHZwIhAL3M8ZbORvBP9tD8yijEiEZWU6%2F8WCJiKOKs6fDQbjoPKv8DCGgQABoMNjM3NDIzMTgzODA1IgzkxicTiH1%2FotQ%2BMkgq3AOz99bWKFI%2FNpsUycpWNX3pHGBkYVQVKB9ArX9p2%2F89ERPsVERx9Wr8LyjMWtjsYqP0RKQsaFfTH6egw3kIIhdh4iNyiJbdstJw47QRe%2BuhAENxXugheLBFr2zOheJtLgU8tLa2e2ToqcnhfmW1iXYGjFDpZGm8Dznf7N4fred0zrwkdG7ak5cR2%2FwsV107uZkau6pxqMgNEZ4DbXNwB8Qq4fUuqfwB0xSGUVDwz5u5EEOtxfLam1jBzJDhvz9gbV8OtCZJJooktEVoQC6SG9RNZ2GTbI3vz3jGkpnnU6P7kutCVDjNlYybKZ7TwisheP%2FgUmz%2FGD%2FBA7%2F95tmnq58dNJFmUYPXF1L55IU9Cc1wIvauKAd1QbfMug21Qj2eQ79nZMj0A6%2FLynxjaPxChTdR0J5zwEhvG%2FzBa%2FqP%2B8tJXKfN97ZHBZHu8j1utMAZ9G%2F85m0DPyxQSXMUBww8bRRAKxWNzao1yoQ%2FCL%2FHGEI92XI0d8rZgIpw76YNmuelJWqje84V9b4%2Bu3rSVyPLYav1aLx7YStCPWTJg5ogR3lfkBwFjQFkvE2afbYJHORJiXUPzwcOLTbTTgPzz0YJ0QAs22k2gu2uNxBJfK3%2FAhvo5ALz2TozKi%2BdkYCfVjCK2qjPBjqkAUTVbBkAMT4b3%2FjJAubdeN07Cr380sV1Ndfx1PE29itEXtmqoh69aWtRx2vA3T3PmghcvJaa6Ga8aA13D4Ij4uN5EivR1UcAfULHD6Z%2Bo4efhsS8X%2BoVWSejuGYzCZjwXj0mK33hGlEgxJa5%2Bc3zroNUTsa330bWAArJdYh2Vg8cop8364UVY81j2IWPd23u97bnzf9sd6CCfivi%2ByQu%2BnzeWpm5&X-Amz-Signature=6b335f4070b07c75b4544a0e5ef233d63ef3346105e7975f77b7907114c0bb36&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B4WX2SB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9dESN51cIxE42lHnubMHg7undFyi%2Fubx1dXR8gEb4TAIhAIsDWyocRD4VJPS%2Bas6SZ4raifJqmnsMhEk24SXLyRH%2BKv8DCGgQABoMNjM3NDIzMTgzODA1Igy3aVIZ31ShXQIYpZMq3APixlRoUan9kRqnuCb2%2FIgBjQOlct8ywrhH5EJI%2BfDw2WQtHlj%2BrhRgd3oPHs7%2FMKDv9bTRW3IEZPcQzrkc%2B0Mx0xeHoQay%2B4lWdXjobCwiw5dZyG395gYUnjNEjfswJDUjREARiSjb6%2FhLQ4iAubuutK5wC7NygxtQzIfln3Wm%2FPrs8jxr8EYrPeMh7KRYqbdKcoNlzAFuW5XJX4wFv9EEmxwj6oLm3LKyq91N%2FUZbyoZVwy5TllQwm4xayz7UZOsOkBQl5veMpHLhG3SVoRMzkQ7xvUccZNoPSwQXA5B%2B85stm8K%2ByQ4ER1pZVI0zdbqx4RRmxMGLezfutL5Xwn4vKPewEo6ETSBmLNGwLJnovTUO64x%2Benl%2B01Q1EakvTKc95BmWhtyDA9Sot%2Bgz6ifLaw1asL4oIlSBxrR0nLs2qQ1BF1r9CQ%2FYl2HVJPST6LSnAWaok29JquAPvwthGMx0j3rOall%2B7Pv9BhV%2B1oSOzXZwq6vqsUINg6Rst705snp2dQeWckzd%2Fi4fQnQ5vuRp6rY4nwHLUjsU4DIZAhjGL%2F9ZFQtaG7agpozwI1VPUZODkKPK5qHG2DvffMi%2BDY2edyY02TCAhqxaVRv6reY0tdEvjEiqi0PfTshNBTCS3KjPBjqkAdzL3m0flWAv1Ajn7Dhlqk9AhqdFkaaM%2B535AKBDrMDu%2Bc%2FpniILF8%2Bvicb0Ni%2B2rkHQV7dIfq%2BiiXI8nf0UWV5bEW2NzwGRS4ziuCIUyNlrDZKXh2oYRaFgWfN8CV%2Bmm6k57dZInDyBwx0Yp8ckcJXzNhoJKSU9BFhNFem0yZM4CbpZagEmNBmujfOJWmN40f9W5SEXlXik2WhxcBqKr3S4dexq&X-Amz-Signature=2196d0fb23603ad9145182020533fc2e2d6ecbd0948865ed6352caa04c9d4a4d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664B4WX2SB%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150344Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQD9dESN51cIxE42lHnubMHg7undFyi%2Fubx1dXR8gEb4TAIhAIsDWyocRD4VJPS%2Bas6SZ4raifJqmnsMhEk24SXLyRH%2BKv8DCGgQABoMNjM3NDIzMTgzODA1Igy3aVIZ31ShXQIYpZMq3APixlRoUan9kRqnuCb2%2FIgBjQOlct8ywrhH5EJI%2BfDw2WQtHlj%2BrhRgd3oPHs7%2FMKDv9bTRW3IEZPcQzrkc%2B0Mx0xeHoQay%2B4lWdXjobCwiw5dZyG395gYUnjNEjfswJDUjREARiSjb6%2FhLQ4iAubuutK5wC7NygxtQzIfln3Wm%2FPrs8jxr8EYrPeMh7KRYqbdKcoNlzAFuW5XJX4wFv9EEmxwj6oLm3LKyq91N%2FUZbyoZVwy5TllQwm4xayz7UZOsOkBQl5veMpHLhG3SVoRMzkQ7xvUccZNoPSwQXA5B%2B85stm8K%2ByQ4ER1pZVI0zdbqx4RRmxMGLezfutL5Xwn4vKPewEo6ETSBmLNGwLJnovTUO64x%2Benl%2B01Q1EakvTKc95BmWhtyDA9Sot%2Bgz6ifLaw1asL4oIlSBxrR0nLs2qQ1BF1r9CQ%2FYl2HVJPST6LSnAWaok29JquAPvwthGMx0j3rOall%2B7Pv9BhV%2B1oSOzXZwq6vqsUINg6Rst705snp2dQeWckzd%2Fi4fQnQ5vuRp6rY4nwHLUjsU4DIZAhjGL%2F9ZFQtaG7agpozwI1VPUZODkKPK5qHG2DvffMi%2BDY2edyY02TCAhqxaVRv6reY0tdEvjEiqi0PfTshNBTCS3KjPBjqkAdzL3m0flWAv1Ajn7Dhlqk9AhqdFkaaM%2B535AKBDrMDu%2Bc%2FpniILF8%2Bvicb0Ni%2B2rkHQV7dIfq%2BiiXI8nf0UWV5bEW2NzwGRS4ziuCIUyNlrDZKXh2oYRaFgWfN8CV%2Bmm6k57dZInDyBwx0Yp8ckcJXzNhoJKSU9BFhNFem0yZM4CbpZagEmNBmujfOJWmN40f9W5SEXlXik2WhxcBqKr3S4dexq&X-Amz-Signature=d9d9afc7111e5b705920d444e0af4943f136d87b6f0cf89ba8e4b68557d2ca80&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VFTLO62C%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150331Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGWZbMAJG5RfWrK09n%2FHrpx2fTDHT0aEp%2FvmUgssqWGZAiB9uh3k2xkghhghMdThuc6q6epPeShDbUZTa7kG4aBKpyr%2FAwhnEAAaDDYzNzQyMzE4MzgwNSIMh2TChjHg5Gs7v7FBKtwDR%2FZ%2BCOl4HTXx4jshuTO%2F8KCYKDI6NMMR2SoVYq%2BQOrKusjHx%2BOxPVq6PU3xftNTbphpH7df5cCUzTmLrFm3BiJPXxCico3fYbi9%2BRV9AMUjRt9ZaKIkLqEbbMBmQ6s6ya8x6blXhwWv2rfxTmoVJ2jYPq4yM5gXHuibBLex%2BKgcWHvC6aNWi0UkE52MSuBdCqmGWTOmuyd8q5%2Fdp9DaUxlkDJfQy9nasOJm8t%2FC%2FM9KPjb7HBojvBFXVEDspz%2FNwNXvsNmNUe7RSpY%2BL5ejPQjJsqPUMgN1DXjQ6pSDzcS6o3SETs66vO%2Badsn8N0MBj7YhWN%2BxjuPY9S96nxZD9jAOs86Lxm%2FV%2BOyVuFVIwqKrDu5NMSQmA8RkFJ%2FvINjqJr%2FI1kvyDt0KHCqNcXY98Qc8BoZ6am6rJdyiphmOONcUcblmDs5qmYWPSbSt0epKC%2B3sp0fJLHYURTS8XqAAYBDc9wXEhPT1edsqxos2mq%2Bcbf6kEHSxQb0fLzjCnQhry%2FdiL398YTFkIwZWBFraYYLuO37UnW0GaJS4fsHobnDkekqOP99hFkm3M8LH%2Bw1lNOEzyvpPzUW7AdDWnC5aJBnsR%2Bs9boYwDQmTGGXd8Z1bRuIjod7PdIYJdx44wlNmozwY6pgFddrYm4lQizOLcZleXvM3Q%2FWmLjuwYXTVmeoTN5hj%2F3tLGzNwlvu0F9rYw5QDd5qDxOwI5dvJeB4DNTbqLIt2yddPtXPizZQ531Jz%2F5rTwcwLweAbkNufVNYFDjYr%2BR6%2FPNMwqEEdvDcsX4yQKOH9ClO9zYGd4RRXQWKpPuo8fNJgKFIYm8i0gYlRaFqSLcMtvEXl%2FbPOZoAYilSiVMD1aToSo1udu&X-Amz-Signature=ac7ab38a66577a1e0e3c4bfe1da69e70568c3b642f299fd76d10ea0da80259af&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLM5QOG%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjNVYTB7UaTIqNxm7XeRKsSoYXcfcM%2BPisaYopHbaDsQIhAMw8l9AT4gEZYsRtMXInqBOvIwCSqUfy39E5iPv7QoN6Kv8DCGgQABoMNjM3NDIzMTgzODA1IgzyYAbSEvZcnOdoNnoq3APSipyY0ujPxHIYVJRYMJZSsH5PjF7A%2Fl7%2BYqApzqHm2LBOR8eMko57EO%2F9p3ruedP%2B1GfjarXuRVjOthxRDRd5xzCLmxNju%2BrP3jxoqMjp%2BVIOR5pjmPO%2FUZIPbECUMQhSsvWm324OrcRSc%2F2V21aU25rE4HrrICsOJoLGUdtiIVoeB45reOOW5mwusXqCZWIwpyVoOyc%2Fdk77Gb8qQ42CmpAgWeBZoK5UeqGpVFTjLTfLlrj1bT2sKXUY23XzgIKNp1RHuZDgXk2MyT6iS94ySluIDY74QWkmLmHzrJICl7%2BUJPh9dJ%2Fn1uYljfC7ZGnlPApmY3OtR4OMAmcfSn3dmQe3Xb7DEQYA8nEiqwZxWNDQVAl7KW81oJXLDbmQcaPG%2BWArdqke3Uriq7vs%2F5MYGLQ8LuyMUl%2FaPv1CCFjNEJ85QyaK0CFTDqSSRay91SBetO%2FWfXwNqBTRaTViHz5pBJjC%2BNMiIQ0LqK4imjGvLBbcbqaTw1%2FH0lPpC17F4fTJgRaY0vTyP0giz9fzFfJYiXOxsezSR2u5Ehl1mc6Wb7vkuBaAk3haAQXVyFo836yrF%2FEMUuFHY3T0bNMGJHXCcGUI3qF6BSEfuCVF5CuIkaY5S8hMCbISVDI7yTDc2qjPBjqkAdnl764fEwtxTimtmGiWDm4l7lqHxJUJTL8T3E18uD3EY32zsk%2FxkGTYjBB9p%2FWKkD8JeTRNu5%2B%2Bb7jhB2%2BrEFJfgDrKOgAtMXX6Fp4tMx3dO1FE4wmsZI5uvnpox6omcu91YGF5WO5qJtpcP7Rg2t35rRTHiSSNDFUGx7jMe8OCV8%2BlUNFHvoJ8V1o5NbF%2B7TnSHhO6%2FmucIoiEv69JtA7SEBG5&X-Amz-Signature=811d4d4726bd3c5cc66a2cdc849068a419fd1d9d495544e179b6d7b1cbdcaf4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666YLM5QOG%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150345Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJIMEYCIQCjNVYTB7UaTIqNxm7XeRKsSoYXcfcM%2BPisaYopHbaDsQIhAMw8l9AT4gEZYsRtMXInqBOvIwCSqUfy39E5iPv7QoN6Kv8DCGgQABoMNjM3NDIzMTgzODA1IgzyYAbSEvZcnOdoNnoq3APSipyY0ujPxHIYVJRYMJZSsH5PjF7A%2Fl7%2BYqApzqHm2LBOR8eMko57EO%2F9p3ruedP%2B1GfjarXuRVjOthxRDRd5xzCLmxNju%2BrP3jxoqMjp%2BVIOR5pjmPO%2FUZIPbECUMQhSsvWm324OrcRSc%2F2V21aU25rE4HrrICsOJoLGUdtiIVoeB45reOOW5mwusXqCZWIwpyVoOyc%2Fdk77Gb8qQ42CmpAgWeBZoK5UeqGpVFTjLTfLlrj1bT2sKXUY23XzgIKNp1RHuZDgXk2MyT6iS94ySluIDY74QWkmLmHzrJICl7%2BUJPh9dJ%2Fn1uYljfC7ZGnlPApmY3OtR4OMAmcfSn3dmQe3Xb7DEQYA8nEiqwZxWNDQVAl7KW81oJXLDbmQcaPG%2BWArdqke3Uriq7vs%2F5MYGLQ8LuyMUl%2FaPv1CCFjNEJ85QyaK0CFTDqSSRay91SBetO%2FWfXwNqBTRaTViHz5pBJjC%2BNMiIQ0LqK4imjGvLBbcbqaTw1%2FH0lPpC17F4fTJgRaY0vTyP0giz9fzFfJYiXOxsezSR2u5Ehl1mc6Wb7vkuBaAk3haAQXVyFo836yrF%2FEMUuFHY3T0bNMGJHXCcGUI3qF6BSEfuCVF5CuIkaY5S8hMCbISVDI7yTDc2qjPBjqkAdnl764fEwtxTimtmGiWDm4l7lqHxJUJTL8T3E18uD3EY32zsk%2FxkGTYjBB9p%2FWKkD8JeTRNu5%2B%2Bb7jhB2%2BrEFJfgDrKOgAtMXX6Fp4tMx3dO1FE4wmsZI5uvnpox6omcu91YGF5WO5qJtpcP7Rg2t35rRTHiSSNDFUGx7jMe8OCV8%2BlUNFHvoJ8V1o5NbF%2B7TnSHhO6%2FmucIoiEv69JtA7SEBG5&X-Amz-Signature=811d4d4726bd3c5cc66a2cdc849068a419fd1d9d495544e179b6d7b1cbdcaf4a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666V5E2AHX%2F20260423%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260423T150346Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEJ%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCICc7ebjR6g6ULOuA%2FNNLvTePSAy1t4nj612DOk0Rl5SDAiATY9MjLyVP4s8xu1LQJqUx5vO2xECBSM%2FAzrEF5LikJSr%2FAwhoEAAaDDYzNzQyMzE4MzgwNSIMb23CMDRMR5TXHEwCKtwDz2yZQ3VHwyuu5o1Ms4LWaeaMVy06gQ6tFxgCFgQBNHx51gnTty%2F%2BVgND0fidIr7Bo9HwtA6Pw3r8OzNYM%2BwoWJOo6dNT1IuCrtX8KAYzHofToyLDgcSvDlSsqoYnAFQNe3Stiwb6WAh10MaFPm8a%2F1pdWlX0OzY44teiMfq%2FO1BpzhUc4RBwbHmSH43Na0AKUZzjd1JQ9cQ%2FgEvCM%2BT2dKAbrYP6EApCZAustp3KCrW991jj62p6qQ6KIyL9rgpatgs8E3D5vSxnQBzTGCgUajU7zgLpGrG79YZs1dsIWjmORBYahHt7P44aELdtlVDSwld1R%2BUL0nl%2FDBnzgqzNYTQ3tEtnfFumE7itR%2Bt4qM1sfckDFgAV7gaVFs6hVRCnLn1m%2FrdaPJTl2HflNaxiGay9NCm74RPYqaCInfZOrsK3d7frw%2F%2BHBHvwcQmJJ9wq0oiki3KxCCqN1472STSNzf3jrNnF92ulamVDDHQKF%2Bi560iNQIZATLlRUQXd3LL1mltt%2BN%2BOxklsF2pUP4Ii6MjTFPnAFyKHSh4qmhCtlHEdJe66cuS3O2n%2BYdVR2wjuMdAlmGv0Dc1EFjQENj7vNXf0b6RGUWNwhT%2Fg1zSVeXNnipVuB2Oth1up2bIw3duozwY6pgFYq6TeY5QtareT4g3BqgSFqbG%2FH8xwLp11a9TCDoEtQL5%2FfodwxHuqFb6MKm%2FZ%2FhaVl8%2FP%2BIAFg%2FxsslacwTe6t9K7Fqk0Xb%2Bp6w1mYCkB4jMro3O8z64CmdXAJA3JF%2FMoqUhCru%2FRMRqZbl11yeU%2Fe8W8XytoG7ZvI6jaYIRLT%2BLswMHnu6b13XV9GBGB96KhnIEkzJPKChDX%2BsgAIA%2B04Ty2ojrx&X-Amz-Signature=655e32cba5fb87b9b6898febedf412c73ff01938ccba3a42bcedaf6063b8ef22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

