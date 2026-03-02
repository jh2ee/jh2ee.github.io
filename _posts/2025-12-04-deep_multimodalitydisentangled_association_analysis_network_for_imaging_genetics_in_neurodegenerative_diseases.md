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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFEMPXG3%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGxQJ%2BzqlzddFZ63JgKz9IZadH7cCXYDjx2GVo5be7bSAiBnXdZOhQXxQqgOR3BjIT7kU3Juskw3vcsNGH2pkcvvViqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrcW0ilOgbX7GnbdoKtwD1AGLDMObIKx72YNXtQ%2FTxjNgI6T4AI1fPeb7EYP2BNZ2lbgTMGphuphx3dEmtebFcsbajc5PhygMf9aPYkXRT3jJYyLKk6r8OGR2l7WJeVb3QAjsKumIXT8s0EbGlc2OTdZvd6whQZYeGt9mgP1EVkFAwzM6K%2FADQD0iEAwgmrpVdelJQ3aSyWN8bbF3VzMk5WASlMT8ZpBklMKpv1x5IsJSwfsMP0eya9PDv%2BjXMEGRbAli0MS76R6UWxS313ultPk9QNGG4mJJp2LP59Pw7Q5fyTr7T0EhQbQwQmWp3A%2BkTRpyWbai24H4rxf6igNVYbEXRElGZkOKTFUeDSbrs9f1sxuoN77TGxlzZ5%2Fi%2F%2F3jONg2EDSx6cspzwBTKETB2IqLd1h02V8G7lYjK2Lt%2BMDQ8bNCDN70ca6iykzrrOIVvBW7%2BP0wCoNniuB0yHbJB2H7wsczgfGTmIYXXZEjRQxDXvfb3DlTczEfKvN9%2FwTxeIybQesvF3EfsH97FG7oj3Cj3ilRkgSRQu9xXitbTqKy2Esoft53xgYDVXzykPWmsnHDsGt5XEl%2FnLCArKQptE%2BXKAaHqbyvlRp4FFqL8l%2BBNQ1J7l4rOOAv10zRJK1a%2FdvNuZuMSpq%2FEMMwhZWVzQY6pgEC0VQG5JFLHxauCHTMHWfm7W7inD0e3XMbkOZtaFtVzvQvynP%2BqPO%2BnhL20941Pvq3X8OGHEf1RkpJ1aqGkoI8RCJalx51D5eCit3dLfc67VFH0YFdL6Aq%2B2SiQVs2g6ApexwBYMpha%2F2CF1B1a0kZ7cx1%2FKjj3oEl%2B8uCorb2fxFXuR%2FktaJ3l9v8k4rrD9D6HMNOHkZinMoCUBo5rc2P2YoHnET9&X-Amz-Signature=86a02c6d346d092f89fb2207e954915a489031f3331d9a3d38445d55e3e9c8f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFEMPXG3%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093432Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIGxQJ%2BzqlzddFZ63JgKz9IZadH7cCXYDjx2GVo5be7bSAiBnXdZOhQXxQqgOR3BjIT7kU3Juskw3vcsNGH2pkcvvViqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMrcW0ilOgbX7GnbdoKtwD1AGLDMObIKx72YNXtQ%2FTxjNgI6T4AI1fPeb7EYP2BNZ2lbgTMGphuphx3dEmtebFcsbajc5PhygMf9aPYkXRT3jJYyLKk6r8OGR2l7WJeVb3QAjsKumIXT8s0EbGlc2OTdZvd6whQZYeGt9mgP1EVkFAwzM6K%2FADQD0iEAwgmrpVdelJQ3aSyWN8bbF3VzMk5WASlMT8ZpBklMKpv1x5IsJSwfsMP0eya9PDv%2BjXMEGRbAli0MS76R6UWxS313ultPk9QNGG4mJJp2LP59Pw7Q5fyTr7T0EhQbQwQmWp3A%2BkTRpyWbai24H4rxf6igNVYbEXRElGZkOKTFUeDSbrs9f1sxuoN77TGxlzZ5%2Fi%2F%2F3jONg2EDSx6cspzwBTKETB2IqLd1h02V8G7lYjK2Lt%2BMDQ8bNCDN70ca6iykzrrOIVvBW7%2BP0wCoNniuB0yHbJB2H7wsczgfGTmIYXXZEjRQxDXvfb3DlTczEfKvN9%2FwTxeIybQesvF3EfsH97FG7oj3Cj3ilRkgSRQu9xXitbTqKy2Esoft53xgYDVXzykPWmsnHDsGt5XEl%2FnLCArKQptE%2BXKAaHqbyvlRp4FFqL8l%2BBNQ1J7l4rOOAv10zRJK1a%2FdvNuZuMSpq%2FEMMwhZWVzQY6pgEC0VQG5JFLHxauCHTMHWfm7W7inD0e3XMbkOZtaFtVzvQvynP%2BqPO%2BnhL20941Pvq3X8OGHEf1RkpJ1aqGkoI8RCJalx51D5eCit3dLfc67VFH0YFdL6Aq%2B2SiQVs2g6ApexwBYMpha%2F2CF1B1a0kZ7cx1%2FKjj3oEl%2B8uCorb2fxFXuR%2FktaJ3l9v8k4rrD9D6HMNOHkZinMoCUBo5rc2P2YoHnET9&X-Amz-Signature=86a02c6d346d092f89fb2207e954915a489031f3331d9a3d38445d55e3e9c8f8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TSL5GC3P%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093434Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDAftB%2FKy4Rr1zXyTCH0u8e00R3h9xxq9RdKq1E0FJLkAiAjshAVCYNOmE4FpjWFQZExPuzLp5hIn4PCueTGTGgRMCqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM4ZbuBsPfbSiQL0J%2FKtwDh1Kyzj81yC2iT3yq3QVINY%2F35ll%2FOUK6tSqaekk8WWq80T3IUfy5%2FhOgVIH%2FLaVmF71OG6pyXSjYNXbjknQpgZyPEqUTxebwCPlFkpy6vlgAZjKvlc%2FcSRKbtow9iOcnARDr5zOzg4Igu2cWhSx7fcbOgNgTLjTSJq6u0ezRh3%2F1ZW4HSH0XJoi3jNH4WoVAdlhO%2BiahtQmr6QyDij2XABScqwlcCmn7qScC9eihaq1iSsMywHR9AzIqwt3pHFRJI5QLY6RA7MYENtr%2BnLhXH9hrIxQmd5xdWIBLs9A2n8blA3VNdZ%2BxNMMGgZi94uiA%2BhArdI61%2Bf2NA2yqz%2FE1dOIAK2SPKf%2F52Zff3cq3Krz%2FWU27htPAmm5%2FDo8q2IHyTpGiAcKwG0N9HqN%2F5Mpmx297B30GTDxzJK1S%2FlNTUObUOTHQWMGjOJHJpW7Kf19S9WRl47l%2B4TsygwF43BKjVCeT%2B6HMF79X4ZKmkOe4PnT9bUvKEFNKoh47eBbY9LUHd4a%2BaC%2Bkdwsh%2B46qvw%2Bl1ZIR4isR4gyOU4LbTGLj5In0hdVhE9ICFhmn7p1GNMm1pC5ERdOUNNTZ8avmVDEFXVHhCbAfBTNqqWkhqN21G05wgDibw5D8Tukc8GMw6ZSVzQY6pgFCwOysXPDGKx7q85TivlZO0CcDdiO1YfPN1xPzCGIBAPBjA%2BrDU0xQhvrPm87PtU6h%2FCSUoQwp7BTT6HITHavnltwrcbvuIw0qWafz%2BuFtQ2jwF5dCrP%2FVehm8dv5eYsA6rKu5gEujwel5LUHQzWYbJXmbk%2F%2FI4Nxt0Mo2fUKJB57c3DWyGgLXseUiEjq1vCs%2FOeG9wZa6VFyqSwcmUF%2Fi3YOlwCQD&X-Amz-Signature=658373bcb3a96fdcc1eb1841c7858501ed94733cdf490a78674c43e66cffd25a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626ZZZMII%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdzVbcAz0WwAv3y00eZhMwooCrSKToZsAi4J%2F5PtP%2BpwIgSfGw8XqUalFnRbapOW4z2h1lCn1E2IgA8cjTBJU75AIqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHvIB8YjbMwERaBjUCrcA103%2BRDOKPSyDDWz5Lf4ZJOIIvFrUWRO2Lx36GPJ3PeNytLY%2F1WWefuRFpc9PVNWFmFF2EnNubpM2abxClXhMEnDEVsED%2FBNwW254PQ9VBwlVZt5HO0G4r1tLvpnogT%2BzI4Tg6CdpMk5KI8CCr7GSK0mrTfD0fD%2FNUG8TMIuPwqmWTJdyJgOwOQJV0bsPAdi1W4pcEoMasL0A6CGtdNM346PkLbHO2mbn2D5qCjFuuEdOQ30DCeU72k%2BHewy0l1H5hOfsmhCj2j7QSKNyPS0PqJzEfCLEmXudlObbygd2cAZ6GOeGXDyZ%2FhRuZBU%2FTn8lcynBY6FPmfoU2KErH4OEw7ZKXcgmzJAbARaDoxmLpu5xGjYQVOuEZpc7D3E1B%2FYshI%2FAALFXtnU15s0NgeIKmAKp3XFlfXAbYChsK%2BwIW4%2FJBxuMx21ywKOEhpVefFxrh%2Fw0modkMdgJmUlLhldq8xMsqsHjvtdz6A8P%2BbpuLCD15lHYlm5eH5f2U2v0u%2F9MrsZ4YHDN92Bk9H2qPvYkqWK2AqK4RysX9M%2BZ1cHBjCx8ollLAAyR1nMhBf3V2LdysSX5NhbBeHiEOAwzVl5voZJ4FlRMrioS4p4IGASV2kM8C8SzKMzsI76J6JcMJyUlc0GOqUB6N5CfyWIoAFlb4ZSRcItI5kDENs5Uj3gu6mDak%2B%2FVX%2BuYcT6F2g%2Bv8RBfqLiuGU7mZMNMmBtwzdMcuF2WumGd%2BGUmT4kBVz4K8g7Ite1LD%2BY%2BINeN%2FJ5nejV8XaFWVdGV41m2WfAEDMaysqkPm2sbrPn5kyDtCGDD4qT9crP9mbj1yVhM5cJ9WZ%2BVOrriPrFeJeIcvMM%2BDrrCwmslm7boXxtQ%2B9C&X-Amz-Signature=a1d526058940046a9871739f9bbc2fbf5f1b6af09b2fc4ba061154277e688404&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46626ZZZMII%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093439Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDdzVbcAz0WwAv3y00eZhMwooCrSKToZsAi4J%2F5PtP%2BpwIgSfGw8XqUalFnRbapOW4z2h1lCn1E2IgA8cjTBJU75AIqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDHvIB8YjbMwERaBjUCrcA103%2BRDOKPSyDDWz5Lf4ZJOIIvFrUWRO2Lx36GPJ3PeNytLY%2F1WWefuRFpc9PVNWFmFF2EnNubpM2abxClXhMEnDEVsED%2FBNwW254PQ9VBwlVZt5HO0G4r1tLvpnogT%2BzI4Tg6CdpMk5KI8CCr7GSK0mrTfD0fD%2FNUG8TMIuPwqmWTJdyJgOwOQJV0bsPAdi1W4pcEoMasL0A6CGtdNM346PkLbHO2mbn2D5qCjFuuEdOQ30DCeU72k%2BHewy0l1H5hOfsmhCj2j7QSKNyPS0PqJzEfCLEmXudlObbygd2cAZ6GOeGXDyZ%2FhRuZBU%2FTn8lcynBY6FPmfoU2KErH4OEw7ZKXcgmzJAbARaDoxmLpu5xGjYQVOuEZpc7D3E1B%2FYshI%2FAALFXtnU15s0NgeIKmAKp3XFlfXAbYChsK%2BwIW4%2FJBxuMx21ywKOEhpVefFxrh%2Fw0modkMdgJmUlLhldq8xMsqsHjvtdz6A8P%2BbpuLCD15lHYlm5eH5f2U2v0u%2F9MrsZ4YHDN92Bk9H2qPvYkqWK2AqK4RysX9M%2BZ1cHBjCx8ollLAAyR1nMhBf3V2LdysSX5NhbBeHiEOAwzVl5voZJ4FlRMrioS4p4IGASV2kM8C8SzKMzsI76J6JcMJyUlc0GOqUB6N5CfyWIoAFlb4ZSRcItI5kDENs5Uj3gu6mDak%2B%2FVX%2BuYcT6F2g%2Bv8RBfqLiuGU7mZMNMmBtwzdMcuF2WumGd%2BGUmT4kBVz4K8g7Ite1LD%2BY%2BINeN%2FJ5nejV8XaFWVdGV41m2WfAEDMaysqkPm2sbrPn5kyDtCGDD4qT9crP9mbj1yVhM5cJ9WZ%2BVOrriPrFeJeIcvMM%2BDrrCwmslm7boXxtQ%2B9C&X-Amz-Signature=5b2160a185ef24126b33044d498fe9544b5095a7d82547a8a99a33691171c0d3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663WOGZTZ4%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093440Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIG14BZ3FFr4FfIRRmSw5Vt6m4dK6YuqZW7YMMUKUaY4wAiEAxpgL%2BzirUasvlkTOv9oucNyCJD%2FufHMfTvTBcoTt3J0qiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBHnvMG9naWwV5FSxSrcA1g8M1XpPbQUrqpIT6DwHaemY7qOx97byh7tHV7t0nUeNoVNIj0xlKFg9LBbAeMYzDA7jpHYE%2F1trGDa%2Fpfxq5lhz0B4qQxctHCTqjwfIiHac46Uq4NE1FfZ2t1UBvH90h%2BZev1aPWudRb3Wk6926Ye5VVdg1KgtwqjeJnGiM72GaFTFsfRHsNbid2Tqx45ZLXQWuBmvpXSweONVjK6pZGNuKbOirW%2FMdcNL%2FZQRoNkOaSWZS00jcOqtv0h7Den4Z%2FiCyiHSFFYyv3TGMO3Nf%2B0ESfCGzZM%2F6x%2BXZkY649GTwUDFllgjTH14BSaNqpfAWkJwn%2F2QiJuFgWMM1OYEjK9iWLXSAI%2FMdPxEUbZz%2F1XHSkeWGun9X%2B1X4I2tlIkJ3%2FoxxBeoqCmXpZJDve3eoe19vaKXgBxTEZZrVdZFSgvKMdomcOClJnpiVYsNxsdfZ0Jx3xPpMopfiKtz5pmZugMeDAMrIvLndvsd4NweVaL2Sj0eowq7U%2BBUOgEu1bJAyePIuhJE3Ls%2FmSrEpl%2FdIGyctZBR0%2FBwc5gYeg2cFrnxDJZMkpv4uvypxUT57J2VfSsNUhe%2BZZx0tQ8WZ4CJ0lblotOxVakc%2F%2BVsNeNSCEIQ121VUR2K%2B0YeZM2WMJeUlc0GOqUByA05D3ykcs%2BX7QDj9SGyREI84MR9zJE9W4kolbVj3xXBC7CoDkCf00ReKJJsltIycgeRRH8WnGRREGq0kQWz92mbHSsngBq%2BOVLna5fT6hiWV8quC6N7%2FifQoV99W3GkdZAVlXbMk4v%2BEj9Ov0bYMYZlnanNB9UpLjVrATcuUlUPLwYjtzYEN3luwNmCsLH%2B2wYEOkH1BtdF60vVPqdUKlb3wf43&X-Amz-Signature=0095a93c86f2c85269c7f1cd51632b42d948c540f765f9f6596be3715c9feaaf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666UD6QZO6%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093441Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQCfLjxYycZXqCTAkZJMoDWCziJGrByaifdjFhmbVExNYgIgc0iNrEglqWQGqzmDzxoyhLYGpV5YQ4Z4AAwdnCHXvRUqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKsfAxQUMCz1RYO2LSrcA%2F4JkNWRZBfeuuJuNCckRk6BZYrqblzTDhX0cmwxhU7bWbkyVuvXAamdi3zmeX%2FiWt0XKgdwaBKvnjdpom2ybASIZncqVdLlbtWk%2FiAl4SdzLLrGvpCQJKFovPlVBaptJlBzPF9SISIBdnfskX8qRJJ5VttmOk4xDl2%2BDTGofK%2BZS1hfKsPLq3CwDA2R%2B40JWu1XAfcKqKMq%2F83zmV%2B4BA0et220Ib4d%2FOE0GLjCWex80OCUKDqv26GOKr3rol5WFf4YvDIUrNUSWRp1aH4uBaJkfYQtjWmRGKYL2JXz9adCu5vuZf3SV5AhHrqsOVVmvfDcYmZ7JJOxGmvDz0DU4oU1Tp5NdOrYuTHza8Hqmejwuni9Y%2Bgl7Kze8UsIHAC2Ttz2cRlVnZGXm2yZnC4qOx%2BxsRtZwcJrBWuE2q7ktiRXCgvD9K3mSP5lDA%2FJLnCqszU6%2FJhA7sb%2FzBxjgFQBgJ6GTgeUmbj7uhmUv5NiWBwgufalB8vL7pe6A6L5BYJxGStlCvFCKHJRl8sZdxUr4uYLavUQmuVsonabZ2WRyV8F%2FXSqAhi1u%2FKsupHYBPJrL9s7qy4helwJeoGmcCJzzXOTnhVwQWzmT9wTVy0w5p5T2Fa7%2B2lK5zLc9hknMOWTlc0GOqUB43VQ5sCLJRNKSb3iZM21F%2F2ZJBJl9VDu6BcipRES0IdJK8WBKaZjQ019bfvss4IKLJPsCDWvY85l1dSYZ0Cg%2BXPpfe%2FVylHFxf8T8DBs4xSQMKTYOkjx4797%2BM9e0X1BNrktB1FvwdTLNwZp0yfOiXqqTSsUGfm7EtV%2FnC5zlFj6dpkdOsQRNl32fTSgT%2F3WsPCAR2gsELfS8u4W3Cu0rDPxRsSy&X-Amz-Signature=021858859980ae0a02d7ac1658402550d993c38c7c68000b39651acea1a29aef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WNA7CH5X%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093445Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIDObEaBP1%2FP6mLB1%2FivkN93qJCR11VBeNV5y7K9n0i1GAiEAmq1j8alHztrP20KscY1TR0Kld9GNB7CVwRs9g7HXhEoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCJQzNx6QENLGzXCiircA8HX7Dqo9j0vBbFgW8jJUI0%2F%2B%2Fk6cSsr78WDzZ4qD4J98%2FBA%2FI9bT5FDq1%2BRI8g7EKrNs%2Bj%2FuyyJNZbt0u9PtlHOelUcxkGMcLL1fQBgGYM6ppbYdzxXq5vIrRF2uGwEINA7z5oqC%2BZjYBFTfK8CeRHGsLkyGms0v%2FFapumO4oyLD9eSCRzdIew62WFy0v9JXaCqE%2BYkk5zV4NKSlo3gZGhYSyRjzoa7ZsCTEHVy38XNJPHOgusRiEzQFKU0AjQR%2FZ%2BFT8nJOrgpwjpboEYa%2FENjwbvYUWWZ%2BKz1XslBQm5MlByEyo1uKX5T%2Faa7R5dU6egX%2FM3Na19khGODzqnTWkVsPn2jrj%2F0VyevHTFiGHxQFKoBuAzqF0eodjo1ZSJJEikpRFEfNLnCeYYOImJQgeJ25feHRYO76xBXyqxERok7AW9Tsxd8iCf4v4dGHuwqqH0uIJPf7JcmuxoPoAs3OGk0Kj%2FIVhINFD0Yqigqqo9XfWyeu2uwRusjD32wRUtrowjG6hlcdowFFjqn%2Fx3uDojgRK5xUoPubNivikaiw5E4kBzGCvbdwWgyiwRp0jlxJ9sqH9wlSESswY%2B%2BQaRUr3xahHaNy8CB0jDebyGGahxd5IgSHesOhpsqSkgcMMqUlc0GOqUBidK99lQxTXRyzbB3GfCTNWGTO4g4OQ5qF8NvFz6MvJtJUmKGaWwGm4hWx3GPK61fLrR%2BtiVIioQdHxmlK96DAt%2BFgpb10SEI75jZLPjKoCibj%2BLgB%2BMBOWGkC8b3DibLHyxo9u4O2Bjl8pRNMYKGNtd3kAC29TJyPS2hQ9kOJFDkYoqNbtkeQsm68qM0tiVafMh90QlE1u78jcDwXOPG%2FVG2ltVE&X-Amz-Signature=7fd7f6ad9f1e46ff48788a9cda85219a83da86b84dc82692ef2956731e5cd175&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NRIHFT7%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAL%2BpKsu%2Be9JvhKTTTxt4TtjhXn5tg1Y8a0cMFJXqimVAiEAqBqOa5nwivd3TUh2kh6QKQ%2FMw9GkI7TWSRgCaFb1e%2BoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF9ozuq0JPz7SQ2rkSrcA6XkmSFrX50bI%2FAsUtFiImP0B4XA%2FsxUaAucmZKO5VQfnOicDlv%2FQHWf%2Fkp5croxdXDPvQvmdCKx2D8d4k34%2BfmK1OBYbPrf1ZvcCwfJRX%2BK599Vqvl7nusYKRFlPEcN7EWqyOHV98Hs1PDJX2iB68Te%2FFKMsGeew0VkJ712TVKPlxZTHDswp6Esxm1dYLL1VxE7o7Emju8J73ylJlQpXfyGNGFuNcfgEXGlmw3brZs5iGWD%2BVHQPtG7s54xZqGtDiChpxrmSJQ3ZKjD5jHq7Y%2F8HK57bh2qcPWGJwU%2BsxyDJu1c0zR%2F07BwRr11b3UbGlD2kpZDSU4xdBu2tgpFjfr8cUlp57qn9cFQsZafvxwlHclS0JFl7px6cUnwslF6jsm0JlQMuhBjT6AmDlyy2fSCYZuIa68R16SIhxr3VRIf9qjxWkivt365DKe3guTmv23eFqGmMx1g8Y8g8%2B6An63EXthaVeCz%2BjTd%2FNDqj8ufwopCKvsYWmQx0AiX3FuAUFdGxDoGYaMvlDTRwvU5pJq6E3mV9Of6or21umWwZZeBiZCXh2aAX%2B6Sp5ehw981faR8pPOKLcOqaCh%2BqINSKEjDabRfvd%2B6GbnQsZGFttvjOdm%2Blbp%2BFRumrXCIMMuUlc0GOqUBAl%2B%2BcOqMDpFpNDvVYJ3CKBF%2FtSLX9Vw%2BaFEQ51N61fQWbRUVFVbVEmXf3rf0Tx3w4P6KU9zk6I8myPfmgLLpmNUt4gNW4bMG%2BJCcwSHZ737Qz2Jw7Vslwckcy3tT4LvIdlRuYdEwhjMQUmOqgg2toe6hPP7Sa0u2EtBcN72WjzHsMbBtNMyBegRjUfgCF9Mz5qey2k8RzN%2B49j59fq8RInVS5BJU&X-Amz-Signature=740350c8f771e6595f792fbfe6ca2785b64dad8fbb4b80cf3b2e88a074c8c50e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665NRIHFT7%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093446Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIAL%2BpKsu%2Be9JvhKTTTxt4TtjhXn5tg1Y8a0cMFJXqimVAiEAqBqOa5nwivd3TUh2kh6QKQ%2FMw9GkI7TWSRgCaFb1e%2BoqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF9ozuq0JPz7SQ2rkSrcA6XkmSFrX50bI%2FAsUtFiImP0B4XA%2FsxUaAucmZKO5VQfnOicDlv%2FQHWf%2Fkp5croxdXDPvQvmdCKx2D8d4k34%2BfmK1OBYbPrf1ZvcCwfJRX%2BK599Vqvl7nusYKRFlPEcN7EWqyOHV98Hs1PDJX2iB68Te%2FFKMsGeew0VkJ712TVKPlxZTHDswp6Esxm1dYLL1VxE7o7Emju8J73ylJlQpXfyGNGFuNcfgEXGlmw3brZs5iGWD%2BVHQPtG7s54xZqGtDiChpxrmSJQ3ZKjD5jHq7Y%2F8HK57bh2qcPWGJwU%2BsxyDJu1c0zR%2F07BwRr11b3UbGlD2kpZDSU4xdBu2tgpFjfr8cUlp57qn9cFQsZafvxwlHclS0JFl7px6cUnwslF6jsm0JlQMuhBjT6AmDlyy2fSCYZuIa68R16SIhxr3VRIf9qjxWkivt365DKe3guTmv23eFqGmMx1g8Y8g8%2B6An63EXthaVeCz%2BjTd%2FNDqj8ufwopCKvsYWmQx0AiX3FuAUFdGxDoGYaMvlDTRwvU5pJq6E3mV9Of6or21umWwZZeBiZCXh2aAX%2B6Sp5ehw981faR8pPOKLcOqaCh%2BqINSKEjDabRfvd%2B6GbnQsZGFttvjOdm%2Blbp%2BFRumrXCIMMuUlc0GOqUBAl%2B%2BcOqMDpFpNDvVYJ3CKBF%2FtSLX9Vw%2BaFEQ51N61fQWbRUVFVbVEmXf3rf0Tx3w4P6KU9zk6I8myPfmgLLpmNUt4gNW4bMG%2BJCcwSHZ737Qz2Jw7Vslwckcy3tT4LvIdlRuYdEwhjMQUmOqgg2toe6hPP7Sa0u2EtBcN72WjzHsMbBtNMyBegRjUfgCF9Mz5qey2k8RzN%2B49j59fq8RInVS5BJU&X-Amz-Signature=3e0cfdc05f61c69382d9dacb55d9e041777be973aaff2e13b3ac1aaa41e37bef&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UCGLHOVZ%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093428Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJHMEUCIQDppSRY1teynZc3naiFzOZWdes%2B0m2FeiMSqjrKfAE8BgIgWp99WZlUI%2BqkQFxsXVQEc7Mvfl2tLdWbtTYz6l9q9ncqiAQIgv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDLzNMB4b6qA6KzC%2F%2FSrcA%2B9195JekfcM6s9v3heYDbWsKT8oQzwBJJCCEKIhBh0Ie6VOaHCDOsavLP0INAVukt4VsAPBfPQM1zkAnMVYzV0%2B9b5kvhUMZZi2yHxhzHK%2B9oOxr3hxzXKBxLxuBFqqei5yuQSsSHVfMZnUZHpy9FI2Y3ML4oosgP2S8QiHXAP5mUsZtsI56EjarMOLIh0wUgXkjN8%2FPGkxLhFWO2iQYVVhPphFFXIPTteArjc3a9xta7znMT%2BI%2F5LdNzfneyCui3qjvHaxzyv4X9dUIplaSfOxDDbtFDRZObON7n5NeAesDKYBAiLERyrZvrWvlzwuVqjVG5Fy0oB%2FqsusVuLLk1WA9HGcYNDrEbXIk8%2Fzm4XSc9Pbd0gFcUme3ph4W6%2FasNnWPqzplnpNz4ymJoGYqR%2FnmUacK496MMlVfsSSCtFWz4odk8VqWitwoKPNju%2BXWVp8Pw3VJle8XnTskKmcgJz041VwxT5NklCR9rHKZmP4nK2r0bS2h8y3EbzzM6SRNdxhc4D%2BVJqFMJNSuOoa5qteliYsfSC49xWz8bQVzIemcHYouvppo8s%2FOz5CWg1Q00NkStmhzCOWZiKgkU%2Bxxabtrg0UC8NxyVPRET6nrU2WI8DMgEF1nfV%2B896oMI2Vlc0GOqUBuXD%2F9xNnm%2B6fEuzVU5dQq5X58OMZTTxmil40sAJ%2FEO1cvotIx%2BFUMct7uZrK0Tpeo8D8aNPf2v8K4ke3nYhx8OSpptq3f6tfuarYsrovFTgTD%2FELhrPVQVvrMPp1IL2Rwtf%2BhU5qg5RrBs7yCrx1u5ke4%2FqE5TBIAbkelXc5MVE7txlaFiBJQRAokwnVhBEcp5XgAQq42E8ItxGhI3ieEb%2FAaD5a&X-Amz-Signature=ea54e149a0f273bb61ce9b1e75b4cd7f8c2b902601cece88dee35fd89f39107f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MJ4X6WF%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEtgXahKGOVMhNRu4hRY3Ghb43nAvpwNiOaQt3jcpr8%2BAiBXjvwXSFm%2BJX7iZLP%2Bxh0SfhXs%2B%2FqQTsvqqXMgV2fg8CqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjKX937tEn8QRzoBLKtwDylxWjBttxZV%2BcSANDmJAOAYZHvMVTFsGuE1spu%2FAyWNvGXykBuT5n9sD9DV%2FzEyTGsJa7iRKBAAll9g1feQ3dM9LIducQNJ%2FiIRLwKa6FNREvM7%2BECCcJVHJwjQ4cqDoiNXLumT3LMaGKF9VXJDFCNNfDHRWHfFfHOHyVML8mm7j8q6kflU6f0J9IfzyPLImYbFnMvI0gldxT5ZUqP5RXuIgtM3WdpwTgrAM%2FnSNZuX5xpxWoLdTmeBq4RcWdep0mzynnqN9fMzi%2BGQXN3m%2FGVpTKKQvYUx6pLoCKHJfZpnfwtwHknEBxm%2FTWIj8aq62M7yl6w2NiCugj%2BkltI5IrOfOUJqq3VmtIV8dMtjDoaBZHoDjmW2iMHxlXYPS%2BadZq8fvNo0VuqYj6FM7neTEvenK7cfzYH8MJ3fcRS8kSvihoqLuLigE6N2yCXa7nXoUAxcE%2FMF%2FxI1yXkgPOa1VOkUvD61fe%2FwdJfZgLRkfDym1cExi%2BlwdQBMTU%2BQ52OuZ7V7JpPF8BSnL7p%2FUQsQn0aSYckwfvCdhPdkfCQUhz1uDWnzaQEtfdnZFDtQWz364IOsbLwYY9HnbEg4nxWoou%2FkXnIJbRfd%2F9qCWXVyaGJ5hplDRNSAEwQB5UBcwoZSVzQY6pgGbxapr5%2B5RU4qpKz9reoxRP8AB%2BiqgzfuZNiMb4HpDj%2B%2FEG%2BHrjYjcN%2B1RuHNVO7Hb8XXV7z3VWylN7CVbCPMepLO%2FbbvuAGGIa92KLiLgj6r%2F9whff2d4%2FNPrdgrTWyX5GFeVYz6CVvhFk%2BPJMd0tOi%2FxzyfpLxTLQexaKWE%2Be6ueZM%2FPK5IWAsemyoVhgSY8Fk%2FQpcmYyBrU1LfKHUcshlK%2BIjMH&X-Amz-Signature=4f4da8cfd9c1943b9cd1744545b8ddcdea7ae17f7a41ed3dd5f648a6d4168f33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663MJ4X6WF%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIEtgXahKGOVMhNRu4hRY3Ghb43nAvpwNiOaQt3jcpr8%2BAiBXjvwXSFm%2BJX7iZLP%2Bxh0SfhXs%2B%2FqQTsvqqXMgV2fg8CqIBAiC%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMjKX937tEn8QRzoBLKtwDylxWjBttxZV%2BcSANDmJAOAYZHvMVTFsGuE1spu%2FAyWNvGXykBuT5n9sD9DV%2FzEyTGsJa7iRKBAAll9g1feQ3dM9LIducQNJ%2FiIRLwKa6FNREvM7%2BECCcJVHJwjQ4cqDoiNXLumT3LMaGKF9VXJDFCNNfDHRWHfFfHOHyVML8mm7j8q6kflU6f0J9IfzyPLImYbFnMvI0gldxT5ZUqP5RXuIgtM3WdpwTgrAM%2FnSNZuX5xpxWoLdTmeBq4RcWdep0mzynnqN9fMzi%2BGQXN3m%2FGVpTKKQvYUx6pLoCKHJfZpnfwtwHknEBxm%2FTWIj8aq62M7yl6w2NiCugj%2BkltI5IrOfOUJqq3VmtIV8dMtjDoaBZHoDjmW2iMHxlXYPS%2BadZq8fvNo0VuqYj6FM7neTEvenK7cfzYH8MJ3fcRS8kSvihoqLuLigE6N2yCXa7nXoUAxcE%2FMF%2FxI1yXkgPOa1VOkUvD61fe%2FwdJfZgLRkfDym1cExi%2BlwdQBMTU%2BQ52OuZ7V7JpPF8BSnL7p%2FUQsQn0aSYckwfvCdhPdkfCQUhz1uDWnzaQEtfdnZFDtQWz364IOsbLwYY9HnbEg4nxWoou%2FkXnIJbRfd%2F9qCWXVyaGJ5hplDRNSAEwQB5UBcwoZSVzQY6pgGbxapr5%2B5RU4qpKz9reoxRP8AB%2BiqgzfuZNiMb4HpDj%2B%2FEG%2BHrjYjcN%2B1RuHNVO7Hb8XXV7z3VWylN7CVbCPMepLO%2FbbvuAGGIa92KLiLgj6r%2F9whff2d4%2FNPrdgrTWyX5GFeVYz6CVvhFk%2BPJMd0tOi%2FxzyfpLxTLQexaKWE%2Be6ueZM%2FPK5IWAsemyoVhgSY8Fk%2FQpcmYyBrU1LfKHUcshlK%2BIjMH&X-Amz-Signature=4f4da8cfd9c1943b9cd1744545b8ddcdea7ae17f7a41ed3dd5f648a6d4168f33&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XPTOGHWW%2F20260302%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260302T093448Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjELn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIDyrukAGr1v7bHk9vhYUAmD3IlFiJM0MlyCaQ9diwlgNAiA2M8zn03PGZ%2FsEhQAxwCeMAJhMMCuQ1h79VvZt4ILxhiqIBAiB%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMcKtPNfvBcbknWzXYKtwDxp4KLYn3aQ3ibJR857FoG3%2Boive69T37tymlu%2BEp1xaZsJKStPpb7iBZtjOfWXt4Vr2FXICaF8mhn%2BfP9qQAbBoW0OvHJ64m5RsO12NMjQDe%2FEGR8SnP85Fq02GeqgUVyM%2BpZG8vfKdyUqfqBVWmxaUvEmTD2Hi0%2BjYsC76jA6oood2EBExcYOBGwC4tZLRIsm40xJCYYkZinCf6gV3HyZnDdXRf%2FY5MblncCqK8kplCf6AgWYN1YkBIczISmERuZQb1ApDlP6zPr9X2eCEc9YExNfWjPNM67MFu1Jdn5wq9ktAWoDkYbObaKK2izMmJTU6octQ95J58LcgBL%2B%2BoonoeEgkj%2Fy%2FfeUsNyDi8GsMnN9s0W5kWIHbOfF51yUHDeQCdsuxQdzA%2F5YioPsoPfcAgU9XIOtraq%2BEUN3L95cQSPuBr%2F%2FKVNrhB12JP2PjJenLtVUHJmxaCE1hUhH1%2FOQ0JVvrU4Hy7wAM05KHFOdcsmF09xZOfBuYyek6jfCC8bFp67xntqpGAKkz1bwJcBIkuwJdPmzspYGvuVR00JEgAJhLntoL709D%2FQsPfrtGJLITyENcNZmxL0nBgwfskwd725jT5OUCMZ9LZh%2FsyN8DPJA0XwrehMtJS6OowppSVzQY6pgHeVj0SzJNvhIgM1qwbP%2BhcfaWf74KJ8tL%2FvRNEnLAizuWXC1qLuPR3e0XfnHfUR66rY9Zx%2F2FvpdV9CE8LLgEStnwrTyVPcBytfi%2BUyo1ACTmyqSt1ZN8GN5Yvad9gk%2FTVDU5V6y%2FbfS84vsiZ4WBT3SGwdXjRlvWAcxOGbEYmhB5LkpTg%2BOuesyvX%2BrTIXRjbtdkbP%2FPZsUCw0TslS2vIAb%2FB5EGc&X-Amz-Signature=c324d1a39e8a34b367b1098038ac7f9148a4f779e7bc5dde8fb27a69bf74e054&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

