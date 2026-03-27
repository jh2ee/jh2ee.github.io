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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W25WL36G%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEew0gUn%2F%2BuUXvc1GaTt%2F%2BX9FuvV2UJ%2FNgXV8FNMrx3PAiA0XdWokoSgfSqp%2FWn31yhgP0QfzUyKYIYEHQTDyvdvRyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzrfXNkOFwtl8y6mdKtwD1gIe9NMu%2BCP2lzwMGtIm%2Fr48pe98Z4dRolWI02Yrj99wMFRmM1wYlv8D05V8V%2B7uUdcBQTD%2FYHno4ZfnZte2JWKj7QvDJBiU31TisUuOc4M%2F6QIQ53rokNwb06UMcYAsUXfMv4UJD%2F4HGe30vGjDHshLnD5zvpejNK9Vhx2%2Fi9D206Lqp86%2BKEnxlZrwFUosx4Gksn%2FGM5tbeHGLYw4UCO70%2BIj%2BqbZDiKj3yDCqY5ozRRoxthAW5c3o0ZeFnwS57wfS8MRnzWMGMuZO9No23WJdVIkmo7FLUstAP6t%2Fa%2FPOZ%2ByvUsvwJA69%2Bw2DsR366s90MW34zOixXK39nXCjx9SJdlBVmBJp6RAR481zA1pGEf9IasSTUpcDDXY%2FafZb7p8%2BIfbMyCl86cxCfK4VloGwuDmhPGIo1uQWQr5ijbulRUfg2JKZwrg7iR83o1ICk6YWRFdc21P26TyC8AWYBnOnZsK3H8UFhCSJHgJk60HS3RmzXauf3Uq6Elf7QpSg50qvKyUbvZWd%2Fs2jJ8maJHPyEhy0gtMQmU1jaDWVvsmYN0m7%2FRwqTE5zvgjYMWyqMfgfk1w1IWONHkj44PwyFT%2B9T%2B4kMyUV8poXse0%2FFpBwFpXId%2BpcEi574%2Fgwl%2F%2BbzgY6pgFO%2F%2BZtpWHTNBpf%2FU408BWNWJ04va2tNa6tQZ2hL%2FtOGpLh2ZHt%2BrqjTPqHEug6nr4FFVNwm2knMtUESbvy4ja%2F9AaF9PhpCbkM%2FgXjNv4zYoilgG2ltB8vCiXtcWFrjm0xd1q8ijaKAWco9YOZA7Lorb6BWZHjuDzx4kxg0n65P1Bv%2BVxBAVTX7h%2F5GjN5%2FZqQm8bSQ6A0OWX8%2F2gpb%2Fg4zJ%2B475n%2B&X-Amz-Signature=447c3ba003c74da419ad7a71b03feace32e2f48ef74a5ab31e9771369601357a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W25WL36G%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEew0gUn%2F%2BuUXvc1GaTt%2F%2BX9FuvV2UJ%2FNgXV8FNMrx3PAiA0XdWokoSgfSqp%2FWn31yhgP0QfzUyKYIYEHQTDyvdvRyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMzrfXNkOFwtl8y6mdKtwD1gIe9NMu%2BCP2lzwMGtIm%2Fr48pe98Z4dRolWI02Yrj99wMFRmM1wYlv8D05V8V%2B7uUdcBQTD%2FYHno4ZfnZte2JWKj7QvDJBiU31TisUuOc4M%2F6QIQ53rokNwb06UMcYAsUXfMv4UJD%2F4HGe30vGjDHshLnD5zvpejNK9Vhx2%2Fi9D206Lqp86%2BKEnxlZrwFUosx4Gksn%2FGM5tbeHGLYw4UCO70%2BIj%2BqbZDiKj3yDCqY5ozRRoxthAW5c3o0ZeFnwS57wfS8MRnzWMGMuZO9No23WJdVIkmo7FLUstAP6t%2Fa%2FPOZ%2ByvUsvwJA69%2Bw2DsR366s90MW34zOixXK39nXCjx9SJdlBVmBJp6RAR481zA1pGEf9IasSTUpcDDXY%2FafZb7p8%2BIfbMyCl86cxCfK4VloGwuDmhPGIo1uQWQr5ijbulRUfg2JKZwrg7iR83o1ICk6YWRFdc21P26TyC8AWYBnOnZsK3H8UFhCSJHgJk60HS3RmzXauf3Uq6Elf7QpSg50qvKyUbvZWd%2Fs2jJ8maJHPyEhy0gtMQmU1jaDWVvsmYN0m7%2FRwqTE5zvgjYMWyqMfgfk1w1IWONHkj44PwyFT%2B9T%2B4kMyUV8poXse0%2FFpBwFpXId%2BpcEi574%2Fgwl%2F%2BbzgY6pgFO%2F%2BZtpWHTNBpf%2FU408BWNWJ04va2tNa6tQZ2hL%2FtOGpLh2ZHt%2BrqjTPqHEug6nr4FFVNwm2knMtUESbvy4ja%2F9AaF9PhpCbkM%2FgXjNv4zYoilgG2ltB8vCiXtcWFrjm0xd1q8ijaKAWco9YOZA7Lorb6BWZHjuDzx4kxg0n65P1Bv%2BVxBAVTX7h%2F5GjN5%2FZqQm8bSQ6A0OWX8%2F2gpb%2Fg4zJ%2B475n%2B&X-Amz-Signature=447c3ba003c74da419ad7a71b03feace32e2f48ef74a5ab31e9771369601357a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TCROZRGH%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQDryKU2gUbEJjst16LeOG7c12pTtCQL05pC1IbVCYIY2AIgca2awQCFh5rFAmLxyuayeZcFm71PFjt29Nb9TA%2B1rxUqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDI2RaZ6NK%2FtvRQBOkyrcAztJ%2FP4ta3PVGUmeQOZESxp0XMu0syFpBK1XI%2BJzCxnSMlzKSC7GIP1edq%2FXEZNhalx7JEJnESbxIP5NqKkqoBZ%2F1qFUfdhNEprayg%2BdXCW2Y7JcUQcM9%2FCpDGtXCjXcV5aFlS4P2j9iPp8XMeGgwpkjkZ4UrrHI3BYCugMNS%2B5VanwTb5SFIjBXsZCMLmHogqdknMdUqfNHnbuqfnxYC8cQt46OKT9aFbnkLJRGiKgk4LUaTpH9BV67hijlC%2F8Ty%2FjgWcNI2L7PV8I8FKN9%2FxpIEjjv5Sp4pKl8%2FmoxsLO9diGZPxL5fMPUZIjQFyz6U8I80tk0xk0CktCPkt4%2FpctHH5y6xjyr60iasTT5kJyZC2piCb93qgt4U76HgqAIP74%2BXmddtL%2FIl3ENHFtouHkVPh8NPn9kQeXNFEOKWqYXB%2BSkNYg7FmLwMl9mAYRhxOh%2Fv87X2RTh%2FDqHfH2EkGp6OFUhwlZ5JzdNF%2F3Rl0rFRyStd0ffEIYsbR0aE5Mc7KP7w9NRhQ%2BH3bN0RqF709dz68n4oI7cv%2FK%2BsruLKfiu2q3N2duzWpsmWdPnPckSK2yRG0Ye5X3zdrhSqlLv5V4AIxbldJxL4uqZ2o6oC2Jmjb9yfd2j8lzbY2hOMJ6AnM4GOqUByFPESoEy%2Fprjxg40RJNce%2FO0yRrm5rHy5e4j1DkphtoU7jdLrhbCtAPQEtvvrJorcv2CT7%2BkeQgKDsHHskKg4HCPYnhNwRXZQHgz4JKFiDFnvuaQcFgg1FkVW0EhwA9MiDu9FG5mGo4RvD56t4eeGwMdeGr%2FRKGEaIoJELs93w0BKfkvPRdR2V8uIy0irotebmOwSwgdqgn%2FEEfWZ8eGAfYmW5Cb&X-Amz-Signature=9ce04864326fee7d59faeeb8b53f4023030f75f9a7ed4798c39affee313c9c23&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DT2FT5C%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIB5lEa12gowMLO8k9%2B6MLERDTIh7dvEoOeBN93Qj1%2B8GAiEA%2FXmMcUZKarququArDg6Txnh3t%2FeeN5%2BVHccNOFsAxQMqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOnfYKKXg3miyFMecircAyjS4I7pv4%2F3%2F4hgJOVgHChiioONG74pk0pYRR7NnsDR2E1B%2Fus3AMy0gzfTPP%2FMZ6ox9imbcQPALkCjs2vt%2BX70qGizPakDyuIz41zI0Ai%2FY1sbH3xjcnm2XABfeC%2FboGY2VnWaRVfMbLQ4gmQ8Amz%2Bl39LGdKIMIhxu3FPP3rJ3K3Sa%2FLSQgCXOCLuV4Fqk5ol5gjkVQ9tBXMr39Ofk7lgLjnvAKnObygakNVh4ix8n393jfcF34qBsoS4Yr318ppCaX7xDDG2LFtFIk6p4ciy8S%2BCVOa5Tn7UuDhINcxiVd%2BAUsti7OfW52RElKwW5YUxT5ovoOl%2Bd6KygHXFg0UrvGgpbwSNYkfDQaa%2FLuETsf%2FX0wPtmKe9aIMUVf6Tsstn7TXKiTI699eU0PWpes3LdG6efFq%2FFZ4ncP9e5dCUsq%2BRd9JkJAM2Rh3csZ9SyUTs2lPWO3ZezFbSyGI5t2LXuFb6EpjLtt2zZeljnnRTG7w%2Fdzn68Zr3l3FaDfc4o5BF0r1lm2l9E2XjvgCem3dVhOjsKJZskLElfm2lnunSCb0Q9%2FwgOECAZRl5%2FHzmbz2JuHSY7CrN8SkiXQH3EVO%2BHIYqWwCSksFrmhv7ztfjZ%2FV25IsTEODW0Xl8MJ2AnM4GOqUBH0TUsfoU8zgtt3LEn1dmvNuGJTWJLM%2FLUn2jCV4e2pB4G0Q02rVrmKuOHNsWupR5XRKv4c6pLxo1wGrakD8ey48mpd1Tx%2F2wwUNjSSTdaE3Lq6xfxnjMWJCeBb3FPsvGIG4fK%2FKRc%2FKg%2BnxiYVhRPExjWE6GXWb8e6oSEe5R5VBT2DfJd8s8y7hyk%2Bzv3XKKiwQdAIHBV2bZxKWIB%2FAn8It%2Bmynx&X-Amz-Signature=ec521772fcd6ac919f764607c8bcc619098eade581468928079a2394f6ae0970&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666DT2FT5C%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIB5lEa12gowMLO8k9%2B6MLERDTIh7dvEoOeBN93Qj1%2B8GAiEA%2FXmMcUZKarququArDg6Txnh3t%2FeeN5%2BVHccNOFsAxQMqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDOnfYKKXg3miyFMecircAyjS4I7pv4%2F3%2F4hgJOVgHChiioONG74pk0pYRR7NnsDR2E1B%2Fus3AMy0gzfTPP%2FMZ6ox9imbcQPALkCjs2vt%2BX70qGizPakDyuIz41zI0Ai%2FY1sbH3xjcnm2XABfeC%2FboGY2VnWaRVfMbLQ4gmQ8Amz%2Bl39LGdKIMIhxu3FPP3rJ3K3Sa%2FLSQgCXOCLuV4Fqk5ol5gjkVQ9tBXMr39Ofk7lgLjnvAKnObygakNVh4ix8n393jfcF34qBsoS4Yr318ppCaX7xDDG2LFtFIk6p4ciy8S%2BCVOa5Tn7UuDhINcxiVd%2BAUsti7OfW52RElKwW5YUxT5ovoOl%2Bd6KygHXFg0UrvGgpbwSNYkfDQaa%2FLuETsf%2FX0wPtmKe9aIMUVf6Tsstn7TXKiTI699eU0PWpes3LdG6efFq%2FFZ4ncP9e5dCUsq%2BRd9JkJAM2Rh3csZ9SyUTs2lPWO3ZezFbSyGI5t2LXuFb6EpjLtt2zZeljnnRTG7w%2Fdzn68Zr3l3FaDfc4o5BF0r1lm2l9E2XjvgCem3dVhOjsKJZskLElfm2lnunSCb0Q9%2FwgOECAZRl5%2FHzmbz2JuHSY7CrN8SkiXQH3EVO%2BHIYqWwCSksFrmhv7ztfjZ%2FV25IsTEODW0Xl8MJ2AnM4GOqUBH0TUsfoU8zgtt3LEn1dmvNuGJTWJLM%2FLUn2jCV4e2pB4G0Q02rVrmKuOHNsWupR5XRKv4c6pLxo1wGrakD8ey48mpd1Tx%2F2wwUNjSSTdaE3Lq6xfxnjMWJCeBb3FPsvGIG4fK%2FKRc%2FKg%2BnxiYVhRPExjWE6GXWb8e6oSEe5R5VBT2DfJd8s8y7hyk%2Bzv3XKKiwQdAIHBV2bZxKWIB%2FAn8It%2Bmynx&X-Amz-Signature=21ff3e987fc21b4d587605c3a30d8a1edb1321b766a8cd9384f9729c7747cf83&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663KKRPETI%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJIMEYCIQDvWpihgtz4dXX7anbKKBGOj28MAKJucuWcwgQ0FneoNwIhAMUfKGEYM2w6DV8IxPrnQoOWCIM6pIfhniRxgX2vYwVhKogECOf%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igx8ENV5vcvZc0fxdGEq3ANiTHTR5KE1ueEGt5yGNvrEdVxtYoL4ddxgpdWN70k7ggsYS3yP7wFGNOzmMbtzzuKQz3reKgbXN49DfNROOaO0A9I8ZB3uF2JqZ3aRzZ6ry4Z1sCleabDwhUVBnB7aJlI%2BNUZmw343QvTr5SR21EELptnkAMiC0o5pMB4aD8KoEsxTYCZ29BrQHE6aTgEiyxeKZIfogSnihnvT8m%2FrgSMBwHHcvmIk95L8kX6X8GT3GyTL3wJDOAws7ej9%2BioM7Bd6SBqUr5n%2FCkH%2BIC%2BLmTdD6KOxs8hKK2MjXd2I3ZxfP8ot61%2Bzs3aQHqwcwIxVJysAP3QFmhSAEQdpSqpEj7jWhRHzsAjqDmXJeya%2BopNUxuPkJhvqim9HIXGexW2KPfAg9rApcZs5tqYxoRDoTzVxFdVVU7jCmV4MFy1pTIklwdCRxXl5Y5Rtya35WwT2Vj9TjAwSljCK5HKytiC312JbRc35Xru2LErwi33Q3lUzEiRhUJJcrJ31pBIjXOxzx%2FgIf9MU6jrXMq7OEvauofEwWaNvoU63RNbgNiNPGVksXIx2wsDEMb4q7Gs5%2BtWjqzj3Doo2W9WXzT9PIL73TeHA2gWnSnV7jT%2BiQilycSeVVVbTtI3N15nzhiY%2BEDDZ%2F5vOBjqkAX4p8l4RXErwzUgJabZ5LcGhbkMShjFQo5T4fqkmyHJ43KTwJ7So9HLDs13cVbLYUTEZ4a6QbwyU7pYbxHifUyVm3WC8X4gcxCb8pH5kFR9RVrEsYoMHpP%2FvWEiP7HBiYwDVXn8udsC%2FZ0A6NaBKelX6HsUzOtr%2B7fuKU9ax8D3DD7gl9U7J2yj6kukSM59VgTR8Ar4Kxs0dahLvah%2FxUNK%2FKpqJ&X-Amz-Signature=9a09a692a991e9e0fa6809a3c1d858c28cd1fae67db0312a28782e849012d498&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBV4HR7K%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232011Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCICZ2DKHGGOUC7uPN2gJw08B7FuiiFmvhfrlW%2BVqt1IZuAiEAhHe8TYD64pDNGaFrpzQGB53prlBsnk8WVzQpXyullv4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDM8U7DXcGDTo3asswircA0pwqRhCtNbYuLpvYFTnDVnzKb9RrFglyLIkkk8lTOrSyoW2laXidHENSry47mg3F8yHi5GWgEJEbjTP1D7RQedaLKHu2qequUM73jZlPEmFM4aTWJRhrKftuy%2BiV%2FbAZ%2BM63R7zDvLy1WFsoMkoir3VM90A4S8p8rlY9exnOdYQb1nNt2BaO6Xd79Ve%2FGNj4i1pMy0AQyBpJnO3ijox9fibgxLD5bfx8ixk3NU%2Ffx0fzWTZ6adDMnrizOH9kI4%2BuxbT%2F3xiaa%2FKN3D5ydxskOPvdkAKmIAFBu%2FCt9DfTB8TH7n%2FCjDoOLbSsErhvw%2B5K1Eh0oRdQLSFodWSWJtbxlSAENPNXinyZ%2B5chod1q3lDbR5R9m%2BAbLKUpLZUxWaZSrueSL9hKDFssS3rOEmausxkXI9MKnWI2rMLB%2FM0gJftf5c1n0G9pLEP%2B%2Fk3rswFL7%2FLPLsXPwq6UB7tyaEJ98Zu7zKQTdgM4whHmaRC1R%2B0dRa%2BUdznuMpvC3SXZoq8uyp7me3RTJ8CzTDv1skEwwiYfwvEVWfhkTWYIhzO92qcwt4w4y1b2OKXA3Es1jEw3ypEq24KDoYCINW99%2BB6UGykhOvbVNvyMAFvKAjTuVofsisvr1ETHp0u2kTWMPaAnM4GOqUB%2FCPOw0IHZSu32vK8VZsLIE2k1%2F2oEfFAyDT%2BF2rlQCzWrszWia8zdqvlkj1SN47gvc%2FYMJRCJvUBMjL5lHAgoCzLV%2FRDmhQrpBxf9BvDhpR6qPx0lt3wSJqU1aWc8tBzi%2FcXrVkkt5ne%2FRDM2Jvq2aq%2FISZbHuBuq9wCS%2FLn0PGlZJj8YVzPPQaUdOdi5u23OhgC1yEromGjIvVkY5OMaLS0ORpE&X-Amz-Signature=445552ec8301249118877bbe2666e05be26778992742778fa284b93fa30eaf41&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662URQXQHV%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232013Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIBx3wX9rT1U%2BK7sFccXFoVWw5oLVzrkhcWI4lRSspcnpAiEApRuz4zxfd6K1EqPW6eI7Mj7s7MthK7HLqnNojVYz7qkqiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBJXr3iPWvcTioIC4CrcA6I3s0Ncmu3NUb1MDFDQ3qqR8keIzFov%2Fj5Urg6y2ioy%2BUX%2BCdFdpjzMJsqTLmJMpP0E5ohpnTs5EDnDEr64zfvM54gqf2TgwGoJHHeW4UJZoMJO0mKaKPYexWS%2BBL2yXdDOxAxl%2BOEn%2FijQoDKo1mbHzfQqBITK1NSVpqLkfEbp4LMN8CZYewcBSspHs%2BTf5qMx6hz8VqHkUrrC%2Fjj6TDNdmedaN2vmW65TUNRHlsQgf4fzwMFgqAAJrmzQ0Ao0Y%2BpXGXa6VJ9PonukV62r2Lqo8OXeczNlrYf8JhOW9vw38krbi%2BOot%2FzWSJomiEHtyXPmZdj%2B2ww1o%2FepTPdxg2BvzPio4N2gQH%2B8fmycKsVN3Win1Vg23uSmKyyvmqy7ZNqV%2FfUQdE4BKNEJlDRz4wtXxFuW0K%2Fo7jyfriNvrY8bbYV3X3WnV5hDGOkFJUAMEpIpm7ofj54Qv03TR0L5GzG5OMEptaOmS9COVHBzxb%2BOAAh3wkF2%2FQUgoQBDJ%2Fs3xniq1FnzDbHi%2BvlAhR167kaG23LOkN46Eb7hZFtrGeSA5RDeVUAg%2F6DvBoSvT1mXYd3mJ%2BYl0v89raLZ7ms63E5EHnrWRCOkUBso2E%2FvYf21O%2FClJw1KZjX2j%2FODMPj%2Bm84GOqUBmo23a59mCZOri1HUDHMSZCpeDfVALCgyWhsO8eoNVlfpqaBjYzZfsj6SODfh7SmZ5CDU1DK1ZoiPuR5zAeLIJYP4z8ZpCOjVf4ZKX3bQN7HXoBlElIL%2BIAgm9rNurkEBDWasDhjwIKQeX93W17ujzwqepkGUIWi2FNIhlBydTNtbKLq1%2FPP3T7Ed4JVbO%2B%2BZt6NU%2BlbxV%2B2%2B61f8mKs6KvxQSkkf&X-Amz-Signature=1fce0cdb96cbc5bc84b0aa464474ec73d879a1a4e868d9e4836b542c8b3d06bf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SPO2L5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQC9kd8X%2BS7D29VNTVA0rggWf6LiHs9xhKvVKrRAGg4AmgIgBHsWIM12qwLLwZPztMRIT6g2o%2FhccR1bKqUSl7lvMO4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBnIh3OeLU%2F8Xb7VACrcA7yrd1t%2FD0wUTvmix5OBWPPXJGMgt59pdqWM6rxUzX4IAOmETNtRJ%2B2ebuSAEhOgkD00XP7owrRvvYRb4crgThYsTM7eA5WDtkrvEqL1OwcfTwAGaskzvloaWSb8ly2WGrYmEgK62BGrkgBysz7%2F7TclRrp%2BPtbD5ITmwxfhNPJKjr%2Bfm0Lfe4igrrNtaTUPJVVLUwx%2FjqFJUcBXCyEXG7EbK5VpGwTQPdQtrTtBTicVyhScliqVeWphcrAw0%2FIgxWW3YxsXCP6LYztljRad1IA6t8OvaxXQHSOh2DjjgQI%2FbzNeNMKwDEkiVbmWGJNcZ%2BQCdkU7WqKuPwKFpQ5RSV8KDnBZrByW8XBlkO%2Bn3CH%2BGuIoyCOCh%2BNIcfYOWyaxI%2F30SfVmsehOYhHH52snuy80TMV7r7mVyBfNvdt9jHcMT68JHMg4g3wq%2Fbj%2BeWi7LZSOIKQn2BpSEpXZMYPPuWL3fJHTgpRuvXWTJGlZ1m%2BhxYdxyRqzhYTDc3yM5JQAzVgx9qJU1V%2F1JPSSTB4HbmjoCRG5c%2Bsu%2FpbXRHxUEkmFfk4Yiz2Bx1%2BQI5Bf4Gag%2F%2FbeGaTylhFWIIuSWVqigoxNI5%2FziTt1hD8wjN0YAc%2FxFZ1JStX7LjHitazYMJ3%2Fm84GOqUBGqgXd510nzLfeFWBx0fyrgOaOzYqg0qvpR6%2FSkrvlEb8pqUh2WV5G29zsRMsCjPPqjXVGCoL1admSwBS12fWMY%2BWZLwNxtMJqrRDJxrOzYj06%2F55gJc1EALdL8nGnfKji%2F%2Bk2iKd%2B2VLB8RJ8rwyPfIvpqsWFKMpd4fgnFp7JEVKbXoR3hg0bCHJds7PDf3fhIL8GSuMQeiJbVtRWf671yiaEcl2&X-Amz-Signature=38b74b3e697966aba00a257b92ad046af20f5d968640f633acd1ec502ac74b4c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SPO2L5%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232016Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJHMEUCIQC9kd8X%2BS7D29VNTVA0rggWf6LiHs9xhKvVKrRAGg4AmgIgBHsWIM12qwLLwZPztMRIT6g2o%2FhccR1bKqUSl7lvMO4qiAQI5%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDBnIh3OeLU%2F8Xb7VACrcA7yrd1t%2FD0wUTvmix5OBWPPXJGMgt59pdqWM6rxUzX4IAOmETNtRJ%2B2ebuSAEhOgkD00XP7owrRvvYRb4crgThYsTM7eA5WDtkrvEqL1OwcfTwAGaskzvloaWSb8ly2WGrYmEgK62BGrkgBysz7%2F7TclRrp%2BPtbD5ITmwxfhNPJKjr%2Bfm0Lfe4igrrNtaTUPJVVLUwx%2FjqFJUcBXCyEXG7EbK5VpGwTQPdQtrTtBTicVyhScliqVeWphcrAw0%2FIgxWW3YxsXCP6LYztljRad1IA6t8OvaxXQHSOh2DjjgQI%2FbzNeNMKwDEkiVbmWGJNcZ%2BQCdkU7WqKuPwKFpQ5RSV8KDnBZrByW8XBlkO%2Bn3CH%2BGuIoyCOCh%2BNIcfYOWyaxI%2F30SfVmsehOYhHH52snuy80TMV7r7mVyBfNvdt9jHcMT68JHMg4g3wq%2Fbj%2BeWi7LZSOIKQn2BpSEpXZMYPPuWL3fJHTgpRuvXWTJGlZ1m%2BhxYdxyRqzhYTDc3yM5JQAzVgx9qJU1V%2F1JPSSTB4HbmjoCRG5c%2Bsu%2FpbXRHxUEkmFfk4Yiz2Bx1%2BQI5Bf4Gag%2F%2FbeGaTylhFWIIuSWVqigoxNI5%2FziTt1hD8wjN0YAc%2FxFZ1JStX7LjHitazYMJ3%2Fm84GOqUBGqgXd510nzLfeFWBx0fyrgOaOzYqg0qvpR6%2FSkrvlEb8pqUh2WV5G29zsRMsCjPPqjXVGCoL1admSwBS12fWMY%2BWZLwNxtMJqrRDJxrOzYj06%2F55gJc1EALdL8nGnfKji%2F%2Bk2iKd%2B2VLB8RJ8rwyPfIvpqsWFKMpd4fgnFp7JEVKbXoR3hg0bCHJds7PDf3fhIL8GSuMQeiJbVtRWf671yiaEcl2&X-Amz-Signature=4c4c6eb89505f01f280fe175e678c2bc0c3c25c559a2b1c2e67e322a9e8d6514&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667RDOCE4A%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232001Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIBN9L5%2Bg1L3B%2BeiAuefDAM1FO6BlkH6%2FG79on2xwwAkbAiBWMekoYvp2LmlTyrggAKATuEt34r3O72IyIxmiqM46kiqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMqHr77EkXTyJhEMayKtwDtLRiGCHlJT%2FxfYAr6MbqEvivmPdrRUDBrJ5ezOdyZAejkGqvWdDGNB8YKjKcy9nTacE6OfcT2n0I8NEUtZkHuh6YqKwQ2Y9%2BnXAZyp2QgkjNHEWX93hRCt4tsy7Ua8pihjmd17ECVNCohBHDhMgYWhER0%2BgItPwB9s0xTF8%2BPFSkYdh6zTC2MFUX9G3kStZ4RqtiuIuCI8PPNq86%2BHqpjmAnE%2FKBW5X7%2FkHYsE4y2tDkl14Y6eNNQ3Cj4EUzXtbIYYuqZIErd5iD1umBzAXirZ25NPRlXdJVMX%2F1Hzn8XlIIL8cLvKiGA0MQ7ZR8LojGc27yTBb0t71%2F%2Fc7k1nreYplxkOZ0wyxwFelhpWJPzWRRL7OBxG6Q0kASVHPrkCDqNQBMm3I0t6s8oweswk%2BzB3MQcAkUE60v17g%2B%2BLmyfN%2BoE7IS6vplAefTtruwqR69N9ItvT%2F9QxHsSsdOILxm%2F2WqdGg8NVhNtT3t%2B7rXdYbxjPtEsiOLKHCfgZy6SCG%2BnUWv%2FPZEHcRLqrxm4J7R3bSfeovrNy1cttDjBGZQyAB2kOMdfSNlor7tpuIHdWznFA3X%2Bq2vJjGGGQkHlQ5m1Wmbbczjs2LfQrL0rAjUaJDA6NtZkMz7Q99MGUkw0%2F%2BbzgY6pgFm34aSApE58Awhrb9lYsjuCVlf9NMiJlPJQ6mKYLEJzjrzeeMS0wbzjbGN9thB%2Bkdtp8My9gdjk88RSdQOAlnHb1DccUb4FlZ9m2%2FJnrBp6czF3g57YnQhikHoC0jqu4TGcfVLgN31hXhip5vUGvXVdFxH7ax8cQhUpIrISpSIkEJ2lrdqcH5FSjX04jisxe15HsHsp6hbpGaiWQiAMYJ3CfoB%2FDoj&X-Amz-Signature=5f51a23109339ec6803d9903a7478c2ac6eb1ebc0fad72ec13723b3ed8e247f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DSYZLAD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIGDWEjXjCftiMRKb2vOgsf2Bvy1TYpBdvtB2umeJfr0wAiA0mQHkAQllYb9DVMAUlYkNMMvS5f3pafFY%2B4RBW8LzqyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Fq2tcNOZ02gXqfKoKtwDXe%2BsyKiWX7s1axF2Cj%2FqUEZXZE%2BWEhZLHWpdn5ipaxvSD%2FagaHtujYX%2Fys4oMvNwvxWXhrzBNS2CHOvBqq%2BiKp1irVzHu6pcrxnVeVUNJR%2FocbyURKRURpGuSPw6moHXr9%2FWwWaX10M%2BlRrGNhUPeqJ7WBjLrhmrcr11FV5qb4nr%2FD5XVgWycQ75sfE%2FkHjlIUXWUuEE3pm01UkrO5i6TsSiW%2BCm6ok7qVjBlfKBrvEk9eN2arEi06vHpc2T%2Fnv7pi6ROiQPe9g9V4zCjhnFpJReTe3%2Fe0XG1L0d6VEOnxeVenxPNdwOxYA5QkQ7up4Fp8j4%2FJTyPT7hJ6V8KqVU3EyAXcCRqWpB%2FHijjIPyotiXOswWVLJtObNwcKrMnxfkNkHp60Dybo9Cp9Ch8QSXXR%2FJ5pXj6fxZ7xf47lM2TNeKuEuG6BXjV%2B7FYIdn%2FNNoNakp8cz%2FQhQVnJv9gr%2F7YOMhTBME4GvY0ZrkuzAaGdub4XECbOy8ULKkpMG0T%2BV2NmhW%2BDwemGeakpsvWUCsjqKWtq8TYbZE8Z750h2Ya0Z%2BwyxHp8tcE3hxRj%2B6Yzq4aVZcbuYCVpdf34ADFSnPjRZ8CbLZw0Z2vP77STGZ%2B1FySzq1SYnnl8HMc%2FMwqP%2BbzgY6pgF0Tx92IhSEWN3WKxRIawuH2djgDHru4OeYEn0t%2B3rQvUAsLdurcdjfELnr59N92Q5V3J1J4B3o7CxS8kb5ztp5BQGl6gKI4aWYyZt7vRaJdvZGodCHgFXGT7ZayM9Ilf%2FiYf%2BVCj%2B7ovKTLPRjyyZk2A3WICjbmQ%2BfFDW6zc2hmNIJ8vryJTaNCCg0g%2BW3ojUff9Maxh%2BfX1SySLqGplmg%2BcSGFOd%2F&X-Amz-Signature=6df66c897ba13d0624fc391fb78e8558c8de671f668190e4db24be67dac77a54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664DSYZLAD%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIGDWEjXjCftiMRKb2vOgsf2Bvy1TYpBdvtB2umeJfr0wAiA0mQHkAQllYb9DVMAUlYkNMMvS5f3pafFY%2B4RBW8LzqyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Fq2tcNOZ02gXqfKoKtwDXe%2BsyKiWX7s1axF2Cj%2FqUEZXZE%2BWEhZLHWpdn5ipaxvSD%2FagaHtujYX%2Fys4oMvNwvxWXhrzBNS2CHOvBqq%2BiKp1irVzHu6pcrxnVeVUNJR%2FocbyURKRURpGuSPw6moHXr9%2FWwWaX10M%2BlRrGNhUPeqJ7WBjLrhmrcr11FV5qb4nr%2FD5XVgWycQ75sfE%2FkHjlIUXWUuEE3pm01UkrO5i6TsSiW%2BCm6ok7qVjBlfKBrvEk9eN2arEi06vHpc2T%2Fnv7pi6ROiQPe9g9V4zCjhnFpJReTe3%2Fe0XG1L0d6VEOnxeVenxPNdwOxYA5QkQ7up4Fp8j4%2FJTyPT7hJ6V8KqVU3EyAXcCRqWpB%2FHijjIPyotiXOswWVLJtObNwcKrMnxfkNkHp60Dybo9Cp9Ch8QSXXR%2FJ5pXj6fxZ7xf47lM2TNeKuEuG6BXjV%2B7FYIdn%2FNNoNakp8cz%2FQhQVnJv9gr%2F7YOMhTBME4GvY0ZrkuzAaGdub4XECbOy8ULKkpMG0T%2BV2NmhW%2BDwemGeakpsvWUCsjqKWtq8TYbZE8Z750h2Ya0Z%2BwyxHp8tcE3hxRj%2B6Yzq4aVZcbuYCVpdf34ADFSnPjRZ8CbLZw0Z2vP77STGZ%2B1FySzq1SYnnl8HMc%2FMwqP%2BbzgY6pgF0Tx92IhSEWN3WKxRIawuH2djgDHru4OeYEn0t%2B3rQvUAsLdurcdjfELnr59N92Q5V3J1J4B3o7CxS8kb5ztp5BQGl6gKI4aWYyZt7vRaJdvZGodCHgFXGT7ZayM9Ilf%2FiYf%2BVCj%2B7ovKTLPRjyyZk2A3WICjbmQ%2BfFDW6zc2hmNIJ8vryJTaNCCg0g%2BW3ojUff9Maxh%2BfX1SySLqGplmg%2BcSGFOd%2F&X-Amz-Signature=6df66c897ba13d0624fc391fb78e8558c8de671f668190e4db24be67dac77a54&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGVHYYOS%2F20260327%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260327T232018Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEB4aCXVzLXdlc3QtMiJGMEQCIEA7Ck4E4oEAnubByP6xRTsQlrwrz9Ke6JIu1ZAzmA4lAiAKmMFq3LAQvaoRovFKsZtlXfPqnbE2BDJ4lbpONX%2BipyqIBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMaQwAAmSTDA%2BJqOPHKtwDaW9Kgf9VJDVmu305zwZj47VMCkt313YZQ5lgiJFzjhZeI5otrvOfLkmfVMQGz12FTXHp%2Bv5E4g2vQJVdXC0GIQKE5zXvVe1OVn%2BlinGMpa7onFACX5Zfic8Ds6eMHriHoAMzTO46qh57bBANeJdkGeEGrFNUfuK9NYbJU7bnBMAPL1sy6LP0zKB1DiwqfRxpoIdJ62XWxa3BnhG2ed%2FAGRz%2FmarYmmBHE9BnhFt%2B7E9l6kV1u2FnLULTmTUZ1DX7AdYNk0pfDnErg9hD7aKQL%2FH%2Fv0N%2F8MK8DZ6mEZwrtINW5STTgerSxIv%2FHdA%2Bx8Rm9pRV1iwsSaceTF5lavL5IJ3hmf9etYovYFkihfvG2BXfLMBS%2Fvq5hNPGfR%2FC%2B%2FJgS1HvN00Dq%2FkzqQt5e%2Fwio%2BpPDgOa8XfJiWhjTcyU9UwLwRQiUDqOcDrI7yM959ytVSnbbbp4K7BYc1zWnhu025FllEOxF4r6u8gVXVBw4iO4pK3k%2Fub7JiBL0mJvOh7U4g5eCu%2FcsGc3zFrCwfS%2BsEuqdyij0LeYmOp5f%2Bu4PX%2FmIMtwEscBYH9vcF3eY%2FvyMsBCyIH5LWyCITLadtjz3EAgLgZJZBuNghR7AuX3mj%2Fa3ofJGQMECfX8NNMw7f%2BbzgY6pgEapSFUxjYISUiwcTYG3f97QlMOHUITafMfSjKTBF35s%2FGJ6%2FgC9gc5rXZJ0ORU3%2B52XUZ4JqLW7WRa2egeSFcMNNUJrm9xyLQPFDad%2BAm6KnumN08K%2FeBuP0pkcSI4VZ%2FExweqAzjtH%2BNLR1qRG8Rx0OC1qCdzyLUZyBz2IHFSe7KT82HMIZOJuVvhNvIcBbfpPIPgsFiQbLyP96qpfPwMl2rReNJc&X-Amz-Signature=f0037f01f612680f03d56f393439917b562ec3a1a5641766e5db252d77574640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

