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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMBWMAZV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIEz59T9L2sTVLc3HpPA8mV%2BR4Kz74oiw%2F0cuW6p0ic%2FpAiAy7G7kFsHNf4OjjUQRZty1cAYzmcX3jo8tcwFrvUhAmyr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM1t7cLeVzuBszWkrxKtwDdMRQoM7YN8aw9H%2Bjs%2BxUIwi9mB1bA7rLqwrIyHPXjneR7NKE24yHvGPjWBVXseyaRH%2Fq97v8TcgFSdgKPgB2TI8eDpe4hVfxn%2BYeA4g1mpTKYKnScIzuQ0rR%2BFTn11kPLizR8TKjcgLKGTTXmRNLKz5%2Bh7jsFl4qTxWu5CCpj8hk1xSypwtXJC%2B3A%2Fjy2bI3%2B%2Bvzf1wMaxzd2iyqe7ahdWm35FnGpfBahQJ2OFN%2BOvVy8bSLMs8Wo12He5Ic5dpoGmrQhJiW7zl1soNDmEW3%2F54990ae3w4wxD1aaQ2gsZ42AaHWR8Fj79Rutuby%2BxOUzR%2BKZ2mhQRcHxe%2BEzkc9HAXKwe3m3c7gASLAPzigdKqB3nPqY0Ld3tlrARcfJkokE2ok5diNoICj7tc2FNlrRgtstQIaBlOYZFi3x7gCnNpiZV1tZALhWLjDha7HosgdIkv9rjycfRaC0sFiTPtfu8rjbIA3D6PyK%2FW%2FSB%2FRQyniVyFB%2F%2FroKSwaMXXsxqQ100DfjyeA2kpfET7DJzB%2BxTyPdBH%2Fid%2BkP2IOEUuonOjVRUlM0%2FKFpsLZh0APnDSRoNgO8Bv6OPtC1P%2FPCabu1WdPr3EbaIAE8UdpSRIrfESRvfoj9Tp6IpGhQUwwtu%2FkzgY6pgGOvonVdL1tq9vMkw9jOYV11BYUglRY6tsgfccbMcaxF5S1dH9RFfYd3Sl2NEfropevgi9tqK%2B6jIy%2F1gJL6TYrrxDn34HSM1L9LH%2BCF9e%2BQeQZXWRTfkAWabQxosT9wrMB%2FHQsYV7kS%2FFMyKTea42UiW7aHUWKvM%2FVXNDicNUBGZjPEqOvU%2FIvs7UuBecD4zlfOrx5a%2Fz7HL4MpVJkANymqURyX6Qq&X-Amz-Signature=168b7d1908ac5176558654af3162db4d3dc850c6cf5909f0716fada40a1c74e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TMBWMAZV%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183526Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIEz59T9L2sTVLc3HpPA8mV%2BR4Kz74oiw%2F0cuW6p0ic%2FpAiAy7G7kFsHNf4OjjUQRZty1cAYzmcX3jo8tcwFrvUhAmyr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIM1t7cLeVzuBszWkrxKtwDdMRQoM7YN8aw9H%2Bjs%2BxUIwi9mB1bA7rLqwrIyHPXjneR7NKE24yHvGPjWBVXseyaRH%2Fq97v8TcgFSdgKPgB2TI8eDpe4hVfxn%2BYeA4g1mpTKYKnScIzuQ0rR%2BFTn11kPLizR8TKjcgLKGTTXmRNLKz5%2Bh7jsFl4qTxWu5CCpj8hk1xSypwtXJC%2B3A%2Fjy2bI3%2B%2Bvzf1wMaxzd2iyqe7ahdWm35FnGpfBahQJ2OFN%2BOvVy8bSLMs8Wo12He5Ic5dpoGmrQhJiW7zl1soNDmEW3%2F54990ae3w4wxD1aaQ2gsZ42AaHWR8Fj79Rutuby%2BxOUzR%2BKZ2mhQRcHxe%2BEzkc9HAXKwe3m3c7gASLAPzigdKqB3nPqY0Ld3tlrARcfJkokE2ok5diNoICj7tc2FNlrRgtstQIaBlOYZFi3x7gCnNpiZV1tZALhWLjDha7HosgdIkv9rjycfRaC0sFiTPtfu8rjbIA3D6PyK%2FW%2FSB%2FRQyniVyFB%2F%2FroKSwaMXXsxqQ100DfjyeA2kpfET7DJzB%2BxTyPdBH%2Fid%2BkP2IOEUuonOjVRUlM0%2FKFpsLZh0APnDSRoNgO8Bv6OPtC1P%2FPCabu1WdPr3EbaIAE8UdpSRIrfESRvfoj9Tp6IpGhQUwwtu%2FkzgY6pgGOvonVdL1tq9vMkw9jOYV11BYUglRY6tsgfccbMcaxF5S1dH9RFfYd3Sl2NEfropevgi9tqK%2B6jIy%2F1gJL6TYrrxDn34HSM1L9LH%2BCF9e%2BQeQZXWRTfkAWabQxosT9wrMB%2FHQsYV7kS%2FFMyKTea42UiW7aHUWKvM%2FVXNDicNUBGZjPEqOvU%2FIvs7UuBecD4zlfOrx5a%2Fz7HL4MpVJkANymqURyX6Qq&X-Amz-Signature=168b7d1908ac5176558654af3162db4d3dc850c6cf5909f0716fada40a1c74e6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WJJ6BFG%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183527Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCXn75XDqcGKuWfwN7ueJ%2Fy7%2BlpJqsmHBm83oKG2HY9rgIgMhbcUBXlkP2uKZw3JYT4CVBNFUuAqYO0mqSY7i3DIgwq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDHOBc9H89mS330bAiSrcA5lQ71XUlubzKpQ9TOjsHxs%2FGQFKZPqbjHdkKtDm7DbSyfECyDJTR0n69%2Fd6TzaZlylidWrISDHytYqvA1vHc65fBNExvAMo7JbMBMpxuscLMImskHyJdlHjAXa3RhVNAFX%2BC%2Fsl2fzVMCDEIYYdWmlkNAOuEkLidte1n6YVTUMZb9e209yVd3gY6JgCBSjOWTOsW6%2F1QMCKYKwhK6hDLIRqEi75NqnS6EkXxVo%2BXcZX6Utm%2BKq7xgc67MAujEvtTVTOv1YUdF1kInqOf3%2BZr0%2F8B8lNirms6Nh%2BxUSwBRhtTOQumj%2BxfmmxLTRywNzNlb14qWnGcl3ZEpj66HWhrfAgNDHrtVAaQJtAFAWR9fpduSLo6xEj9a1AxKAnUXNqNm1IOUFZrO%2BzfYY9F71HcfO2WbPU9cTjosmEDKUh5ASTgY%2FJb0wjaViFTe6UwczKm%2BychUqmhPh9b1dCQ%2Bf79lzHNJzoz0TErsUWPpKnWz60LTFHjXC8ZJCCPXppOORJ2j6IRampgArF%2B8uLVEwJZ3zxdfvO1oy8apDaCYewkKmCKaCa6ThOUI2%2BMkS6PrdMGTH%2Bvo34LBkHJZYxi02uDcXy5QPKwJEefBaQQpo%2FdxCHfjA5glhHOC5lvAUKMPvt5M4GOqUBD9wD712gnmbqJkJiLwHV7z5PObscVDmWvH%2F5qlYPp8AabcP6mFy92151I4LcKXUO%2BeJnPELnup8uXnWBF8EGrYBCp%2F7U3SVjsh1kqYu276GbgaYMP0dq8uryyF0%2FaLpZVDxYUh1HhTDCESVn7UdwTzBdUraHlrSbPcevKaOlxSPG4wNSdIiuYhBj8Lt4tQBPqeI68b%2BRGIiWqUFRnYGkG9nWIpEP&X-Amz-Signature=24e8d8cd1f6708bf9d558157ad1d5556480ab4947c07f5ac47ee99486f9f2709&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCB6HRLZ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDUK%2FwXyj5UEvpx83MRBZa0KN838oQRSHZxALJwIjiqlwIgIdZrw1xxBa9e8y1AJrD1%2BnefVFfcQGqFa9oI30pmC7oq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFhn4e2XQ4pkC0f4%2ByrcA9awi7Z6wRAs4%2Fo9D4V9pCf2lwO%2FLiQjXXLu%2FGGJVXRw69bkkjxqKv1fVJXvSa9hQQumF4awgUNt9DblXJw4oSI1PD%2FEBcRtM%2BF%2FbfqINb%2FUXsxB8Gii9vJu6mH9EcbDH5RRX9dk8lJC7dDV76h0RTNx%2BEVrh8z6VqGc6Gqztn4UfuzkxqFvbbRigU3ovjTs2H5NMZjlTOI%2BorQv1umoqThHFgojvJ3gjFUgzzeE5POiJVvhNkDeBq%2BTarVcKQ6OdNsFdin8vN40CEO6sPMzrq8%2FD4o5Cu8onBAz3i%2BrG4LCYedfahsctNEw9ZO71v78ZKVFhEaPjIKDKha51XrMik7fViU%2Fmm%2FIsvINCI14Hq4auZT6y2ugLxcQ2uVpRRkUWjp%2B6A5i6PFaEduO3cEC4ReLqQhjntcTD6bqlirPWcM3nyxzFCgVhD%2Fx%2FNqwjf8dOLFHNsZkbIypsz9%2F51TBbe1nTUo2i3TN0osrhfmxaN970jUM8ex2NpvwQdDtsPA6l2bY7fGaofkb3zCM8BQNGkKX9JFLUlO0NI8QD8euGnUOdmgYH6o65Lo9WUstmv9C6dxDmogEO63OvZHM%2BybZUcEZqz%2FbrRsc2BoLictKK2uqeQcTTPJb5G%2FngRuyMLzt5M4GOqUBWIje0uZJ1AUf1f0YDautiZ4PGxQuuKhgyFTWaGo16mjksWoWHNOo%2FNjB9p70Y%2BtcISTNBXdfF8dUgiMhvvG87oq%2BBFn8uIjGgcOCD17%2FF8gu%2F6V6mdqHy0Cg7swd8DGKek2DbENtVowlWXl3BUcXxMeRiLwV%2FIjDdLw9X9y1AW2hZOXkyRPFeslVwWDJXbib5WynLgmcn1CAC8CUEcYw4Ho2e7dv&X-Amz-Signature=236b516463314f3afc05336dde69a50bbfdf238806742001f0693aaa5d4eea5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WCB6HRLZ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDUK%2FwXyj5UEvpx83MRBZa0KN838oQRSHZxALJwIjiqlwIgIdZrw1xxBa9e8y1AJrD1%2BnefVFfcQGqFa9oI30pmC7oq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFhn4e2XQ4pkC0f4%2ByrcA9awi7Z6wRAs4%2Fo9D4V9pCf2lwO%2FLiQjXXLu%2FGGJVXRw69bkkjxqKv1fVJXvSa9hQQumF4awgUNt9DblXJw4oSI1PD%2FEBcRtM%2BF%2FbfqINb%2FUXsxB8Gii9vJu6mH9EcbDH5RRX9dk8lJC7dDV76h0RTNx%2BEVrh8z6VqGc6Gqztn4UfuzkxqFvbbRigU3ovjTs2H5NMZjlTOI%2BorQv1umoqThHFgojvJ3gjFUgzzeE5POiJVvhNkDeBq%2BTarVcKQ6OdNsFdin8vN40CEO6sPMzrq8%2FD4o5Cu8onBAz3i%2BrG4LCYedfahsctNEw9ZO71v78ZKVFhEaPjIKDKha51XrMik7fViU%2Fmm%2FIsvINCI14Hq4auZT6y2ugLxcQ2uVpRRkUWjp%2B6A5i6PFaEduO3cEC4ReLqQhjntcTD6bqlirPWcM3nyxzFCgVhD%2Fx%2FNqwjf8dOLFHNsZkbIypsz9%2F51TBbe1nTUo2i3TN0osrhfmxaN970jUM8ex2NpvwQdDtsPA6l2bY7fGaofkb3zCM8BQNGkKX9JFLUlO0NI8QD8euGnUOdmgYH6o65Lo9WUstmv9C6dxDmogEO63OvZHM%2BybZUcEZqz%2FbrRsc2BoLictKK2uqeQcTTPJb5G%2FngRuyMLzt5M4GOqUBWIje0uZJ1AUf1f0YDautiZ4PGxQuuKhgyFTWaGo16mjksWoWHNOo%2FNjB9p70Y%2BtcISTNBXdfF8dUgiMhvvG87oq%2BBFn8uIjGgcOCD17%2FF8gu%2F6V6mdqHy0Cg7swd8DGKek2DbENtVowlWXl3BUcXxMeRiLwV%2FIjDdLw9X9y1AW2hZOXkyRPFeslVwWDJXbib5WynLgmcn1CAC8CUEcYw4Ho2e7dv&X-Amz-Signature=c2258bbc5c3dd9a6c0ee288e3d31e2e38564474aa306fef61b9889cf500b04f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665W24OT7Y%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQDCI%2BpzgEcJFxEwGtQknUj7o4cSkJVJXI1NxuWpecvbWAIhAIQkokkkTaZ0DoQZqC4znK4wW4bGFctsQDLC4tfCp11BKv8DCDMQABoMNjM3NDIzMTgzODA1Igw%2BK%2FrQa9h%2F1%2B%2FOO74q3ANCIxOIPZbLxPgaCitknlCeob%2BRRwMBiBIntnamYxxQZYP00N2XIqfGV0K7eOuhOiXkIYdcXh1QjHJ8fcfNiTvKdX7coCMYD5v3fck8TwWW%2BW0w3hZlOUZTLzQlO5JwhWEF8vb625%2BdBryk2GzM7cwkXyKwOTgwp8IIf4qa9elQYKxidYBuq74YsHFRSo6x720Eyfq8pKVKMI%2BO9r9p8k%2BC9IhGBYGshpnLXZn6DcPP5FvnIa9Y3IRLGSjflTrYYUhO9FpmluUSJxhePu%2FJDb6LyNAClEWG3HYaERoU4V70%2BO7ODdGu08bAMq8UWTQfm1Yjyf%2FXN4F0FMq2MnVKGlUZxIvptWyc9YbknDruCFHaDHi%2FMsIsCCYpDqaqodeLInSTJaOeaaEgmXyrUx1NHkjXvsbX5P3DQabortLAaedm4BM7DakKz2PB7S%2FnteJoukuwN5f6UI2sKt9qo2GMwTBjhxBrjKZnikSqujoQvckIvi4O6QDh0Zc6CBNRmJ4vVcpI%2BxOELbhh7bbWD8TBCCoNHizcRkoKJQURKlqZIimKGTm1vIMD4vD11ap0OIOvUyNg35sDxQM%2BiIZ6V7EO0yrroa%2FiuyR39SaPDYruSWDO5wJUB5abjU0H0Joy5zDk7eTOBjqkAeB1mczJdcSaExLIAjFzmangPJ5bl2RUlOI3UYBAYjkk3%2BSDqPv1MxOJ6x%2FxCeh%2F7XuY8sz%2B%2F0nDiYAqYW%2B2cenKqTQSKdK%2FpNmNaq3PdFVOdHkUawlIjlJjhpv0d8mKJrpc2y%2FjJoxUTrKXG%2Bfnb%2FWInCEenzYfi2zX%2BJd5LUXqsvpahC08J0Zr4mqRvSmldPP5XlN%2Ble6QIPW1GlPvKfekILAw&X-Amz-Signature=b258721920d9ef9fc7322f15a497fe82cb22227234045180a29ba532e8d23bdb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VTEVQAWJ%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183528Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCJUG0Dsg3C1rQB6lt7lMctyGUSrFr6u1a%2FFZ1vGdiltQIgKVvPMv2KKCZ6TBr%2Fn2M9gLgTje6HhBR1pTcyD%2FGJcxAq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDHTWVnaihT9lTj%2F0RyrcAzjWYyZSJVHVqkfL7ZM2qWavUBmtzUeaQsU0JpvUcfwNPAVkyIc12OdpHCAcJTRy9jFY2uvn73Y346XdnTPioJwJ784d2EO7%2F%2FERTlTZH%2BPQrrfoUQ4E6XBQeRMQhh%2BrYj3UfG1SZWVuBmkm8AizQwT7yD3SEOJzg5ru2h9zIx3UgcvDrNMkMs7ftoV%2B3zeVuO%2FybQsE9n9NH2oTt0SxjbEVL1PMaevTZz6d3IXSFfjCQ%2FESBxJDKFnW2Pl9BVyun5W9yleruQMEWhCnJc0kE2LspewtrsrXf0y5ODSoJjN%2FMyv8O6jfD%2BmsEtixcD2Xydi9KXnH41TbCS7twLbfy8NxurCr5EgIFCuW2DpVOxxBzkTVWGbR%2BnisLr3Nqluv6w1w6hEw87xPAUu%2FKj41d9YxVEBv7fvkdY6F4GigWd%2B0AHyHYtYtrfxyZ4xvnCV0fssqW2XxEmLUiHNWQwvXa9ZjLEuM4US%2BKdNVwbDAWdaUmicaBpeJfbMc4QT9CnaCw8Z5rOJODvYm%2BGB9J03LNRk48HQqiJteS4aamut13nkgKtgu4fpRZjrxUAA4fdu%2Bwu%2Bp0RFwZZlgHWLHDLmRw5deIZ7aRmD8BZMwU5H1gBeK75i6yzK8r7XllaNlMP%2Fu5M4GOqUB9cxXAnILB%2BuCHENvXrbaerahRotBhni8cRp5JoTEh30SnmSZpjuGOf6Rxfz2ur587Az5JqnA7%2Fbq%2FBmYUXJp%2Ft4C0lJbMy79NutV0YvP8HCWzYUPeXLLHbDfW5ureMQt%2Bpg82IUPgB4UFf0E9roOGHfO2LUGvRoGoULMBKVHR4JvC23o38Agi0FkKKSypd7DC%2BEikFvB8NQbaDpq5xv9k3RhMOAY&X-Amz-Signature=3e4c9905070a1c8ea409f9fd602e69493ae28599e4badf079bf54e6a0c99cb2a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W3IU2GCY%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183529Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCBsOMHhRU0VCU%2FTGZXFKLHe0aqzXv7w59hIpvx%2FdcULAIge1s%2BSf0N18G9QHiFuHv%2F8fIVF4y87E4zGFWo%2F1EYuxQq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDCgTrrZZ98C7UdgjZCrcA%2Brc1tscAVTr17aIU4Jwvjc3b8Qxg1oT1DDimI1m4ClIfMNKckves5GGqLqjI%2FEePT4r4q93pTeyDTTo3m33vjemQBwFq6tmP8E83yDlOiUNmPe0FtsWCylQmDVcLxZZLRB%2BERnKocOJnKxLz9RK8fCtR6Opa5625bYB3dX0riyRqYe7O%2B%2B0%2FcL9imuUkLajJ3CjZ4eIMd5Aqr%2FXXiVnY7tDb0vzucv8%2FkVgzZUL5WZG3ywZOEZt9Hoe8Otue3zAR5MpUfN%2BJ9rjLSCbGf3RlMdAjC89I%2BL5mGIuHUgBZ7IDSgaEgNx8z9iNuwUhwQuYrZ49tAojRcD9tbOr%2FNQRHPiiSHg9SrhZQ6GtRgdFtPzxszOJuCXk7Q8aj0xa4HHkm2EBdmMMiDScjHbeHJfgDD17H6%2Fu%2F9ioNYLunvpAc08MNjSg0fgw4r97rv1%2BdInso93xovUnb6kgVJbOIkn6SiOXbL7V9rZT867r6wYOX0DwUKN%2BTukvOjxrmm0lBCSwnw433GDsDufZ7iEHkdEDRsrsCFhyqqM8aTNYjzO0Rc9gNY42dSYbOGrLeA51g8mmBFxoGG8cdO4eLVY5dx6zIZHMCBR1U6VJn%2BAxkTTT3u3o3NRxPU60I%2FX9E8Q6MODv5M4GOqUB1%2BWbdUlQqjYo%2By5zVuicpAhrnCG77hOko3JfnIt0gD2mbaAAbMo%2B2U9hXRDtQblWIYiUxqboQjPgLXpZJtiQpb9Po8AGjIV1pF5VwaogvvS62UQWXWxEuk0f%2FE0Cnf2EmvYUTx94svy9gxjt0JvYx2V8a%2B58OgoRnA6GNFBgcAYJefjxSsOI%2BkTVqz5TheKyApzANROsILwK%2BAbyoeIiVOdI1D1n&X-Amz-Signature=14f69b46f271f880822d59693880e215b0d88355f3babf017169825110cb8eb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUJKWQDX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCjSnTWAZYwUJG%2BjUAuCOwXkfMxBf7MIfWhY5Wj4qTtYQIgaunzpYMq8WP2LcYNJx5w%2BvixoguSvTDC2epkAUyU7DEq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDH930dC%2BYE73I7zP2SrcA4yNiFxkmdG%2FI2hUQJTwoSqovDknfxug0ewHIN7knhzjeLMhAmWxwDu4Fbtz9yTw9hmUAQy4eyWn6VgIwxMzIpLml3chzLU%2BrJA%2FUXJSkaK1va2jM1ezYY1jQYNC1klISXwoqFL85EbHGqWfL2XUnfHEaVb%2Fmynf15WPUX461G0%2BC8dMV781z7SoqYgLJiwQnl%2FgXHbddkGg3l%2BYXsYDnWxBZFJBSwnGnjJVyM52ORM%2FgfAE48DlkkmkYsMHqnpjH0IYyDR5bSVyy2UbRXYpLDBapPX5e2avzp%2FIAHy3XSRC7bTvVoCY8yVd9MBUyPgL1p72XEsoVcbxYycJwgqPgnY6%2BGO8IUlnZdzzvBH7Ldr1OVIpzJ93iU3ETXFNyaiLARUGrUKcy3P40qGtYSO0fck4LFiQaeqbKDp9uNV6XDn55ZKrjDiezybBKvMXtQF0PKgfc1JyA11DWDUA8iMKyDvXVc%2FxMu%2Fv%2Fbf%2F0YkU1whYo6Rq3Yx%2B%2Bsq27CFsNqfyGsk9XFja5KecFkzCWMHg2qF%2BNXPZo822VM5hmYyEQu%2BvERUW%2BdmUcer56coQP2TuGPQsAa3CB21EtA2fojYyWSGSGQkCruxCEGvsIUSwJ82EfmXmscsOKFi2o3EUMNzt5M4GOqUBvJ%2FWprjnk7MATWwurZxYBGLbhOCOfScI5gUwjB8r4tDzQcykGD1uj8D3tbkjYJan0JLCyh%2FKo2BpEdbmD9ABbc4UxXRSBKlzQh5Q0XU%2FmcQtw9Dyv7z%2B20RWqfjC4%2B589aNOyKzkH18oZ%2BlG21Gp3aT0NaxgMpQDhtmzMqvdC8ayh0cEOAje4CArypccZ3OPrMLdZ%2F81gAMydxWNLIL9rozlVpZn&X-Amz-Signature=d64c6eb19342074b44657ec3d2f3bc4a68fc38e126fea63e6afb6f032c84c508&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QUJKWQDX%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183530Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQCjSnTWAZYwUJG%2BjUAuCOwXkfMxBf7MIfWhY5Wj4qTtYQIgaunzpYMq8WP2LcYNJx5w%2BvixoguSvTDC2epkAUyU7DEq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDH930dC%2BYE73I7zP2SrcA4yNiFxkmdG%2FI2hUQJTwoSqovDknfxug0ewHIN7knhzjeLMhAmWxwDu4Fbtz9yTw9hmUAQy4eyWn6VgIwxMzIpLml3chzLU%2BrJA%2FUXJSkaK1va2jM1ezYY1jQYNC1klISXwoqFL85EbHGqWfL2XUnfHEaVb%2Fmynf15WPUX461G0%2BC8dMV781z7SoqYgLJiwQnl%2FgXHbddkGg3l%2BYXsYDnWxBZFJBSwnGnjJVyM52ORM%2FgfAE48DlkkmkYsMHqnpjH0IYyDR5bSVyy2UbRXYpLDBapPX5e2avzp%2FIAHy3XSRC7bTvVoCY8yVd9MBUyPgL1p72XEsoVcbxYycJwgqPgnY6%2BGO8IUlnZdzzvBH7Ldr1OVIpzJ93iU3ETXFNyaiLARUGrUKcy3P40qGtYSO0fck4LFiQaeqbKDp9uNV6XDn55ZKrjDiezybBKvMXtQF0PKgfc1JyA11DWDUA8iMKyDvXVc%2FxMu%2Fv%2Fbf%2F0YkU1whYo6Rq3Yx%2B%2Bsq27CFsNqfyGsk9XFja5KecFkzCWMHg2qF%2BNXPZo822VM5hmYyEQu%2BvERUW%2BdmUcer56coQP2TuGPQsAa3CB21EtA2fojYyWSGSGQkCruxCEGvsIUSwJ82EfmXmscsOKFi2o3EUMNzt5M4GOqUBvJ%2FWprjnk7MATWwurZxYBGLbhOCOfScI5gUwjB8r4tDzQcykGD1uj8D3tbkjYJan0JLCyh%2FKo2BpEdbmD9ABbc4UxXRSBKlzQh5Q0XU%2FmcQtw9Dyv7z%2B20RWqfjC4%2B589aNOyKzkH18oZ%2BlG21Gp3aT0NaxgMpQDhtmzMqvdC8ayh0cEOAje4CArypccZ3OPrMLdZ%2F81gAMydxWNLIL9rozlVpZn&X-Amz-Signature=ff4e8ba3839817998ec2b3a806b2ba30d3b049510d45f36d49be184e851a5697&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667CIBDDLE%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183524Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIEU03PFLb2tzdRF0x6bUPP2NYg2S6ETCmOGRHo4F5upBAiEA9n37XXnl2Ak4mvJmUjXaxaMBFtOSKiO4ogHSHLc0vi0q%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDN2JA9SWYRXq1lNB6CrcAzcWN7IKZ%2FjGIZtXpLnOZYhRd9n3o%2F6b975DY7l3LtHB0za2k4EmAimL546nsWxD8Wc%2FzJ8ylMdH7R2FTDkBzS%2F3PveL0%2F1HcUMO67JW0Q2%2BP40V5Nl44wuocxlFhit2Ps4G3Ydv18q9dY6tsPcpu3RnvK%2FdVddimIYvUh9pPsbGSxo8aGGYgpuiuyWEimpgCwLjsdqKlrxYDrp%2FdKso7U%2Bllr%2FJN3UOKqPRZ4iH7wyEPJokWmkAVoyfMv5pwbKWrzKEErPTwEudqcfvC6atajCvCFcJmQLl%2F%2BB34ZGkMeaVztovbS36CFDwLnAhK%2BiBR2rWYx%2FtIXCjh5%2F1vubc7kVwhz36vuHpCsY2gP6U%2Fc2%2FrU%2Fm5B2VH3SICVq3jrXwt8Q9M8fGWK61gn52VazPmYRAHbBb%2B0ORaEh9aUSwmjxPik6zE%2Bs6gvh37jIY3FC%2BWdHB%2BZAlRTbFdb1L6OmpbTvhbgrtWBKZPTuQ0kNA5x%2FTqczhlKSaByvvGy5drEAyU30%2BuW2M4PsJhI0ArpDEnmSeoyASImYzduP7SYhZ9jl3VAyixvWm3Q1w%2B6htvYk47vTxV3Qydp9BsEicGXeVecnWdlNV70HoJZD0lbeQjvvnyyv0yeHZXjAWL6kIMOzt5M4GOqUB6Y8U%2BJQRzxa3Me433zOW0TYuukpSYx3xCGJCvnl5SzK4j%2BN%2BDzFd8wB6Q5wcW0KWUHlbvzBiS%2FPS1Uk1RmgKSSpCxMldEO0Db%2FaDmTP6hjQnlxFd3OgDO0NAUF9Ngtn22KLLLIKaIwiSMNEXg%2FPL5HW4byvl76eysueRVbvIQBdihIsDJ3J4WM7T9zxftuOBqyrgJcoaYsMAgzz2QGQE1WOIbKnC&X-Amz-Signature=f15cfd6e2c367241e407aaa145c0ec6facabdafb3916fa644e05f6dee628d423&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7ZFETII%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIDNZNvM37csGDm7aju0DtlaN0AA0gL0Lf4xEYl53FbXQAiAxtFPkrMAGU4L%2BaC1ZS7ELAf6pPvWimLvUvhAOzmAuNCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMGdANXTNaLkhLU6D8KtwDSvq5k7hACuhBccDsVx%2F5TljkhTO8X8eiYIxVkzxi7q9qHGFimFRoix%2FggTDFBEigrRkCNcHim6oUlNhO2wZgOakAE6B%2B8i2Sb5YL3ikj6Qeqisespb8nOZtMReGRG13%2F9rwUcjRhvrtxaDGaFUVi2l5fX0QvoYQZNEDxXJPlZE9soeffNfR03Sy1%2Fdphqly05CwoPZhQ53AQ64SjExtbhN6ugDW4lAF1XBFUqEWppNh4ZpeFXDtAw0SGJorT65dnHdCKIBeZz35mrBX%2BIBJeXI4i6oASG6Sd2NfwjT9YGyJ5xIbtONKTpkPjjp%2BHfJfH2TZTBnZOSfnZeN9pBqECVOk4%2B33HWgVIGkT%2Fl4%2BgYEbEswo0mh24HwMdOvSrrWSCmFzftjgopiBOau9w%2FAhtTmaungUnlMnKjdpA9WRDIZuBj4GJ96GIhqAJdbs549kkAoQCQMMV9WEsLjL9fwHSUSoWEbItqWYGqjyVCrZQNPTCf1ByxZYD1ZzbgLruQ2eo0t%2B1nKrntCFQdJuI09DTU8qGPu%2BO2TYRHccLG1Qlx93RE4FO7%2FeZrNopikauHh4AY2HosPzU4UO8uHZ84zohlUTPzn%2B6q%2FRdyiBGLo57j4F%2FVnLgk7Y7tlap6C8wne3kzgY6pgFEb1aHX7N%2BReIIvxxuVOoOVRdDQxg8zOpFqKZ4P0kDluEJBNS8lCgu2F59n%2Bs%2FL%2B7n12BtbYg%2F%2F6upnWC9kWAqITTkNnCugnUb7QtF0gEdzfl0bn%2Fha5rdG7l8KKAr%2B%2B5LBBZtqgTX%2BLth%2F5CVwiun2u8NkXLfK4WYvV1KFaXgYyX537dTjBE5RQiFMUvYMA9LYdyvdZywGrFmo72tOElb%2Fja003g7&X-Amz-Signature=fb8307399570a9bc4d8cd0b70b871ff39f325cabca792465d3106b47b90fce1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y7ZFETII%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIDNZNvM37csGDm7aju0DtlaN0AA0gL0Lf4xEYl53FbXQAiAxtFPkrMAGU4L%2BaC1ZS7ELAf6pPvWimLvUvhAOzmAuNCr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMGdANXTNaLkhLU6D8KtwDSvq5k7hACuhBccDsVx%2F5TljkhTO8X8eiYIxVkzxi7q9qHGFimFRoix%2FggTDFBEigrRkCNcHim6oUlNhO2wZgOakAE6B%2B8i2Sb5YL3ikj6Qeqisespb8nOZtMReGRG13%2F9rwUcjRhvrtxaDGaFUVi2l5fX0QvoYQZNEDxXJPlZE9soeffNfR03Sy1%2Fdphqly05CwoPZhQ53AQ64SjExtbhN6ugDW4lAF1XBFUqEWppNh4ZpeFXDtAw0SGJorT65dnHdCKIBeZz35mrBX%2BIBJeXI4i6oASG6Sd2NfwjT9YGyJ5xIbtONKTpkPjjp%2BHfJfH2TZTBnZOSfnZeN9pBqECVOk4%2B33HWgVIGkT%2Fl4%2BgYEbEswo0mh24HwMdOvSrrWSCmFzftjgopiBOau9w%2FAhtTmaungUnlMnKjdpA9WRDIZuBj4GJ96GIhqAJdbs549kkAoQCQMMV9WEsLjL9fwHSUSoWEbItqWYGqjyVCrZQNPTCf1ByxZYD1ZzbgLruQ2eo0t%2B1nKrntCFQdJuI09DTU8qGPu%2BO2TYRHccLG1Qlx93RE4FO7%2FeZrNopikauHh4AY2HosPzU4UO8uHZ84zohlUTPzn%2B6q%2FRdyiBGLo57j4F%2FVnLgk7Y7tlap6C8wne3kzgY6pgFEb1aHX7N%2BReIIvxxuVOoOVRdDQxg8zOpFqKZ4P0kDluEJBNS8lCgu2F59n%2Bs%2FL%2B7n12BtbYg%2F%2F6upnWC9kWAqITTkNnCugnUb7QtF0gEdzfl0bn%2Fha5rdG7l8KKAr%2B%2B5LBBZtqgTX%2BLth%2F5CVwiun2u8NkXLfK4WYvV1KFaXgYyX537dTjBE5RQiFMUvYMA9LYdyvdZywGrFmo72tOElb%2Fja003g7&X-Amz-Signature=fb8307399570a9bc4d8cd0b70b871ff39f325cabca792465d3106b47b90fce1b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RFOL7BFF%2F20260410%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260410T183531Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIF132tcolPkEfdw394Ct54ehlfWFxyzdLu3K3EE1Z%2B55AiAQvSWCUFj%2B2nLJFedj0lPONisqKlORQsVHWNdpokzkKyr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMIWvRukpcqHBbW7OGKtwD9QFUUKSw6amzKnPhUsHz%2B4uvBbfp1Rs5yMAxpzxsIOPPA5%2FO7g8YI3sYW7u0Jqi1W9jwPqENSBvWMNYUY%2B9cv%2F2WY2JXUJpa9deKJWq2MLVYj3ErGa1nV4uVLwHUZvboqYXMddYldAZWKpTSSOaelG8WC4dYUpKC2AFfXjewDSnlGgKrahaK%2FijYR1n1unMr3IsphFu%2Bab6DoMuTtd5hAm9hnMLKbOcsC6Z%2BYCSGNc581HSxwtobvZzJDcuY3FPrID0mElflfwjVhLpP8XxSnvihvP9d%2F26p3mOOLBGlmAcRvloWSvm94xTjfXHNBigwcg%2BRBm9oKjKmHq2%2Fit4nnW2OJXp%2BZyt5DDsGsIEwDOIuvp4Y169OZHEVC95j0O3QNhMQfPbmjuVnP4xt0UXPimwUcAM0ZWS5i%2BLuLIaiR42HNVXZXGuF23vv4Xjgn6ICab9ZpLxHlUH7XieKKWnTUXEdeDQOpGsV60v2s3xyg6jeGXk9C7Ye7si2vSeEopBE6w9Xb7UvFMheTygYihwSifTXX6sSoVf85lafOWdLlI%2B5eRLcyxW4MjtBnqNQBQkbgbrvJEh1v8gWY7HwovxHfNcEzDXBms%2BcfwQAcM7npsLloOsQvuuPWFPPn6owze3kzgY6pgGYwiyZrgNwAE0vA3UhcMWR6axhSkKq6K%2Bp0B5ZX2BglZ7HhUAvYR35rQ67%2BhdhZWqpiHcl8toj1ddSeWLYT8Yr1s84yau31OJQIKd0ESCkUuznU1aLk0Q2W0hwdcEadYIDS%2BZwKwQOT5ZTxYxTY%2FxUvBcw7SD9MKqQFrcT5yBWPIcVsedHK3DUNw5nnoYT3n53cvknGLt3bgekQ9%2FQl5hXHY8PqOxe&X-Amz-Signature=0116820ea519d59e4059c25dc28703f751295c1fe121662741469ab678911fbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

