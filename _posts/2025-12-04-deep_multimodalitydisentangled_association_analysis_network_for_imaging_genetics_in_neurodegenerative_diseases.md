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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5DPG276%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIBAQTkXNBvFWDFOTl%2BgDEKIDP81xFqqtpO4ZZgdnOvbrAiEA1f0IIl9TX8LR5k5P2cziaL1eeMXmT9CjfT3dDhN6%2BcAq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDEmXTQBOYSIOiYGmRCrcA5P2M0WHMOzPeXTzONb%2FHyMgdhcVDpv4GZK0NVl2r8E9ClnzDDUeGmlSr%2B6yaG0R4Bq8OLkpVUNIHsGz%2F%2FH6xkX2g9ApObY%2F8eS%2F2COQCcqWKSuDnMHkUbTzhq4jhHXveJeeSIYLs89xv1MTGV%2BK0lsf%2BxeiBQ8VM5H2sOUwa92GF9WAHrEhHABXPD8xfp5%2BmvbJN1jxBoYX7RmxvsVrTYL1fq%2FvbeLxT%2FCQBqwNex15e2BqzE4E88BVjdBybhDuQZE6gJCroxTknWZerB52T0M98SR5MQtymjXhxq86CRzvx7Hd3wbX7bulRxXIftLf3p2oQ2IzByShqa4TOpFeFcUWxZvDouEsIt8GZ0oWJEXPwY8yhjrXpXub5%2FNSyjH28SVVkPWR63yJzi1W2moqZTH9UjykQ827ruwKRClpKQFXQCd5EAWWt4ac3wZRc6Q3IrxXmDWB8oiAB5yBIlSGecrmmOASP6L%2FfykhT61CRkPR22fXpYRwruT3X5HjJMLJCjwJwV7L8SI%2Fg4XEIVFnq5L6%2F499w3Tfmn1Pn7340eET689mQoEmqFY%2BhpOpA21N3QPWR8mIHzbHrHffni%2FNgcH0%2F7syzCMJuxDKn1pLrBrEfdPiCKUVXQ3JBgKeMI%2F6h80GOqUBDP8qmk7oZyj0VtQp9bLHcBah3o6kFDuns3JSkOcCeao8PSLpgFwnqnFx8yJop0xjrmG%2Fq%2FididDVr9%2FnVq64cmFwMNTQPn%2BYkcuYn9L6Ccp%2BsnKRqAE7ktB9GTeNEkGpp%2FGimiGS3gQLVTCxae%2B2yhdXSPl9ddu2DBEbiRXGYRNu3LotlJaZ7dvMQcyj2IV2otz%2BRx9uJL%2B10zvjx7SagSNeDcPb&X-Amz-Signature=b7e7d9a3309755a7c2ac82057bfad7587cb0df9ddc233bc7e51a94dca8e37a60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466T5DPG276%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIBAQTkXNBvFWDFOTl%2BgDEKIDP81xFqqtpO4ZZgdnOvbrAiEA1f0IIl9TX8LR5k5P2cziaL1eeMXmT9CjfT3dDhN6%2BcAq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDEmXTQBOYSIOiYGmRCrcA5P2M0WHMOzPeXTzONb%2FHyMgdhcVDpv4GZK0NVl2r8E9ClnzDDUeGmlSr%2B6yaG0R4Bq8OLkpVUNIHsGz%2F%2FH6xkX2g9ApObY%2F8eS%2F2COQCcqWKSuDnMHkUbTzhq4jhHXveJeeSIYLs89xv1MTGV%2BK0lsf%2BxeiBQ8VM5H2sOUwa92GF9WAHrEhHABXPD8xfp5%2BmvbJN1jxBoYX7RmxvsVrTYL1fq%2FvbeLxT%2FCQBqwNex15e2BqzE4E88BVjdBybhDuQZE6gJCroxTknWZerB52T0M98SR5MQtymjXhxq86CRzvx7Hd3wbX7bulRxXIftLf3p2oQ2IzByShqa4TOpFeFcUWxZvDouEsIt8GZ0oWJEXPwY8yhjrXpXub5%2FNSyjH28SVVkPWR63yJzi1W2moqZTH9UjykQ827ruwKRClpKQFXQCd5EAWWt4ac3wZRc6Q3IrxXmDWB8oiAB5yBIlSGecrmmOASP6L%2FfykhT61CRkPR22fXpYRwruT3X5HjJMLJCjwJwV7L8SI%2Fg4XEIVFnq5L6%2F499w3Tfmn1Pn7340eET689mQoEmqFY%2BhpOpA21N3QPWR8mIHzbHrHffni%2FNgcH0%2F7syzCMJuxDKn1pLrBrEfdPiCKUVXQ3JBgKeMI%2F6h80GOqUBDP8qmk7oZyj0VtQp9bLHcBah3o6kFDuns3JSkOcCeao8PSLpgFwnqnFx8yJop0xjrmG%2Fq%2FididDVr9%2FnVq64cmFwMNTQPn%2BYkcuYn9L6Ccp%2BsnKRqAE7ktB9GTeNEkGpp%2FGimiGS3gQLVTCxae%2B2yhdXSPl9ddu2DBEbiRXGYRNu3LotlJaZ7dvMQcyj2IV2otz%2BRx9uJL%2B10zvjx7SagSNeDcPb&X-Amz-Signature=b7e7d9a3309755a7c2ac82057bfad7587cb0df9ddc233bc7e51a94dca8e37a60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665BPMYN7M%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221053Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCXtAG13%2FiL0FE2Xi3UdoQbuiMfUK5AO1gBjsQ7S8oqMQIgVwpQumG22ZXmgocVsthR4UmQtMQpfEgjioZCvRIO%2FxIq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDEQoFDgNaUmEXgekqyrcA49M0GTkiYPSgWEICrrI88ANWBsJ1hUgdrJpgzwKZ%2FexjAX9ORYZwzeg1AvufZPqGl2SCkj64uNVZB%2FtBbR5yWzo%2BI18X9vqLbUo%2BDTeZfEeDUBknQs1aMu4x%2BGgSIDW2nm0%2F7sXaXgxdb9i8b8WsOYlivdrPQT1Pc%2FRD%2FCVNCX84IAyWfcRuOsNU5j%2FYb77gD8B2IyORUav4ROGqeHMO3ywrVgGoSuIkzYuNQHDH4amWhAZoSqDYOBCSro5a6JQ5JYgB2Qgl98h%2FpWZjg5WGD4fIptR1HQW8Y3ng913pCRIwARg9obokNdlSMBubRqGXCsTh60H6OwCAe%2Bj19cfrYD1FWIKBTBgPc%2BY1NpVFGO%2FLdV6FlEb2JtpewVJIm6wQbC4fa8hzD9EY0P69GTvPzDy1mmI%2BV7nkD0U7No01XYTJhtpC%2F0Cb5CmyOBy7EfN5Bnk6KD0TXxHG1TqgE31CK3xmo%2FctsNIOjTt64QlYiZR7PFbmDU%2Bi%2BNh2n0IiQtcIcviCC04qHoTJTFSXio3qK8%2B99tG8NtUPnSAVrKgJf9q%2BuXZrgqawlbA0mIz2STTLO3zfhaMyNiMdxpi5n0QtfrsSmJuXDnqlPsMAa%2FP7EGGeTngqWbYsfi1Z0x1MKn6h80GOqUBqAtKgxyDrDqtvdr4QQ7lm8Ipw1NYqAcqe%2FbWOZh63pJBbPSWlblWRAsTo6yMlssKO848FMC7v8vBjFebwpULIsvYOPKK8Dmy6vn2VYXr5kgHLnR3CzAzqrjjRxRkruZ%2Fwp6AuG625nVWD1yNIWWymX6%2BaMMU8QWimGM0VIw1ApmXIRxKh9XXueGSEn%2FoVmHa7%2F16ZK3%2F3NXaVX%2FEldm65%2BTcUHo1&X-Amz-Signature=355ec715c7e87165f6e4a0335540e686484a49b77f1cd50c4e168b7ebe523021&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGGRZZIL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCQqXXBH3yl9EeEGld%2FiUCuY03ww%2Bw2mBe5lEJtdbixNQIgDDR%2BeWBFwSkuT68s2e1yFIjHcbTkCGLCu9UJvELJWPQq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDLxrf7qs%2FBl1scP0uircA%2BasR7%2Fo4bxzyXkx9oWGBrYufNuw6TZwvumTr9B2Gk2lgfTkBzPQxw5D7GjdPtMFMEfBleiUVsisV9ByMs9nZAIPeJ31%2FgfRsM9tL4wClhM4Ac2rmSxJpykT7a6WrJsu%2BaqPhLx9NM4R5J4cOYou2XQoW0Hqb3xO10Vpnrf5eHTZnVcBwMyeBsjhsI2mlzes3DGVEnbtMN4Lefh4rlp63nS7R3L69jqcEXsEhg%2Fo79O%2FBvTMtC%2F9H98l3ia%2F7V5KHnR2OQ5xSGHBJmCDz8aTqUdtyjL4O0ipfplcXUDxd6NlyX09oin8Q3rMudUu0WHYP7MNnk2dnPIKUXcNv3WyrJBU40lFetMGyG5%2BejGBFHFs6xMn039f2glniOmrhFY8oRAfe9wWGoMvJv3CKOJxCmSSiWgHEjD3PCDpnBcmc2IbucuZ%2BSVi9DxifjyJWU7o%2BysFzXtoNS10A8tm0PjWi7GS0QkODjuaSQZguvcCKLF0VvraXr3Or8OKm6C4n%2BZKza2JNSrJQX0XZJceDtl2pJQsVpYtv9jgPFOCGqqbjym038HOKb51NXsQaacebNDqijiGjGjlLs8Hvw8BY5IpjjyhD%2BPmh0czMMz9rtWe9DN0uaGz%2FjkNej%2BDQ8YMMJf6h80GOqUB%2FtXQZYIMde1ivIAYRmDZKK%2Bqo4x%2FkH5Tj%2FKt%2BpdZivN1z0wLPJeMGRp8zSdCdNRT%2Fc3OPOH%2FgYV%2B4RkoE2j4%2BkCbfXIXyJDJgAgZ%2BQbgACs1gsf7981XHkkPjdzQCz8MMgA7bgF6nE1tuvIs%2FyDfdX6lVBeXM6F0fdoV0%2Bp9g9kZByjvpAU7Y4T2GnFlkWvT%2F3mxUi5E%2FRqz9TQgbtTnhox8ej3T&X-Amz-Signature=836df647d4a12fe9ab9128d2ce05d8ae2a8a759bfb31566318820081c5eddf6b&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZGGRZZIL%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIQCQqXXBH3yl9EeEGld%2FiUCuY03ww%2Bw2mBe5lEJtdbixNQIgDDR%2BeWBFwSkuT68s2e1yFIjHcbTkCGLCu9UJvELJWPQq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDLxrf7qs%2FBl1scP0uircA%2BasR7%2Fo4bxzyXkx9oWGBrYufNuw6TZwvumTr9B2Gk2lgfTkBzPQxw5D7GjdPtMFMEfBleiUVsisV9ByMs9nZAIPeJ31%2FgfRsM9tL4wClhM4Ac2rmSxJpykT7a6WrJsu%2BaqPhLx9NM4R5J4cOYou2XQoW0Hqb3xO10Vpnrf5eHTZnVcBwMyeBsjhsI2mlzes3DGVEnbtMN4Lefh4rlp63nS7R3L69jqcEXsEhg%2Fo79O%2FBvTMtC%2F9H98l3ia%2F7V5KHnR2OQ5xSGHBJmCDz8aTqUdtyjL4O0ipfplcXUDxd6NlyX09oin8Q3rMudUu0WHYP7MNnk2dnPIKUXcNv3WyrJBU40lFetMGyG5%2BejGBFHFs6xMn039f2glniOmrhFY8oRAfe9wWGoMvJv3CKOJxCmSSiWgHEjD3PCDpnBcmc2IbucuZ%2BSVi9DxifjyJWU7o%2BysFzXtoNS10A8tm0PjWi7GS0QkODjuaSQZguvcCKLF0VvraXr3Or8OKm6C4n%2BZKza2JNSrJQX0XZJceDtl2pJQsVpYtv9jgPFOCGqqbjym038HOKb51NXsQaacebNDqijiGjGjlLs8Hvw8BY5IpjjyhD%2BPmh0czMMz9rtWe9DN0uaGz%2FjkNej%2BDQ8YMMJf6h80GOqUB%2FtXQZYIMde1ivIAYRmDZKK%2Bqo4x%2FkH5Tj%2FKt%2BpdZivN1z0wLPJeMGRp8zSdCdNRT%2Fc3OPOH%2FgYV%2B4RkoE2j4%2BkCbfXIXyJDJgAgZ%2BQbgACs1gsf7981XHkkPjdzQCz8MMgA7bgF6nE1tuvIs%2FyDfdX6lVBeXM6F0fdoV0%2Bp9g9kZByjvpAU7Y4T2GnFlkWvT%2F3mxUi5E%2FRqz9TQgbtTnhox8ej3T&X-Amz-Signature=0a2064d7441620f4a92b68f0541cd125b0299aa2232f671bcea5b559feb68763&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TS4HH44C%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIBwaIntjQ9oh6Yvy%2FMoCIPcVPJF7lFq%2Bt3TPxkbIr9%2FQAiA2CwR1LV2RWMwN2MbBHJdBDqlKw8m5yZWJl2oxNiVZmir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMSHRn9RiVN82xY15NKtwDvS%2F%2BSTmdIfUcLJ2bvMlzknvCWzZ%2BdzPQNm9h2XJgxNR5YDvWm%2ByuxNQTyIssACXjCEU70y9nvcPfg5RoLOLuVNZPrpctGH829d6Ql4hWPFVLjPpHTSFB6p0Ww3RL97ca8fVx1UWxO%2FNftF2GQUP9kWX72bLVuhNB42hPhc2gdXu2PZa3kK8vVV3WkSCI7CRo1DdwoKG296IGQ%2FQHJQJHQKMs70CfIkG3n0BRHYq%2FTxBt5Ahf57HRQbVEm1I4FnZB5NwDBiGbnkFQNpMUQg5kgVrkfxZyoSJQkfQwFyOpMWjRz6ddEts0X5GczscrYIM%2FVu5kIXoL2ByKgrRlqIhf1GHV3FLoTrtZ8bA0qX1BSpSO2iJgQyTXU77pogmwPyQhVOVtAbzEfsymdQWSIplh07MqTCpBAJMschBJ5IbNP7O5RkpOHPtG5I5wHwdUUbNP6%2FbCqDKRyDxSM5Ob5JNQlALI2kG1%2FdjASR4OgEt2wgVNbXRsirr8ux%2B7qcD6oXgE2Ej071iFFRPOJ7b%2Bb2eAQiPMa0cZYWU1rwOQXQ7Wkt6z%2B4MgwTccO5u8q%2BErzhhkbbMy8r54cJev5VZuBLRDkS7P5E5oUvwQPuYQcJQ6k5dCYyi%2Fj6z0zPXp85cwkPqHzQY6pgFGU9X7871d2j0XCwhGUNBs2x5te23k6cEkkV%2BFQZLqRzqPjPjIjrcZttR4uNihGdjPXEhqi%2FFNm%2BEMWDXud6SIMmEIbXJFm7yxE6mQta%2B9RzHqkdryELbDpUekHi%2BMCfetj6J0CC%2FYHqsOL3bya6OW5kcM42tVDvrXfB7wtqHC1qg6NW1yjNaCuFXZBpr2dn%2Ft3LRVfdfElB7y%2F%2BS6%2B5116UmyHnE3&X-Amz-Signature=c08003b350309ecbbe287fee2f8cadf375bfacd361dad125b252d9234a450bd7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663IKNIIZM%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221055Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIB67o2U478w3gL3ApBLKLV1dzvF68BagqLYPW8WU7DhfAiAODECrFoVWIoKfzMSuTgFfM4L5xKvWXy%2B3w56PZhBqrCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMiI8HAtPw54mSlYQBKtwDS1aD2bm1KTy2wIZGCywKOgq7bI8uKjcb1HKk9cLHnYFa8XlIcXwVlfkRccZ2hMk6euzgTldlPbwYmK%2F1fpWWMZhm7aTqP%2FN4tQf%2Bciqlj%2BbWJnVM8%2FS7R657g2Ra83%2F0iXBgNqzL4LVigzivQqwOkn%2FMfEdyrTnVghMsz%2B9CqrWK4TCm7tMtVAgvjrQ%2BMZTQfCuV0NkIqmTXC1k%2Bb8QFq%2FBt0xXU6QFdN7MR8QTs7Kbx2WzKcSVzvQ7MAZVo8JbS%2Fc8osB2kRDYedcTjBF6SQRV29ppyfeIerVlVCgN2o9cfHStaSlKtbH2h%2FrQTJTkhgqdLyLhlxTr9znus6CYLDNrltxEJ1b7v9OgopsuYX1DBL4J2yxthZVWT6dSFd5Vo0mZaFEXjEOzv1KrdCw8R4ZSz3abriXB6%2FSF0U1ZRRZUjYYOYFTo94LZUJxG%2BFnKms5RTU%2Fo7nBjBGUOjCQAIVqxQYu1IYp7IgWkQtclGB1i1VV6wZj4hzSYd99QvnQMVMrg1CymfYu6g7X3QcG1099AAmNR3RhJcki%2FPUQO0O9Opo%2FMywR%2BZ66dScx5rlhwAfv1enUyciFeq49ZM%2F%2BR1YUrqUpAu77Yop898SIeylBwYIgkr%2F5l3Zrpi13YwuPuHzQY6pgFk9YywVPyjYK3H7kZ4PupnYV1Qj47%2FsQqcbbJG%2FPZibLgpQJqmo7ScEIRdgjwAWH7yrDDZNjCNFnBXiGwi1zWXuaCSxW5e5ZSy0KbSBB9erqpfM8Unx4QiInKrVEm5kkt1RCJJlB3YY9VJo25piN7v8Y0X662MZYkWtp1217keY4Fv3Bo5PvmDFi%2BvYRMwi0gru2nJwhrpLaZn6rJpS43TekMJPG%2Fh&X-Amz-Signature=debb3db7ebd938b379746f6b5c412442cc8a47605a813306737268b0f3b55be8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQI3VQCQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221057Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIH2AfBJjFH%2BCNUeEK%2BW3ytg0yQq08js7CkvDOjoGv%2FzfAiAafTuYtVAsXewMUO24gGUn6vA7%2B2unjsZVu7snjxz3eCr%2FAwhGEAAaDDYzNzQyMzE4MzgwNSIMULTKDnroW5DailFCKtwDKnaK7eRxCzVwjBTSuVLB6GzSSMipoqtX4Q1wCmNCJ0Ajgquytb%2BoYybTI8b9zqSFGv1C%2Bjjq2RbE7EOCZDzQBX0X%2BYY6rwUQkMKsLduTU5oYVtga3tLxkkpCINjwatGaLPj870ki76t3sQ0b6R0S5%2FI0aAhOKO%2B%2F99jSA7V47ooMWn0kCw1I53YnfLnJ0U%2BqrDSgTFkHBJhWdv%2FdYzQhBwyma%2FPbVxF9NBymav1DoydggC%2FuoT1JS93TEtLdV9Ma6zsWGmt6z9PpvLSJL6RofRHpz58YAktcRhGAyueIB2r5hB%2FksJjmb45gZfFTA1oP0g8tQgUmyLVrAbNGL4Ud4Qjsm2BCuaMeEkLN3rjzDJHKqSCkx612bNPS5BEYZPuUqUMdn3zbFWTCu%2FaLEMM12Rtlh3Bsdl%2B94yCykjJtmO0%2BQftm%2BIkkgDjzZQIrMQ2bQwCLzXJBMtfRiN62ax8n4s7ElE5oxFjU6ulxYga1CzN735wy2DjmO%2FLTOwtycAlLXXF3%2B3pApUB6x9gUDPG2V8k6HZPDwCIdI4EgY0eDZqUiyqUhtgMDLMos8PaC0XrFvBN3AfKYRZoU4n1gRHT1nMzTyX6Sa3HocvjEUIPctjEfn9fGUJ6omElzJc4wt%2FqHzQY6pgEtzqEaDJvl2oxdId4DbCHaaP7gpMvtkvyXl4IkE4NT6yW5iAHb022dic8r3pamdHuLXaXD0tiegBv6vpUlxK7KNmLvWSUj4BYp0C4z4qpXj5ZUAJCWK5i0oSIEvMJMn5tq03zAr07WfHRmRUlgtIh5%2BZecl%2FFxGWMF88VsmNj%2BY24nhDCl5aPQCn5v3X%2FFNSXnXxxhsy3LElN8lhGcHcm3zjT6pKof&X-Amz-Signature=14f3bde262833ca7a4f138820b97018f74fe6d021c23d0b20ae92348242aa372&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIWFVNCH%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIGZbW%2B%2B%2FfedLHadmTz2hQ5TysnjtIqoRHsgO1oC3hZguAiEAzw3OQTBlvxFvOgcl0I7bC%2B%2FVFv4cAqYAsYeM%2FxuWHscq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDEQAM5ROS0ziKSqPZCrcA8OEVqQ%2BZis2LQZhywkEXia2GKsIMwkz9dR93QqdgoqfLjG9lxE0DHYYGGpjxvKZzyiBsNNKN2ErTWEGfVncskCQjzEFvyb2bN3b2mN0AeLfbXxjVz1gtOZ8PjU1di2zYOntspn19dCi0yMIywUtGsEty6D2emsIi9WFjkmXQX%2Fz2L0jJhTuqQykU9an2hQs%2BsTsn7KosWT3oio6FFt0biI01nac0uXFeBezqKKwExhNw4r4qk9Vw%2BqvE7nc2vJMtHXHD78yd5%2Bj%2FnJBChdCTWTnKanbArc1%2FULjIzDMVfyU6UzM1%2FXNjefDZsXi%2Bj1jqbNy93moGh6d7TsIWt1kbgocKl1XK3GPxyihYGG0zeLj7cfFDCHEmIQRDrEn2j4HYVUWXDIO2NFIIXQ7Z5YcMVazH3XKWHs6w7KPcfXztoFWvCL6wQ4mFn%2B%2B5gUsbHoGkEJ2gb%2Bo%2BZqBD2AgvjojcWjzhubGyq9QU8qTIBg2pb2niD4Wl1%2Fo5%2FEj9cdWMSxRDJPSKJ6g3HFp8SsxmzGH2BUWzHuvWsBY%2FVquatMGNR1cmti%2B3%2Ft9WqV4DAhutTNK9ANAI6NGH5ZRNg%2BRxSBbawIJdpkJWNzPoKysVOVesab5x%2F9MnK6TwRME5GDMMIL7h80GOqUBM1EZdedie8u0t6NB3q0BWssyiIn7gKYIJMKaAyV1SRJ0h1reB5vR9dc6SvwRhQj6s9pIVnA9JzbUSPyvVJ6hmKsAbFQywrGZBuDztZYdLPDDevW2L3jg6%2BTy%2FS15fJIImQrQS3ntLHmPUzDPl3tlc%2FiBKA2ajIgTSYM5Bc3KSRr3laBYiMURCQ2gnP%2FhCmku%2FX9qFo5MqheGGKZMqJ0eG3HUXShB&X-Amz-Signature=d2f4174b3aaffd8b41d3539b27bd803640c2a842e899d6804b1f7574508ee60a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RIWFVNCH%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221059Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIGZbW%2B%2B%2FfedLHadmTz2hQ5TysnjtIqoRHsgO1oC3hZguAiEAzw3OQTBlvxFvOgcl0I7bC%2B%2FVFv4cAqYAsYeM%2FxuWHscq%2FwMIRRAAGgw2Mzc0MjMxODM4MDUiDEQAM5ROS0ziKSqPZCrcA8OEVqQ%2BZis2LQZhywkEXia2GKsIMwkz9dR93QqdgoqfLjG9lxE0DHYYGGpjxvKZzyiBsNNKN2ErTWEGfVncskCQjzEFvyb2bN3b2mN0AeLfbXxjVz1gtOZ8PjU1di2zYOntspn19dCi0yMIywUtGsEty6D2emsIi9WFjkmXQX%2Fz2L0jJhTuqQykU9an2hQs%2BsTsn7KosWT3oio6FFt0biI01nac0uXFeBezqKKwExhNw4r4qk9Vw%2BqvE7nc2vJMtHXHD78yd5%2Bj%2FnJBChdCTWTnKanbArc1%2FULjIzDMVfyU6UzM1%2FXNjefDZsXi%2Bj1jqbNy93moGh6d7TsIWt1kbgocKl1XK3GPxyihYGG0zeLj7cfFDCHEmIQRDrEn2j4HYVUWXDIO2NFIIXQ7Z5YcMVazH3XKWHs6w7KPcfXztoFWvCL6wQ4mFn%2B%2B5gUsbHoGkEJ2gb%2Bo%2BZqBD2AgvjojcWjzhubGyq9QU8qTIBg2pb2niD4Wl1%2Fo5%2FEj9cdWMSxRDJPSKJ6g3HFp8SsxmzGH2BUWzHuvWsBY%2FVquatMGNR1cmti%2B3%2Ft9WqV4DAhutTNK9ANAI6NGH5ZRNg%2BRxSBbawIJdpkJWNzPoKysVOVesab5x%2F9MnK6TwRME5GDMMIL7h80GOqUBM1EZdedie8u0t6NB3q0BWssyiIn7gKYIJMKaAyV1SRJ0h1reB5vR9dc6SvwRhQj6s9pIVnA9JzbUSPyvVJ6hmKsAbFQywrGZBuDztZYdLPDDevW2L3jg6%2BTy%2FS15fJIImQrQS3ntLHmPUzDPl3tlc%2FiBKA2ajIgTSYM5Bc3KSRr3laBYiMURCQ2gnP%2FhCmku%2FX9qFo5MqheGGKZMqJ0eG3HUXShB&X-Amz-Signature=bfb55cc83bc98637225bcf36db07edccb072d0274cfa95db680e1faff9cb5fbe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667O3PFUAR%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJGMEQCIATgnPNbunwRXSQL9IR51Cnz4eD3EoMWhp4DajdX5igfAiA%2FXnjyX0lB2e6KcFOQqZa9IMWa%2FAjw%2F9dKsMSdehauvir%2FAwhFEAAaDDYzNzQyMzE4MzgwNSIMYHpL7wbZcEQ%2F%2F50hKtwDIsG0x3u06ero8T4t7OZBzBCHFLI77BiZl8B3OCcX8ZiDXwBYMJB%2BAEP%2B5OIxNevpg54U8mtSKJhZAvWEp5VPrrPsPaXB7g30mhHKnLTP0zMTtG1%2BBBRb2zOH8zux9XMFOBI2MyHuqgfMpPecCXt7yZ6xol2GHn21GHS9QUOYv1xkJK7iHhnGfIVdXTZxxKlyZGri7V2WXgsblhCqjPEzdJi0lbzdsS%2BqC%2FNEJSt3aESsAT3ZjOmKfiwp7mkQZbsrXeFw3bpsAFJO6nXU6xsbj32gKs0oY9CEityObt6iabvlv07zKYeRYQZif5ztidLW4o79fS%2B10LrNkdFJdZdcsMgDfwlHga76msxa0YHYgWHkyR1DzdY6v8x3RSPsCExkpMD5zv4t2aVCKEtXCpqCcFQTd5sxDr5iJPsT0mVGzEoPp1sF%2Fiy0p%2BzwYAfX3ZEFhe7OYMd3n9L38mZBwBd5b8qlc%2F45nBneL3e9862qy8lRzQw1CiJXg%2F%2FN6KKMB807DJ08YAYsZ7ar%2FCtAxmPiRYVKRuSiA4H3wdJZcwnJQojGybk%2FcGS9py96whc63ho8But2%2BzEmTN%2B9pKvwOBfKE%2B%2FQzrHDTKdt%2F%2FoQOkajDSVZMs9HNwjG1OXgcaYw9fqHzQY6pgFBuKKMSpgJA6fmpbSpOfyFrYTT8oX9RoQnP6BWbI%2B6GunJal2CtZGNOWOAB642hXQbQfRXSbpP2MBRaBGmgzZNiSdBe%2FJkRePP58QSVRNEqxztjHqKtlEjkkOg0%2BtSM4T3Tbyh9tW70l%2FaZVsX4U4C6UbLFsuy%2FZdJkD9rgaPrrGLqy4xO0pixKuui%2Fa7UeKq48%2F0a%2FHlEHd2QHt1xBC80vJiy4BE6&X-Amz-Signature=6dd4b411edc6ade72e2e45d02ced0fde4343366096a7c92b58860730de87146e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7FHV76X%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCMjv%2BDTVc8uUM9QIrS6TTtccxzkMWsa4GP36xJLp5bmAIhANR9UZi4Ug83rLCjUfx1km9B3sfVyi8WSLs3Kh0YmBAzKv8DCEUQABoMNjM3NDIzMTgzODA1IgxJJ82pJu2pfsEjVa0q3AOB1r1aO0TBPUA25mXyXS%2Fvioci3oReNDMDGKyElZ65KINGaBvtu6JeJEbNMBlF6S1jSLfCrSkv6aUsnGVLWNDhW8d2NnDQcZ%2Fita%2F%2B7lniOW7KsQ%2FAo4B36y4JAbJbKLoqHo3RngWoiNbtbKqwdBBqSVKIduimJudTTSWHsFxPIYLaqL1krKyoxCf1GbPaVU53d6pTr3fj2MB6UsmAOJBf%2Bcs1w5rsqk5M7dzhBpNDrj3UtYK7rDatzxcZU4mqFOlWYJXDgK9AeCrPvMzCTYVtf3P8Kin55fwjXBVdFUsGCK3GnyFtjVZwm%2FawxGEN30oTIiiT1R9931sFmLJLZJczChwSohvSA1hMOykP9WnvPyLo66V4km3PnA2FT0QdOeZ3ZbrNjXb%2FXdfQh0Wev0CAZ9d361FqaD9HvfiV7bQq1TKbzO%2B%2FGLdpMcs2NsbQkcDaPVQZdDIp3nE5JdzdksB35%2Bu4t2VI9OUayhx92QENI5ZIWeGAXvvYSvWXqIIIWk2ZNITmylt63JeQUG6i89D5X%2F0VOn%2B2FI3YB2XtCkaRW%2Bu9ZM781WopVk7m5HmHDt%2FiyT3lYuwjASCOUNmhxhY3pJEpAqkeMK7IU0xZjkwF8BDNQO53Xf6UXBOuOTCB%2BofNBjqkAVdig6aRQzOZltNNTbiU0sn3zsI5JALQbB8owUkU4QR1IxsS22LBPex4QCWCPtVFiVKwPvjYtwaVGarf3w3Y2jSDf2k31jQ%2FGX2R70APkwpboIaY5gR0Zcn02niFVozHrKiFbwn7qGKI8ei45TsusAGVcKsLZ5fbjk4TrNVv5TlrRXb4mNc6ZZOvN5c%2FXnjuaXjQ6LxvlBZsaJ7LosLj5yJxFXwp&X-Amz-Signature=f0f370fc8b26e94d7974a18615d276b4973c45e579bdb265abb1083e5f416d78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Z7FHV76X%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJIMEYCIQCMjv%2BDTVc8uUM9QIrS6TTtccxzkMWsa4GP36xJLp5bmAIhANR9UZi4Ug83rLCjUfx1km9B3sfVyi8WSLs3Kh0YmBAzKv8DCEUQABoMNjM3NDIzMTgzODA1IgxJJ82pJu2pfsEjVa0q3AOB1r1aO0TBPUA25mXyXS%2Fvioci3oReNDMDGKyElZ65KINGaBvtu6JeJEbNMBlF6S1jSLfCrSkv6aUsnGVLWNDhW8d2NnDQcZ%2Fita%2F%2B7lniOW7KsQ%2FAo4B36y4JAbJbKLoqHo3RngWoiNbtbKqwdBBqSVKIduimJudTTSWHsFxPIYLaqL1krKyoxCf1GbPaVU53d6pTr3fj2MB6UsmAOJBf%2Bcs1w5rsqk5M7dzhBpNDrj3UtYK7rDatzxcZU4mqFOlWYJXDgK9AeCrPvMzCTYVtf3P8Kin55fwjXBVdFUsGCK3GnyFtjVZwm%2FawxGEN30oTIiiT1R9931sFmLJLZJczChwSohvSA1hMOykP9WnvPyLo66V4km3PnA2FT0QdOeZ3ZbrNjXb%2FXdfQh0Wev0CAZ9d361FqaD9HvfiV7bQq1TKbzO%2B%2FGLdpMcs2NsbQkcDaPVQZdDIp3nE5JdzdksB35%2Bu4t2VI9OUayhx92QENI5ZIWeGAXvvYSvWXqIIIWk2ZNITmylt63JeQUG6i89D5X%2F0VOn%2B2FI3YB2XtCkaRW%2Bu9ZM781WopVk7m5HmHDt%2FiyT3lYuwjASCOUNmhxhY3pJEpAqkeMK7IU0xZjkwF8BDNQO53Xf6UXBOuOTCB%2BofNBjqkAVdig6aRQzOZltNNTbiU0sn3zsI5JALQbB8owUkU4QR1IxsS22LBPex4QCWCPtVFiVKwPvjYtwaVGarf3w3Y2jSDf2k31jQ%2FGX2R70APkwpboIaY5gR0Zcn02niFVozHrKiFbwn7qGKI8ei45TsusAGVcKsLZ5fbjk4TrNVv5TlrRXb4mNc6ZZOvN5c%2FXnjuaXjQ6LxvlBZsaJ7LosLj5yJxFXwp&X-Amz-Signature=f0f370fc8b26e94d7974a18615d276b4973c45e579bdb265abb1083e5f416d78&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664NZDUMKQ%2F20260227%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260227T221101Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEH0aCXVzLXdlc3QtMiJHMEUCIGVxit%2BK2r0WRvR2kg8AYBlMyaVEGRXx7aJC%2BoYbeTT2AiEAo3CtJlx6BWW8hyUMEr9IlbPWkEunLktXtq8JdjLHwYgq%2FwMIRhAAGgw2Mzc0MjMxODM4MDUiDEHWddc%2Borl%2FVB40aircAyrNduJSso264GTetxtfyeYbfFmG27m48C4VBPHNT7m7%2FNUJ00vb7Ui%2FkPr2W%2BlWnDxw3hH%2BV%2BXPLgBX%2BtPOEZNoIX6DZ0HJYLuXjGt22KjBRWNjfdUcatLKSpoNESoQTaJHB9ZHgy0v3r1rWRcRNryDp1lUMZlpc4Ekq9IhXL3OaBMeEffoD%2FNV0PEHXIMuII%2FPTiVVXkczsh2LHyyRh2sZXwG5kx%2FXJ7Sn6oJ1L%2BJZJs1%2BbfLQNbopSNXd15NhV6GiDjhUgfTOxuuLku87DeCtaBKwVhiOnysy%2BlL%2FYEvHWtSX2%2BNcMBDWdbyTAKnimGfAFqEYXcgdkz%2BHObgFGAHTTO4sg%2BHCMZkrh%2BXCq68Ri6FNsnJV5HhIgqGpsUUmRqsl2Hy48kCkeHpOH7hMoK%2B70jI46Cer%2FDTJ%2FDyFereoc8izqTcNyeEbHoPdXePs2X1NPSQ99YGDw4xG%2Bzw0UI9qosXih%2BR6jahCEntxB8R%2BtyZZpkH54SnaTc1Fn3ohKyQ%2F13bDSLBsia0mbIiaZG9L3%2FZfI%2BNwo1%2FfXUtWg3VWofiFV%2BgBvZL3HhfZjy6gZBr8rrrgCzJBESFKjFOkw1zMOgxOOVryjjwHedZuW%2B%2FmE1r5j90fe6gFGv3oMMb7h80GOqUBFKm3CPcFEC70ZaPBAA%2FFQIoyi4bH7ewhAiHXJMhBgfIjyambs28OkH8gXcHrA3zAHDFcLXe4YAt0MLAhJI0u8KRY%2BQSz%2Fzajq4iuCGAN0961fOa%2BfrOjpVeMd3STb1iZROZny4QUKLpzYW0%2FXejV2Ed%2FAy9zzdJInAygWhmkiUZJYGKeLGW5NI5GY2X%2BB82uw3C0Af5zOlXgu%2FygZipwJtCxKhJZ&X-Amz-Signature=0cedbc3d8fdd180683a4f15106ec1b7872c11dcfee540268199dc10dbd7a35a8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

