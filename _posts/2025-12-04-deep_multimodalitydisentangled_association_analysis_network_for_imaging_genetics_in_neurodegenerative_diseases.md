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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZA4T6A3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC2tvmO0fNtUDeralXr3WT%2Fn%2BBIQgpSwdZjeWU4vpaNSAIgGixM2R%2BwSTqF3y3n3iR9EyM9ePhdSQ1zVp%2FHmRoEtnUq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKx2lkecBpRjFL7XBircA%2BwgUuhkNN6nhgwGBdKsvPeJtTS6ko0fGKgtI1WsQepVRrsXseflLAmBMELMlrodSPBuSDSGQIgsK0r2%2FYwsGtByQRTfjd4yOETo0HugwE65eEV4LvqPNhkGJoHhbpLBG4XhG2wMgcD6%2FZZw6BRYYyohaS1y42X%2BkrecoT%2F2RiEOkcXo9Aoo3zTwmUqkBSVY0HlH3UIuxx7Y5L7Naf308H%2Fd9fitXPWEvuwFLC02yWSnwuxNxdWQ9jQxMQX0lSwu2rXa7OanaowzJ1LMEm%2BVI7igcqaIGuK4ZXKiFFxKtteAh0fthkQb%2Bg2Eb1m8msuSLbSVceqyOaLNoVktLGE0c7iIW4sJKVgvIirocb5IWosAANoIm04fKSndSUU0kzc4Qx%2Ffu1FNJPYxXdzFaiE%2BAaxTd7CJJrkByr3XRDZxIuHSXG4rXU%2Bwx3R%2BDliCTYZWoYJpbXJWl2jHjM0n%2BlDl9Bu7Ei8QrRoDlNIWp39vvJ9qCSxuQ31vG3y3zyGE0S9pA4kJWX%2FNb1pWv8qT2Kjy7oNX%2FHLTAt%2FCpeM5NkglGyY63YiCI1el%2FGusOAMWzGRPcpy3n8AAPbQM8bQjGyv7cL9t57NYh%2FmgQDxFvh0HIAFfWqd3Ph2%2FYHp4%2BOGtMOSJlM8GOqUBeF8t0m6sTn5dlxqENj2k%2BCU1UXb%2BRBiSrixvj3uMW4ZAhL5RvWy1O9eiz%2B%2B%2Bq4L9%2BAATXwIEIJqrHdQGuzAoi%2FxcfXTCTMi34HcTysBf9%2FeROz3UAr7Xbcy%2BDysfYaiOKjF9GA%2FFQMneeVGC9Fuu%2Bl%2BaMuA9RrDfNkLQjc7IPIzpEHebX3WoL6m%2BDtuads8KJoTXwejMkMV7m%2BVaFWIeM0aXxY0T&X-Amz-Signature=4d9916d27b70cbc71a3ebd7eb19e557413943d39ac971f3d14e0a3b06915b489&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WZA4T6A3%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQC2tvmO0fNtUDeralXr3WT%2Fn%2BBIQgpSwdZjeWU4vpaNSAIgGixM2R%2BwSTqF3y3n3iR9EyM9ePhdSQ1zVp%2FHmRoEtnUq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDKx2lkecBpRjFL7XBircA%2BwgUuhkNN6nhgwGBdKsvPeJtTS6ko0fGKgtI1WsQepVRrsXseflLAmBMELMlrodSPBuSDSGQIgsK0r2%2FYwsGtByQRTfjd4yOETo0HugwE65eEV4LvqPNhkGJoHhbpLBG4XhG2wMgcD6%2FZZw6BRYYyohaS1y42X%2BkrecoT%2F2RiEOkcXo9Aoo3zTwmUqkBSVY0HlH3UIuxx7Y5L7Naf308H%2Fd9fitXPWEvuwFLC02yWSnwuxNxdWQ9jQxMQX0lSwu2rXa7OanaowzJ1LMEm%2BVI7igcqaIGuK4ZXKiFFxKtteAh0fthkQb%2Bg2Eb1m8msuSLbSVceqyOaLNoVktLGE0c7iIW4sJKVgvIirocb5IWosAANoIm04fKSndSUU0kzc4Qx%2Ffu1FNJPYxXdzFaiE%2BAaxTd7CJJrkByr3XRDZxIuHSXG4rXU%2Bwx3R%2BDliCTYZWoYJpbXJWl2jHjM0n%2BlDl9Bu7Ei8QrRoDlNIWp39vvJ9qCSxuQ31vG3y3zyGE0S9pA4kJWX%2FNb1pWv8qT2Kjy7oNX%2FHLTAt%2FCpeM5NkglGyY63YiCI1el%2FGusOAMWzGRPcpy3n8AAPbQM8bQjGyv7cL9t57NYh%2FmgQDxFvh0HIAFfWqd3Ph2%2FYHp4%2BOGtMOSJlM8GOqUBeF8t0m6sTn5dlxqENj2k%2BCU1UXb%2BRBiSrixvj3uMW4ZAhL5RvWy1O9eiz%2B%2B%2Bq4L9%2BAATXwIEIJqrHdQGuzAoi%2FxcfXTCTMi34HcTysBf9%2FeROz3UAr7Xbcy%2BDysfYaiOKjF9GA%2FFQMneeVGC9Fuu%2Bl%2BaMuA9RrDfNkLQjc7IPIzpEHebX3WoL6m%2BDtuads8KJoTXwejMkMV7m%2BVaFWIeM0aXxY0T&X-Amz-Signature=4d9916d27b70cbc71a3ebd7eb19e557413943d39ac971f3d14e0a3b06915b489&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZFAILAA5%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182853Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDj2SWy7A8YSOEFaT5rR0pkbm%2F5jpLNg6YSdorDtKjf8QIhAOSoQg9NuLRRaHHIgsmHvFczVy79%2FaAXlQhQNam74d4hKv8DCAoQABoMNjM3NDIzMTgzODA1Igzyc6GNGpLh88Ola5sq3AN4Aq8ISnLc4x77015s%2FetWD4AwWQIvDl7DNM2AuHZqaUj5e3%2F9Xjjd1dH0fArN1W8HqU3DxlUo8QZOuDk0ZLu%2Bka4gYBjWA2fWRjtoQ0gymgnF97Zg1ZBwEIRu2gmw9vZRl5Q0k%2B3eIN40ppGvSkSvRDOZGP%2Br%2FIQ33BGOty0%2FJ1sq3OoARS49nnqf1uwg8l%2Bic3kOwfWODuGmsG7BJ1iOa2cc0000T3AMJmnb%2Buhh0fFNucyVBErYYuvV1eySuRxzAq9jgmrMbRx5WUwYZ0ATC7s%2BKaVxFoD7ici0y0HfBtuoYiffekY04rtkNc1AUM09XhCfiixnZzM46UqgjjDYlRWRz90oNaJUkqP8C21VuMY4QN1yhpYefdH8kbYVHL7yA0h5oygsWYyIYYW3AlcD1ET9%2BbUnzw3Lj5R03k4eg813Ymt1bK0NYipWQdw3cPg1g60yIGWNKOIaHQks5HI9FhpjhEtkBDYXHixdXvZJyYs4%2BgvY5tOpOvpFBt3aPBW4eS3TEFUsuJY9X475HVwF1Yd0lNHMU9jHLCyAngwKk053pHBn7nYFzjYPh%2FsGSpiL2pChxlPwXDzjT6c0gvB9wYtcvGuctH47s8Wahg5KvV%2BdmZf9HJdajlh0GTCXiZTPBjqkAbaTUK6hQIe1UBLBcuDpOqds9HuwxaXCnHR94OrtA43PaXYbmZIBfB8YLx%2F86MnGL2w2GxZSV1uNAfTUJgyOE7Vw75gW6bnWljgjeeomGaBea7kYiGSqZmgjOe0rKhaWigIl5pNtUT5LZR9pArMXVoIWlj9CPhG9F9%2F6%2BGZN7GSPjCSblj8Clbp0fEVfu2TeDSe5vYDZExBkbFnFrz7lszebolEe&X-Amz-Signature=030fff59952df5278d758ba42b622acb43fbd112b4e3a9f5b36f4faba191391c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZZNUQFX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCkhy31G23Tw01HWwxlo883R91jJNeOTmhTHUrqqrNknAIgcsei0QTAvJKTecfq2Bqf5AUKFxfWNv1s8KoFsa%2FREm0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDOetoMZiNpdKWvKg6SrcAy%2FQzMjby7v8XDLzjWR%2BPQaumZHe9m%2BzB8CGE3Ml6esIDH2uk%2Bpp%2F8W3sm9jgf%2ByN8HOsOheAuSCUwSL4k0i49M9kelzwkccokhkFl9tIfO%2BVFiVvYtrjF8BqpRIsV9UiLsdK9lHEHADyx3i9oNvDrouwH3tyxKYWhM9gL%2F8eM%2FF1EsA3Ndc9p6Rat3Nn4i7bHdhHnjn9c4AzVOve6hkWlM1fD5TTfgphElS1RRg9ti1PqLuXp%2FDBEh4rLEWxZNixIl0J7TQSqbycpJNDHkQoUPY6GZY3nmO1C6DhO4KG%2Bi9LW0mqQnq8wu9YYGQ7W6m8TX47%2BuW7BhxXF5KJu9J%2BjWqkM5bVg9tcAIx4OPiFAB%2F6mShduqTimiJGS8gIpIxUf%2B45ChHyEzpb07DzNk4phuznx0xetpF%2B%2BQPYKHzt4e9StkO8uFTVxZ7aY%2Bjg4euXcTpzuWXu9UD4loTwFr1pHjc4RnaNZmdMpysfDyVW%2BpFJvtFF6bTK%2BK%2F8fezcssg%2Fc9VYL%2B2VCilWgBCxPhVMWTzCxUMsngY35nsEIvgFomc3T1Qa2ecFKUM9%2Fx28p7cUHV8wZXz9AqKeTMDFlK6nLxNcJGTo%2BKXFATrASEPG%2BrjtDWFUhcHx8uWYucPMN6KlM8GOqUBHjfEcR3C%2B7Y0pJhaf1f6kwz4aYQHgbD6%2BHO22yhgtj4mtOtxNvbr%2FP%2Fv2Fkz6zoHqdVwlweRjRuK4ISjWo4IRiED6%2Fv1IBkoKMvkXKjkgE1cJC5yvLHzYzuCr22%2BgJyforbHlDFPIWIM3IKmJE8bjEYgPiviYz7egMco7BIPm%2FG0xEF2J7tFHFqYx37K2IQ4%2FOHS8%2FU7Wgts9ZxrsCeGFLApLdbB&X-Amz-Signature=11f27a406aa321b0894e2271c62b1820eee50ddcc8163829da0d5a7f8dc85bb5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ZZNUQFX%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCkhy31G23Tw01HWwxlo883R91jJNeOTmhTHUrqqrNknAIgcsei0QTAvJKTecfq2Bqf5AUKFxfWNv1s8KoFsa%2FREm0q%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDOetoMZiNpdKWvKg6SrcAy%2FQzMjby7v8XDLzjWR%2BPQaumZHe9m%2BzB8CGE3Ml6esIDH2uk%2Bpp%2F8W3sm9jgf%2ByN8HOsOheAuSCUwSL4k0i49M9kelzwkccokhkFl9tIfO%2BVFiVvYtrjF8BqpRIsV9UiLsdK9lHEHADyx3i9oNvDrouwH3tyxKYWhM9gL%2F8eM%2FF1EsA3Ndc9p6Rat3Nn4i7bHdhHnjn9c4AzVOve6hkWlM1fD5TTfgphElS1RRg9ti1PqLuXp%2FDBEh4rLEWxZNixIl0J7TQSqbycpJNDHkQoUPY6GZY3nmO1C6DhO4KG%2Bi9LW0mqQnq8wu9YYGQ7W6m8TX47%2BuW7BhxXF5KJu9J%2BjWqkM5bVg9tcAIx4OPiFAB%2F6mShduqTimiJGS8gIpIxUf%2B45ChHyEzpb07DzNk4phuznx0xetpF%2B%2BQPYKHzt4e9StkO8uFTVxZ7aY%2Bjg4euXcTpzuWXu9UD4loTwFr1pHjc4RnaNZmdMpysfDyVW%2BpFJvtFF6bTK%2BK%2F8fezcssg%2Fc9VYL%2B2VCilWgBCxPhVMWTzCxUMsngY35nsEIvgFomc3T1Qa2ecFKUM9%2Fx28p7cUHV8wZXz9AqKeTMDFlK6nLxNcJGTo%2BKXFATrASEPG%2BrjtDWFUhcHx8uWYucPMN6KlM8GOqUBHjfEcR3C%2B7Y0pJhaf1f6kwz4aYQHgbD6%2BHO22yhgtj4mtOtxNvbr%2FP%2Fv2Fkz6zoHqdVwlweRjRuK4ISjWo4IRiED6%2Fv1IBkoKMvkXKjkgE1cJC5yvLHzYzuCr22%2BgJyforbHlDFPIWIM3IKmJE8bjEYgPiviYz7egMco7BIPm%2FG0xEF2J7tFHFqYx37K2IQ4%2FOHS8%2FU7Wgts9ZxrsCeGFLApLdbB&X-Amz-Signature=0884c2cd07eb805aa66031145c5d6d2a299f3b997832417b949a38e1de822aed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RH3KVKJP%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIHGJobt%2F4NG8ugGXHJon9s%2BYlPdISH1xXjT3pWb2ntPtAiEAn1U3Ri%2FDEhXVIwlRJ2yzO3BUh0EJllKNVE9L252z0GIq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDLMAtEaATnG3Xv1KYyrcA7E7DliC98QkC91R%2FkgkHc%2B22ixrMUHVv5NczmLrHhf2HAeEVWJIhzzVY9qoycm7mJftncEQSxquUu1lbM7RsXROjb9JlleOfQbKhjfnRSKe8GuN2u9Rak48vRqEWlWetYgNYj4d%2FHe7Fuz806IdzAL0rd7gy0Yxmx9g%2FL9ANeaUSI6ximochrB2i9WWytcKlIO%2FHWd%2FX6VlXiowaUB5io%2Bl5md74bACYMOFEaJ96RaiQZ%2FOsGqBt0jnfq%2FU7lVFQG71CLayJLv7RVmCMJfMOigYPw5vqYdTtHuA8VoFhBJLJ7CoWF70m%2FpKIB%2Fswm0VfdD292IWg2jh6z59BsOxCF%2FX2S%2F%2BsRhFHdFSS%2F6d4A3Ct5g5au9LwDwBw3wYoxi6KbyRSbkBq95lplArolsjwJVq5C6R4xVKrjvRHVByyvXrRQyiqGbhC5Ky8oCvBE45FH0URCVxoKncooKjvaWwkAQzRpWucKZvC1jeYeEt9s3TMlqatAAypXZElEpz36P%2FxTnIWADp5reD%2FImYmXnkTe%2F%2Ff3YiDpw9NbokkTzmQVjCL3BLnoq59tq4iAidvb8ADUT2XIFUQP%2FA7QO0qMseWKBCt7tJUCNaw2U5NrMxWdkQgHpBVSUPuxoAIZhWMJqJlM8GOqUBdqBb%2FrWNd8C8XG290PMz4qWzQY4%2F4NBXd2pCTa8BBPRxJAR3ohNgzS7PrKgO5OsV98v7zJaIcjLpGRJhZ1EqIKj79Al8Me4JC0XqX0BxSEatr1fUaAdfj%2BWYYN2GtWRfUDKkoha%2Ff8AeOg%2BkCUER9BtpipUBPOsE2g97t5QrLkfnsXRC2UcIX%2BL5I7Yj2LVvGhiuyI20sopgLSlr6AjkCWHbnFhm&X-Amz-Signature=2fcbd5e4d38ff12838473ddcc4972cbd77e04d4bd6113bdcf7dea83db8288cf9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q2EGLHQQ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182854Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQDcPXguRSz5PHTOalS74tgYTyNdmhNq8O5qyg5jbnBRWgIgHvWZEj9ekHyQb25hfHm2Y9nkwu%2BkrZOb30th%2BrwUviAq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDLN1Mq8ouE2rrN3EqyrcA18VX%2F%2FyN0dfWCqPsTrFhUkHWh0LXjKNO2STBrYa8uUFj8C3KHweFmYyYVPtfUvyoc5RP6QiErMWORnqvH83qz66xmRlyrvAFjE1TGosOlrGvnkcnQ6xMVyWO%2BunMwoFJEiflku0h2Jf9Yxqvgm4ayxgGpV429dyiHEOUY7hPpYl83RvwmQWmJQpAZKTuGCLwHgqdksJhmYxC6Fl5XYJiU81YywlvVLaoq%2BjZguIYmeLgFQESxtOulwoJvqxdo4uGk7DjfBIvaXYG%2FRB7d20%2BlXfkCknJ6U20KYbhJ7%2FusPb1tU1NdbSYOOlD9GonsR9MV1ZHqRMJ1rpVA15E%2BmNXI1%2Bq1%2FB4f%2B4XqgdXGN4M9YwoWIVAZsiKuhiFCFL0qnHKXPrxC25nZNpFa9D4yrQF9zq2ME%2B1LPEL%2F32l5GfEuCqF8LIfQSzzyv0hRw2feggEdN0nuok%2F5NYTfJk3FrKQ6081WYotgMNlAcnaO4sTv%2BcuE8DwBrKZbm%2B%2Fgil15GiCNivr%2FLKo1xj%2BfEZruRr%2FrNRHC7nD5wcC2WUH9jyyetaa42EvlE0IV0uTsVT4BTZZn%2Bu%2B7hl5SbWvIsvp5xS1msxLmWVrn7e%2FqUl2RM6q5JW6AAei3x6MJDAy1I%2FMOCKlM8GOqUBqreInYPSF2gOQOVfTLDGSL6wZyntwWHIQVTsY8QH6fH6BjET5JcRQNX7im7vvOc4ZR47X%2BmvDU%2FUYAvq6OXdfYxAQutZ1LKaivvOEMqEPT9NxmlXy9EEOgKbovI37HrUwR6fceBkbTnTc4NMSuZ5NFSwdfYBgc62Zm1A1D0FnzwX0M0k97C5j70gSnzPQV2suFdZ65fLmGZrnE80r9PAhrI9wyZh&X-Amz-Signature=5c873448f5e924370ff3070b8f5dfd16f7af5c50abb0d187c9ef423b31ef88d4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46635VT3KXO%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCICLw4lLcCVheW1uIZ7Wrp5rN8KLfSpWUTIEhaprzlLwDAiEAi0INjdYbOBbbWdkJELF3BfS8NL3OA7lvzwwc8gidP8cq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDIe9m3xdLW17VCZPBCrcA9%2Fy%2BytEWmpEkDJzBMnu55Dyfy7hYC%2FCSRJDwxfy21%2FbrrvyfPzSHudVHKM4d%2FderRkuF%2FJrPE8PAEBz0kroqxCRMpzSdwL%2Fkl6a%2BwmRI6gKppvo4l8yjg%2FVcT%2FFBnD%2Bb3XZgA9FKOY%2FQPA3km4CNV60Eo5i3oL%2BkrZZN25w0uNxd%2FKPXI%2BnnQXv%2BbkHdi9Biq%2B86aqdGspdBatGBPPVGPKqazahqLnSTh2YhPRH4NXtlmRsK3lXt3aTDQCUELGb75PHG%2F1J43ZYNuNY9j8Ql7%2B2BbjcwuzieOXT5uRczu%2FAHnmfZejk1VLKVZVBBF%2B1DpNC0b52hYcc47PSCFk6x0x0KE3EqyebNa4zZHkDdnKiH7z4Uabn59Lji75IgImVwdruMCQ36DNWFvsDU4RE%2BSc8PjDINhfsAFudORqG2i7Xwf%2B4DeEe5mmZGAeA0ZpoZIM4qKLRfP6e9Zhnw4rQLw2tg6cU7DSB5vS80ls%2FBBuSZ6cgjmzdAoEqM828l2AN7q%2BuERLLCNrivxzyx8nf8ulvQ4h34g60%2BIfACmcAcd8jIsr3gOBdohZipVkYa87YsPUnd9qdaGoV1F18UNVyo2FyL5zYnLQdp%2FCjtDMhc%2Fnt%2F1xiyawO6z6DcRDLMPmJlM8GOqUBKMYnA9TnPn4Nm6AUX8Vj5nhIgimLlVcRwv%2BEMP2FGh%2BXHv5C4CYlHQSqyzERjsCAso7EDONkiCmbWJ66Ult66RFJaId6vkWwbGTO%2F9dlT8QE1%2FZ2D58Vzt4XJXGzwO8hrLN2UQV9UNv8kV8lDx36FKkX1ZjjMt%2FzyNsxgID9%2FjS%2B5a8VJG6RhEmrdtGnuoXHGmwKJFtAVEDbdT0%2BOj7NRtE%2FlL2P&X-Amz-Signature=4532471c01ff3fbbb06e63642c122a6323b34f469386c234a3c4cc4a8e6e25c6&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDXCHQ7B%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFrVpchFDfTimi1mt29Y8GyYNjHouVJODmb%2Bm%2F7Nz7SbAiAkchwXSVjVLzhrJBuFzcgmP8oQ%2FH6AgctNdmvXPopo1yr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMEHovAwAXN9qkVU54KtwDWIy6BqKpPCTVdf6D%2BR7iUscBXc2YbcWOi32tn6SLzrrzwCh1NRLasSxM8ElIVJvabeo2j2%2F2U4bOLgB4uforz2Rwo65asGhoFG5qNVlLz21%2BeSINCeOLj9XrtDirBHpKd%2BuTce0Km6INFAqnZ9Ji7B5N75eCjw29B2QilYT%2BujI3O2AQFViWcvWKlhZLCvuEsWYCVxqMRFaObzpXSx8iE4IpoISbuH5anyrilpUr1Ah7%2FqmnE%2B9cWuEPVwq%2FN8T%2Bl95yYBtc0G1DkBnFA8FfAIzMvE%2FS7TyBUr7qfbuWBzygpRNAfUUqGEnZuSxUzYXz646wq3CF3foMMUAqGRO6potpTqAeIuQhaoeF2WMzVk4GuNuRS6q97YcYSABuUQ4dh1nDtBM7rAZyGBefF3%2FGD%2BApyIaAIx9pSFrfvydO%2FYJZR9y1PHVTaksfwWimCU1piV9fhnkhvzWgFCNYD2KjQv15a0spgtFhdQZhx2Ns23cgodKnHqBNheG%2FpZfXYrGTrSqKOHU8EiQkN5eizKB%2BhqAKEAkvmGoIIahryipMH8nx87O1S4g2g8ziqiz78s3NdTqHsDK3hgClU9FKJ7M7L5y35L0j%2BAnXzKNj1wd04N57z096cFZhVoiyxwkwpImUzwY6pgGaFncHvdjxPhhNoEYuZqRzlBAFw8cEkagADvFRbGO7g1314IYxRykXE5lqJv4XmCWEyfGVk3hQ87E3CvdyWxqLBXrkiHRseDt3yJCHsMDW1HMtHDKMygfee4UYP00zr%2FM93SxDE5O%2BieotQIfijajLT9oJUr28fWWWKore27PeBVj6wnEDJk28Qup%2FIX3TZ1LZrRDAXYI2vpVGROXyGGmV62O%2BjWOZ&X-Amz-Signature=d88d5db46f741890e62e3d061a5cd5a8502bc283a51a16b13e37cb7718a5a470&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VDXCHQ7B%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182856Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIFrVpchFDfTimi1mt29Y8GyYNjHouVJODmb%2Bm%2F7Nz7SbAiAkchwXSVjVLzhrJBuFzcgmP8oQ%2FH6AgctNdmvXPopo1yr%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMEHovAwAXN9qkVU54KtwDWIy6BqKpPCTVdf6D%2BR7iUscBXc2YbcWOi32tn6SLzrrzwCh1NRLasSxM8ElIVJvabeo2j2%2F2U4bOLgB4uforz2Rwo65asGhoFG5qNVlLz21%2BeSINCeOLj9XrtDirBHpKd%2BuTce0Km6INFAqnZ9Ji7B5N75eCjw29B2QilYT%2BujI3O2AQFViWcvWKlhZLCvuEsWYCVxqMRFaObzpXSx8iE4IpoISbuH5anyrilpUr1Ah7%2FqmnE%2B9cWuEPVwq%2FN8T%2Bl95yYBtc0G1DkBnFA8FfAIzMvE%2FS7TyBUr7qfbuWBzygpRNAfUUqGEnZuSxUzYXz646wq3CF3foMMUAqGRO6potpTqAeIuQhaoeF2WMzVk4GuNuRS6q97YcYSABuUQ4dh1nDtBM7rAZyGBefF3%2FGD%2BApyIaAIx9pSFrfvydO%2FYJZR9y1PHVTaksfwWimCU1piV9fhnkhvzWgFCNYD2KjQv15a0spgtFhdQZhx2Ns23cgodKnHqBNheG%2FpZfXYrGTrSqKOHU8EiQkN5eizKB%2BhqAKEAkvmGoIIahryipMH8nx87O1S4g2g8ziqiz78s3NdTqHsDK3hgClU9FKJ7M7L5y35L0j%2BAnXzKNj1wd04N57z096cFZhVoiyxwkwpImUzwY6pgGaFncHvdjxPhhNoEYuZqRzlBAFw8cEkagADvFRbGO7g1314IYxRykXE5lqJv4XmCWEyfGVk3hQ87E3CvdyWxqLBXrkiHRseDt3yJCHsMDW1HMtHDKMygfee4UYP00zr%2FM93SxDE5O%2BieotQIfijajLT9oJUr28fWWWKore27PeBVj6wnEDJk28Qup%2FIX3TZ1LZrRDAXYI2vpVGROXyGGmV62O%2BjWOZ&X-Amz-Signature=7d9714d2f918400e82ea0421229cee7141155db6eb4f5ee7d1fef1499580be81&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466URZWA7UZ%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182852Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJHMEUCIQCd98vN56k7%2B%2B8hkgSUsUCvbFA9GdgzlpG26qCM76pSAwIgBjOiLCmjm8ti6iAn%2BJkC01%2BB270VhLCSZnsXQM10piQq%2FwMIChAAGgw2Mzc0MjMxODM4MDUiDJzxLv4DPa447nS80SrcA%2BuJx9chP3N0OonK7sztG3YfqluosdZn7d1faSI0FTyGzHAYyVd3%2FZPEcOX%2BxtZ%2FfacTPBB1oDClb8MmEZdViGQ3sowI8JV3A6%2FhEmGTLcRrPd80ZQ9gQtm4lM3dKlhVJjDvJPQQ%2B4Z6qXryY%2B4XygSavhDBf8lymsHao45mbUkQbPTcf74wilgomYAeFJyqqPvbIEvAV0zhI%2BfGyWzmVAazoc2S8XZ90b%2FFp8wsZ2nOpb51DeyHGb%2BbwVgz8qNwYxMtCyqr8YIyvIr84JPtQBXZsnmJ2wbdiH3AeC5D9XjG41UUzJhQlsyB4lp%2BBZoKu9tKRL5wYDFctFk%2FgPD%2BXeO%2BSdgAxF4qYAIRoX34MGhbyhVfY48M9I%2BwipRickin%2Bk6WJW7RQhP%2FE9oSxPDSVGz1bouKOTgog4bdXqbz8TMZS4bxOVwhG2CIbzzw4ESGVgL2CtKtQ1zLk0tLWiMmpeGnM1UL%2FJmMutOotb7j%2Bu6Jyg8wrR4ZWm2ECUVvpFWj%2BK%2FSDk4j1SDRZ8kUlX0gJY7QsktcRjxrTvW8bCt87Q5O8lXEnflbkwiBvWr%2F49qM7okz9Krsdm8TTxvfyRxNjTivQEa3aGBHHK%2FOZzMasWAzcCHoKvj8Dq3kCpsuMPeKlM8GOqUBI3JpGF51wmG9WuHG7jOHYyl1yhpg8DOOiUE7EjESgFT%2FWUtUCh2h%2BISqWlKiRsi039oHbTXKmd11COiMNRCE4KBbMmcEZR26L6Vl%2Fn6m4mgcma%2BF1yvQ2mlTXJ7w1%2FdO1a6hB68RxHUQCnPhD3ZW%2BFU2WOnzcigaONAaBoLDhfLoux3Zu5gViOjJ70Ej0L2HU3yKfUD2fGi5%2FyitIXuFDTBvDch4&X-Amz-Signature=a8690fa0b1efc6890418392d1ef39d97d4d95254f079c8dd7e3543359b11e35e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WZHVF53%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDEw1RuH83sm1wE7w1Z4GrrPbyy04TUduRBrG%2B3HY7h0gIhAMEn2oMM8S9NSHNcye2hbRNi7%2BXzVBRaTpOKhEaMmgh3Kv8DCAoQABoMNjM3NDIzMTgzODA1IgykhJquenNZiVdsN0sq3AMBK%2BpRm1fLxzZaUkjUWx0bWEqLx3h8Ev9Wl9btl1udjl%2BN68NPL9j6GMRg1BrGOlugRjuETzcpvI%2BT%2FcdxaocVE4%2BrZaQMlTM72GbxxjgSCo%2BSgrPygm5TqR%2FvyW1aN4t76zJf0d8QcV5maTCSZPVGx4dp4aYtW7o0GdgSXrUBuXahdWFL3Y6HUYwI6dJTenOl%2FfvbUmO5np0bV4ypuAZJkJov5upQyMW5RBIIs568CgdOFRczcl%2FUsT3DDBJsy26F%2BsC0PLBSOh9nh5oFPxxWOfe210sGaWeXhY5DiQxds5SHVvolRpIChrtiU0LoiAtDa%2BYgWqZDeFF86EpRj0JoVEUQfXlgcm7oiRiXno3urySghqKH6SZ1EtNGdtXuhZFmF1YAxSTiKIFIBRJ6pZZ5sGUvde7DTZ5KAn1yTiSNYQEy1%2FL5nAhbShmCCVf3UwvVz%2FrNNUn6i%2Fk6GTP27p0239VVwBpWMdoq%2F%2F47P1XhYYkuuOVvQw%2FzmLwV%2FaqBD92rwEpkrdscJdIlM94Q8Jmi8cS7xdd%2BxDQDeVB3bSCbWI03Sf%2BGGCqzVeH16d5RdMIoSrdXwxmufiJvKWzYsT2D9S7Mie26XBbFkdcBh8pIls6uUnpXjYvjDpkOzTCqiZTPBjqkASkSAUpJsN6zSBUczlevRmE9jQVd3f8V7Z61tmSa42m4ahsff%2F%2F8qEMQSohsqW970uEjHDKHAnHquBiNeKYsTwGybPwGSP6GtI4gFVH%2BdUI7qcCkR55LyiGoHrXZOopW5fvU25XtEbV2EF5TrzJCnoRiiv7BULfYWpD5WIPD7%2F%2B8vH3XfSZq6trKQqwK5CS06vsfNss8ZebL3UWzovenYAzHPWCW&X-Amz-Signature=66bb5448c0ab70c51e7c27a858f0eda70a956392f5ac079264a8f4e6ed1ea6b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WZHVF53%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJIMEYCIQDEw1RuH83sm1wE7w1Z4GrrPbyy04TUduRBrG%2B3HY7h0gIhAMEn2oMM8S9NSHNcye2hbRNi7%2BXzVBRaTpOKhEaMmgh3Kv8DCAoQABoMNjM3NDIzMTgzODA1IgykhJquenNZiVdsN0sq3AMBK%2BpRm1fLxzZaUkjUWx0bWEqLx3h8Ev9Wl9btl1udjl%2BN68NPL9j6GMRg1BrGOlugRjuETzcpvI%2BT%2FcdxaocVE4%2BrZaQMlTM72GbxxjgSCo%2BSgrPygm5TqR%2FvyW1aN4t76zJf0d8QcV5maTCSZPVGx4dp4aYtW7o0GdgSXrUBuXahdWFL3Y6HUYwI6dJTenOl%2FfvbUmO5np0bV4ypuAZJkJov5upQyMW5RBIIs568CgdOFRczcl%2FUsT3DDBJsy26F%2BsC0PLBSOh9nh5oFPxxWOfe210sGaWeXhY5DiQxds5SHVvolRpIChrtiU0LoiAtDa%2BYgWqZDeFF86EpRj0JoVEUQfXlgcm7oiRiXno3urySghqKH6SZ1EtNGdtXuhZFmF1YAxSTiKIFIBRJ6pZZ5sGUvde7DTZ5KAn1yTiSNYQEy1%2FL5nAhbShmCCVf3UwvVz%2FrNNUn6i%2Fk6GTP27p0239VVwBpWMdoq%2F%2F47P1XhYYkuuOVvQw%2FzmLwV%2FaqBD92rwEpkrdscJdIlM94Q8Jmi8cS7xdd%2BxDQDeVB3bSCbWI03Sf%2BGGCqzVeH16d5RdMIoSrdXwxmufiJvKWzYsT2D9S7Mie26XBbFkdcBh8pIls6uUnpXjYvjDpkOzTCqiZTPBjqkASkSAUpJsN6zSBUczlevRmE9jQVd3f8V7Z61tmSa42m4ahsff%2F%2F8qEMQSohsqW970uEjHDKHAnHquBiNeKYsTwGybPwGSP6GtI4gFVH%2BdUI7qcCkR55LyiGoHrXZOopW5fvU25XtEbV2EF5TrzJCnoRiiv7BULfYWpD5WIPD7%2F%2B8vH3XfSZq6trKQqwK5CS06vsfNss8ZebL3UWzovenYAzHPWCW&X-Amz-Signature=66bb5448c0ab70c51e7c27a858f0eda70a956392f5ac079264a8f4e6ed1ea6b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YX565U3P%2F20260419%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260419T182857Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEEEaCXVzLXdlc3QtMiJGMEQCIDJ3UPYSEBrsz5fbEtCESAJclwz9Ouv0Ifs8NexiUOfMAiAgIX4L%2FiUp8V5Mw3dbYL6wEvKKf3sQKVQ2sclB%2B1N5Kir%2FAwgKEAAaDDYzNzQyMzE4MzgwNSIMz0FwGsuiiHNlvpkbKtwD4z9WnkzNvdRzE55je9c6xpxpeQ46T1F30qglLZbcizfy1%2Bg%2FmuCOdo0qLSal%2FtLBKn62sGh3l43K2kdhGQhMC%2F3L0Hl2B7ido2IryIWOpVl%2FExImGcYw9Vg9jPUdWI3lV7R%2Bv%2B0NRSwaopPHPgmkgs33TWTzOAIvDYN2mEsUwdJF1Bw6x8Ul4lY55YHsX1jwr9XG%2ByUeyKCH%2B7iS3PB13ct78A8NZ4qt2rBDYB6qigHC8J18DW%2F%2Fu4f6l%2BNjThCjPhZZwKzD9f5NMMQrAqyQvZR9ceXyO5AZB5SVXB3S9bb935QBRfj%2BlW5ad%2Fm6n2kTT2cekRRb9y2Jum7blXaHn3NyllmpRQaPwQctz0ZtVbv6n7QawPVPCy5rHS5CH3gjdF5CM6Uw6sLHruNAZ00mdWR%2BoUmPUYXr%2BbV2ABisLbZNOaGzP8sAHkKFXUV950WUY%2FckpCvl1wbOTB%2FaCrCQmllbb0jlL075mC6resfAO%2Frh8umlHzFhdLzCIN5Je6mkI7lF4TsZfUfyFa7O%2FqCaDUG5lsdSM85f3QzP15YqEn8v7bLYq7Ybf3h77F1Mx0IlrwPcoX7fHM3EekqJfrxV5eB%2F4YoVJirBBVR%2FhtvizWJ9EWIEYY0k4mG74GkwqomUzwY6pgH6h5pveW%2FbOycyFajwRhZI3ZGK05T9PyT6a6VgGfqMPwOVSrbT7d%2B4fsGMBwjFwcuyEOmLUoWp3%2Fe5UXvdtnZlfrGSDry9pWQxZz%2F52ng9O4yl3b%2BJHy8%2BJGsQvk%2BkXF5PBWyUNCr8wZ%2BUkX4vH%2BwLeIRn4Po8VlaAjvgYF7abCE5VgqHFkrSNfgsilNs0RxsaGxHrgAnHAdeYuxVOStBcGFCQzChA&X-Amz-Signature=0394798f6e17795f5afced0cbc6ef20e1bbb68fe66aecfdda694df4b817820f3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

