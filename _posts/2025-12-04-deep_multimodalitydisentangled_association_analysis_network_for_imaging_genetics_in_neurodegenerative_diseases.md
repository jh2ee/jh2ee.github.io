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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBMUCQ7Q%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIB6B1W1T0djUTHb5SoZovRBd7DfXRTqYoFYu5wRJiD7HAiApi7u%2FaigZKKTfFRLLaHQb1Th7cDDgUKvX9sPXTFOI5ir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMNYB4FbcWnC16ahZiKtwDT5r757n6XLdjLzJT07AFR3kgGCv%2Bvjc4PNIukWMpvEIg6hmhZrqq2NE55FXaXYo3%2B%2FJgiYff0a%2Bu7l0xvAFWaUh4y7i%2Bd6FWZMkfHMfQ1nZR87yOQYoU015Vi2%2BSA2UxHijxwCuHFKwdpa0h9B93RsqUULlMcoTV%2B9WtmoABC6N9VKIJ2QqDSMB7M3oU%2FxdeAjQPH6PduQ3roVRDLOKd3s%2ByP%2F7fsIHucjFMKrcL6ec8gIINiqJqOWjJ51b4dzEkW8hoAfP8gYLSuy1OHc0GgNlRgI15600qUG%2BI9JjmHyDECvIbtl0HRfSA0vfzls3HbB8k8q3ZW%2BEiNqManKDi51ylWcgHanahIcuJi%2FrREMlKUfR65nWXuKEtXmLe2PKeJB6AphkEIkcxqLzq%2BGYjha3wbZN7f2DAWmGZLCguv6%2F6Z%2FenvKg4bB62yFJHxTgSnZBjfL4gUzs69WF0muQX0GeoGksZqvpCIZiW3tOcAYTO0Lat9E4Q7sL4ai%2FTgjZhVCxB4jwR9ITweYC7vAzeUEoWkrPGMlRropCpI5lJCew2q0GTLASGultYq93PeQcRC7i%2Fgy8OLzFWGcO1wvPcyYR%2F6fcro18uytOtE2vI%2FEv5sAYzNbTHRA%2BiX4Ew8Zi8zQY6pgFClsGjMBgHBPTTiqGCf5%2BZeCsya9Rw0YSfMoRgKi8UqY%2BaRKbzI0Wj5iORKcV6KTb%2BEwHmZf1wKnXyX9UrUCr7Oeqf1YfPNuZ8a6%2BsyBJgAXxC9SnF9fs%2F0pzEs11vCOZwn79GZvVFeBW2GqL6qoUV%2B29XuqljiwEgaGCBrXPGAqF%2FTAICkJGdmgAHhjkKNWcowR3F6R1AIPLn3O3VeiJGeDA11IQu&X-Amz-Signature=9b8bf47cdca73cc03f0faf7f11e9d4a807d4d8558ab0385e3a91161413feb459&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBMUCQ7Q%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIB6B1W1T0djUTHb5SoZovRBd7DfXRTqYoFYu5wRJiD7HAiApi7u%2FaigZKKTfFRLLaHQb1Th7cDDgUKvX9sPXTFOI5ir%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMNYB4FbcWnC16ahZiKtwDT5r757n6XLdjLzJT07AFR3kgGCv%2Bvjc4PNIukWMpvEIg6hmhZrqq2NE55FXaXYo3%2B%2FJgiYff0a%2Bu7l0xvAFWaUh4y7i%2Bd6FWZMkfHMfQ1nZR87yOQYoU015Vi2%2BSA2UxHijxwCuHFKwdpa0h9B93RsqUULlMcoTV%2B9WtmoABC6N9VKIJ2QqDSMB7M3oU%2FxdeAjQPH6PduQ3roVRDLOKd3s%2ByP%2F7fsIHucjFMKrcL6ec8gIINiqJqOWjJ51b4dzEkW8hoAfP8gYLSuy1OHc0GgNlRgI15600qUG%2BI9JjmHyDECvIbtl0HRfSA0vfzls3HbB8k8q3ZW%2BEiNqManKDi51ylWcgHanahIcuJi%2FrREMlKUfR65nWXuKEtXmLe2PKeJB6AphkEIkcxqLzq%2BGYjha3wbZN7f2DAWmGZLCguv6%2F6Z%2FenvKg4bB62yFJHxTgSnZBjfL4gUzs69WF0muQX0GeoGksZqvpCIZiW3tOcAYTO0Lat9E4Q7sL4ai%2FTgjZhVCxB4jwR9ITweYC7vAzeUEoWkrPGMlRropCpI5lJCew2q0GTLASGultYq93PeQcRC7i%2Fgy8OLzFWGcO1wvPcyYR%2F6fcro18uytOtE2vI%2FEv5sAYzNbTHRA%2BiX4Ew8Zi8zQY6pgFClsGjMBgHBPTTiqGCf5%2BZeCsya9Rw0YSfMoRgKi8UqY%2BaRKbzI0Wj5iORKcV6KTb%2BEwHmZf1wKnXyX9UrUCr7Oeqf1YfPNuZ8a6%2BsyBJgAXxC9SnF9fs%2F0pzEs11vCOZwn79GZvVFeBW2GqL6qoUV%2B29XuqljiwEgaGCBrXPGAqF%2FTAICkJGdmgAHhjkKNWcowR3F6R1AIPLn3O3VeiJGeDA11IQu&X-Amz-Signature=9b8bf47cdca73cc03f0faf7f11e9d4a807d4d8558ab0385e3a91161413feb459&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XP7ZQXG4%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193050Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIEF7c5vHQeFbToOiyjW2f7RjqQAsk0iDU8mqs%2BHmzGEiAiA%2Fm0z349ob%2B7KLiffmvODih4D8iMrt7O5OIFwTwhxPnSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMXkZqecM76BTu%2Bf2aKtwD2VSNuAm4VrWXKaVxQm2SBBIJNevyZAYOwc4eKVivBRAYdmuTgydM25PLY9QAMDTIIkFYMtaJ5lb8elkCQvFUYLthM%2FK9qNyMXWJTpufz5xXVHBIhhdCH8uo5n9fkwkSRLYuaejtglTlg2q%2FL%2B7C6azoDVG1cLg2agTmXIG5VBTmo8WDPNVJsmCwRhY1yxMbnwWhcUVaAu123RUDHdAOyPQj3vz5ct7y7DcDv0YU82w%2BiKYovNlHs7n9ViqZtoIpHjMnZ8wFS1HPHrfub3lUtlK1UReiJsFgHIqnVKwwydIIXpWJ1%2BuhHPb1ytK%2BJAssFUniJK7Pm9xGHKbfq621Q6yPCEUqaco8bjBgl7GtXXU17sgk4xsQzkUIVoelDPvmrzsY3RNT9YQ4sMG76dvO%2Fzqes5Xe4PXFZyPI%2Fr8hcab%2BZ2jSG%2FxmTejwek3jqoMshPEj84BtfuUBcj1QVporr7gog3m3UoOr3W2Jj5iTcBqLLKOcXjjdXxpmzyzFIGJfdmXRvIgQ7VJf0Q7Ow%2BLK0Glf0%2B4Za8KJW%2F8S2A9fihLvonhnsj91dVQn1wst2vx6XTZ38lnWPRukDQ%2FMB5cT%2B1K54y97LUYgVvK1EL8as7DDGj7RHq3texlfhjGcw1pq8zQY6pgFYna4nBvUL%2B9DGinm1wyBIVPiHxLXGpBO3jz2lxAbCayeAz2yYdtqYKkeSzA3v6blTzchM58W5qSAuvapqCVNlf7vm6cNpmeWTUByra8HChue9Q6Wi6luK9VHIY6AI3wvJ%2F00Wh%2FjJedbmOg4O8t%2BtcBBhjO8jwQgd%2BaaeT7qaHMMYB1dC34r5ZGQHWcky%2BjNsq7jutdPpupGzN0o4MK86NNOuotqE&X-Amz-Signature=f4216a03ba46122cb05c3ce3e5129149c0debf8ad07dd7ce9272bdf8ab3703d8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEUVQ3PR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDebU7%2FZJFF3YnQyDiQSbV7TstsJ1nN0GkHTzre0%2B52KQIgHNqc%2FssiujzVgE2tw4raRSWM6vLN7H%2B2AWO6%2FbpCf6Iq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGLEGZfkZeizbS2QMSrcA5ctjC6KjLvZnr7j3MYcQ78T1sKy31vy085WMT4ZrCO6csom8ZzVV6UaGNt4WzrsC18Ey2UfuNKdhRoRqMowG8MSFKMT04AHgZQsdeRKrJMgXQRJiVJXtZBBC8GJAf2h%2BP510aCZm6sGIuCoKc9gyPJ77Sn%2FTZlcDHch21o%2BCff8%2B4REjzEPCXNdFui7GxlH4gIm5QzgX2kWKZxGaon55F6xi7py7xtmmgXA5tPQXsrSALAX%2Bm2ks0GORuCl3qx5MZYik2JOe2sygZQr4WJzmU3zaugJNc%2FOaoVmjXlUiOBJDhgSq4eUHFpVcZ7RBJ3t4UTnv%2BNU4OtkzJcrdEV7qImiu0nuli5m4uvy%2BQtXugw2vqIlJ5sQ3c2oTjHV0DwwblpSIkqE9E2I0h3%2BPX1Y0L%2B3Qqmn9UG7PUItR70wIJf4hCrKEiJMaTxxag7pnQMDm4YbtkcXCBymS7pRzM2B%2FhhfmqK7kv71ZIKQBvHgGJCL2sMLvG0UUirserbxqm1CY9s6u3C5AQSJkmTgK1gwuhO84LopCCfVXl1nueFEZHBO5EUJNCW862a%2BudG6twu2mE6%2BQhX7hpE0ySSeMVBdycyqjJzkSu8yb7My4NNC18OInPKw2Zr2A8yaYD%2FNMLqZvM0GOqUB%2BWOplB2q01coHyNrrWc633Y7ep4sNKNi%2Fi6YA%2FE1rtKYiwBb9ZOIQisYOtY2fhb8aE60I76onapUczKi4VeJBKsQSuSY8WeGF4LwuSlpc%2B22tr5HnHGY2kf5kybkLiwB%2B09b2BbdGdnIoPR151lyuHvIBIx1O6YYAVAcMR%2F%2Fari%2BCpxvo6n8lnU8wXO%2BbgWNb%2BeTiW7%2FsqHzpUMoIBM0oPPa8y6b&X-Amz-Signature=6bbe003c5cb34b4bb2fe69c8b9eb10d0fe50d9922ac15d02e6c39a3ada3f3a22&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VEUVQ3PR%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193051Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQDebU7%2FZJFF3YnQyDiQSbV7TstsJ1nN0GkHTzre0%2B52KQIgHNqc%2FssiujzVgE2tw4raRSWM6vLN7H%2B2AWO6%2FbpCf6Iq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDGLEGZfkZeizbS2QMSrcA5ctjC6KjLvZnr7j3MYcQ78T1sKy31vy085WMT4ZrCO6csom8ZzVV6UaGNt4WzrsC18Ey2UfuNKdhRoRqMowG8MSFKMT04AHgZQsdeRKrJMgXQRJiVJXtZBBC8GJAf2h%2BP510aCZm6sGIuCoKc9gyPJ77Sn%2FTZlcDHch21o%2BCff8%2B4REjzEPCXNdFui7GxlH4gIm5QzgX2kWKZxGaon55F6xi7py7xtmmgXA5tPQXsrSALAX%2Bm2ks0GORuCl3qx5MZYik2JOe2sygZQr4WJzmU3zaugJNc%2FOaoVmjXlUiOBJDhgSq4eUHFpVcZ7RBJ3t4UTnv%2BNU4OtkzJcrdEV7qImiu0nuli5m4uvy%2BQtXugw2vqIlJ5sQ3c2oTjHV0DwwblpSIkqE9E2I0h3%2BPX1Y0L%2B3Qqmn9UG7PUItR70wIJf4hCrKEiJMaTxxag7pnQMDm4YbtkcXCBymS7pRzM2B%2FhhfmqK7kv71ZIKQBvHgGJCL2sMLvG0UUirserbxqm1CY9s6u3C5AQSJkmTgK1gwuhO84LopCCfVXl1nueFEZHBO5EUJNCW862a%2BudG6twu2mE6%2BQhX7hpE0ySSeMVBdycyqjJzkSu8yb7My4NNC18OInPKw2Zr2A8yaYD%2FNMLqZvM0GOqUB%2BWOplB2q01coHyNrrWc633Y7ep4sNKNi%2Fi6YA%2FE1rtKYiwBb9ZOIQisYOtY2fhb8aE60I76onapUczKi4VeJBKsQSuSY8WeGF4LwuSlpc%2B22tr5HnHGY2kf5kybkLiwB%2B09b2BbdGdnIoPR151lyuHvIBIx1O6YYAVAcMR%2F%2Fari%2BCpxvo6n8lnU8wXO%2BbgWNb%2BeTiW7%2FsqHzpUMoIBM0oPPa8y6b&X-Amz-Signature=68103e28923a677854f4f5fd524086397e02e0822b992361bab694f531afb6b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664WMW3UEV%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193052Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIQC3806GlOVz%2F90WH%2FNwXFXQh4DKOwdjtkxU7p%2BZCqCSsQIgLLLuPn9U5ARzDEZwFdUY2PcrkPiWWcey73bzAOGrN8oq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDFjGTDyiDLBXvVsUzSrcAzmVerPPps8kSsBb6bBT8kpru0PXt3L%2BVKzMZX8x5m8oFP%2Bc0hzwY2gIWS0lCxdp3%2FNnejt5fIhdIT6BAUSygvWULNd3wO6k6Ji0jum4z6XRHChIpKIMzS0934DEat9yCdi3agSbvOv44k3%2BIrU%2FUkOKTgovimcAL18FNjLjuXTTh%2FVma2INzOfsHGzfusvFUrSzXWS3UmSGZWY0QS9EI0D4DT6UtgoT1nn2ejgcdNexS8pn%2B16KD%2BTaxx0hQWbh4uIuKrhfV5U%2F7p%2Fwin4UCyh%2BHmJ4JV5mxqblqRzoKfyHXnZqxNJIHVZFF3585AF5Lpl1a6bIE3cvofUa%2Fhj8G3I0yvija49CmJM1dXYZY4jHDWu92vLiw81kN%2F79ju2DsjXzawamtmUHhTw9MceK3fSna2L7%2F5wbAdJgIdZFPj6ZnFigU%2FqFVnU3I5IkyI5W%2BwJOfGEwJo%2BTk9cxEAa029x4bYq1BXgTGhjCcZ38sa7ko%2FcO4vXACej1xZSAHEegwMVvPib2tdgCPgFN5mOEuUp93HJf79fsvisvW5rbGoj8eoxnb40zJMrsId%2Ftn9XMAY3oYDi8yUgmeE47W269en%2BtGW%2F7g8lB2mNXigjLueKFNOuG8%2BceBSHfQkXGMKKavM0GOqUBDNWRDpE88ZY3IXMWN7UxEX661%2Fpv6FcFQajwJYJdupqp%2Fiw3d3kZ5MlrL%2FOdFOdStTYu1LOMmiTve1ijoU6%2FAgFGGOBTydNbTx%2FH6MTkzIORF%2Ff29JNgJdXlN6KoLFe%2FYa15oxBbK1viM7U2lXVsRTYQRCO4lixCllIRRNsm0ZtCOMb7e6BW75QHvfPMRNXfwp69h%2BnjwlDBf1FVYLF%2BIZm06KM6&X-Amz-Signature=dcd8638e8ab593836f07b396556580c200ecb7b1ab2ab0edca7d0bed86355033&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664F5JQF62%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193102Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIBs7gPHnB%2BfWij8fnsSyjHTopprCfZJ91%2BrTbzB0HIGaAiEAqpRjL612ktb%2F%2F9qUlv0%2BZZ%2BFgp4%2FSQknfbleNQWE%2Fmoq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDG71DYQRrcSFOl1SCircAwX5%2B9jLwclg58vrCyt2vAt43IVmOPXK6Gc%2FrBx%2BhT%2FZMIjKAAz9y7OA6AFjWP%2BncRyXdwa5wxCZ%2FpaQr8x7gMNiV8ppv9RgD97PTf44f6PJXi67pHW2wPgXK56HhdNtSitj5rXvIezk6HLMbHpJLWAkYMQpBtK0nn8aZ5bnYCZIgJ%2B%2BOviyUVHAENHh3ylpTVBfo1SpaRKdTacH%2BdKIBtVF4rJN%2FMA4Oa4RKPGI2wxBbREUary3XS1c%2FOH%2FrMtHiCWx7b4FtyFXrHAYc6R6AAuhgmYuamBmBJlKBy02rwjOhV%2BepQhkQPMCKjJfzDWSeQxyQFJpf0%2BWDGdOmQIAG6vPRrGiOE3ogwvjiX3EMYJu%2BcBQuJOdcEzOuz%2F0vmqMY3porZCPgcCYLAJMxaVvcanuDBIkv4hTLmHAYz7X00AZry6LznvSlHuaIeSMlcgRmK%2BfEqJhGMjj6Ao40EIHIpci7M%2BiorxTP9Oaly4kSDNVl6%2Btk4dSgtmxJTOjyM52%2BOWA2rnOdE%2BbFPa48EhhJGnfv5Mk73ldz4%2FWc7p4L0Y7zbK3kx%2B7tdpjKpJRbFzMGKaBVfoM%2F%2BLVoz08vSQSOaFOTNpI5s8D6bQUpvzLWVEJKFPa%2BoPETHR23dyZMMWavM0GOqUBCCm4rDb%2BwIICOyYKXzvaVQBTzvx8LovJyKTNqEUs3LQPp22yWBMc6kjlwAOr9xbCeRdEDLa1VrKqzMBeB4%2FbbD%2BVJH%2FftJHaT7hbZ%2FKPvcoToowpfVfnTN33U8wk8%2Bh%2BRpOEhuj%2B98S73Mwh6nMNl6aYyF%2B9SF%2FmNc8fSWgnfIK383beUHJzFJNcXTg5rT1ymuoI85qX%2FjtuuCePlXMOHcPkUc11&X-Amz-Signature=3401a6c14e68548b92d21285e63d7c726bbbc8230b6bb245abf678e748a91404&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662JTJCE46%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193106Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGsaCXVzLXdlc3QtMiJIMEYCIQCXy01j0v%2BxFcAHh2gV3hc%2FNKBoLW3HmJnhhkuYNqpdcAIhAMa8olLzVJssle5eYHtu6OY2hHGcCR211S8dATGN06bBKv8DCDQQABoMNjM3NDIzMTgzODA1IgzVBinM%2FRoEkZgSxCkq3AOWBFDNm0XQhA0dWHbqg28jDfnUdiU4KIO61LtV02ZA9QTYII1g%2BaagG9p%2FVdPPGPwxnE3nIQkrYbVfMHriKxznnYR6q8xAzCxlHfg%2FpebzVkXTiniC2WgkzqJceK%2Fznrt4%2BByPSVpbjImto%2FYaLIcgBP%2BJVeClH9VS4ql7bHh7aU1r39ORIwuZVWhoU%2Fxa9M%2BDLzuZmirr4RscSq49c5JQqHHzT5FJc1KEHVgHvs9v8T8o89ePTnLgQo7Vja4DRhZp7qDensC2AvCSt0b9EJ%2FT9aKY8jvNUmKIM00oLV%2BZsJ5PRUluck6v2bl04YyIldd%2Fj41JY1AZp5P1axdo0mUxAxYFy3walH2X5ycDgdtNBkhsmStSE5OPGGonZe2h021OWeopbruuu79%2BTmzQCuMgH7IsUyl%2BmQP1pUS2gEQiRLHVRMd8v4iKNjYKI8b2EDWhU5itjr6IrBu6chq3E0%2FIhoaow8vti5cTML9n%2FCKiM6YSbxtfjWNI%2F%2BDSP0KJnOrEGh29V7qto5M56pD2%2Fc6o0K%2FAqyQKs547PV0bdBEn1yfQFtTaRlBM81yZB9Ce2eRw1acd3xdPCcJuvGJGZyD9F4vXRlUjf5wfhFt4quFg49sETiP1wldxJheb3zD4sLzNBjqkAfBisV%2BGWD8yL2juODEIdeHh4LJMGAcU7URDFlmNH8o64gjvYUolUGmJ4GOd3xPolUbr%2BDacOTvC56QdOk%2Fw3yP6vUS30VhcPY5U6RVIh%2FnwE%2FNJVFjD0OPlT01MZCQ7WzyqhvK95NVFJcnDj6JiUHMD6Orw4LNTZVyIvbGmu6LyvD1jubNnsO95RUetN%2F1Gm7yTfpk3QR33KS%2B7WKNmv81V%2FqGj&X-Amz-Signature=2ca1a22ec916d4a5b71989b19fe655dbf283824af2a41c174beb187c61be76f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EGGTG26%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD4Q8p%2ByDBwcI%2FPxlueRGMJ8YrURxFWOQptOHfGz2R4nwIhAJls%2Fd8WREKmcR4s6wWbmh87SMpVdk4Iis2O53%2F0l7C4Kv8DCDMQABoMNjM3NDIzMTgzODA1IgxSusBs9mwsXXVJ6uEq3AMzo1cnycYdlGSXTQecz5S8wZ0Zm75TTUlTuPA0gLU%2FUo1arHSuN114m%2B5pgFn4LF9Qr2VxYOTUsYkUfD4vMAzPV3wRk4vh14j9k3HyxH4QUm%2Bg1TU3ETFZT5mPOS0ONsu0Glx4l%2FCr6EFvlF06oibIKbOcKAFtucmTMlGS3XcYNbo7s%2BrjVQ%2FPoGArBMgwhLGxGqG8sA8Lb69I8DQ0KnYtmXsB7LapfR2phnMg0VgHKbuPSeaaoVbkRGCcJKWYhUPvRALDO5U6%2B%2BFpl56UmoQlH%2FoPoMTSi6j%2FdB7LWl3xBe4i68I3uF3O9wHbnQdYrIUzh2xU4xbE0KkKuR4V4SYHAsyii9nokx58YZBw12VcwOMbvYMO2ULvJdyEbDC8O0Rtgon6neabAn5GEASeKa08bDK%2BtYCmoT1HE7bxrBmBsoAJF4%2FDTqy3sAXUpcEAMPARckrNlg3tiuEJx%2Bmsxf5Su2l%2BhyfXlkXfokm3fBIi75wpFyA1%2Fqmo%2BNCeCvam2SA1KjhNp0Ih1cA%2FlrUk2%2Bn4B3thUxYsXvsXve1E%2B4g1wL%2FpziKEwtKozWfsMduEVQ%2BzhHQhlpwDSUn7AzNDTti2rDz4H36r1oWEv1ARaQ6jxfrKAEb9Ed3H8hSgUzD5mrzNBjqkASUdGQ4v8mRRb9BY5rXZ9a9iLB3TVZ229xiICyosCLL1HezeNQZzFZ6C30pvW9cwa8i9B9pCsoYR28pG1KHlEzmseN5eHwkV1cfSC4OWoiULeHLAFLStT6ecwOuxDwm9SNDNeMSeUTXQciwiDYfgLTUDlr7hIN%2BysnVHQt%2FGCe3gn3P%2FM8qE6kSq3sJQvp3zfvLhU3%2Fm12CmVzpB%2F8JlanXLXLSw&X-Amz-Signature=bb44ceb6cf20665a6f28e4f86a19ad0f5054fd790ccf8449d5cedd5304def613&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EGGTG26%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193110Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQD4Q8p%2ByDBwcI%2FPxlueRGMJ8YrURxFWOQptOHfGz2R4nwIhAJls%2Fd8WREKmcR4s6wWbmh87SMpVdk4Iis2O53%2F0l7C4Kv8DCDMQABoMNjM3NDIzMTgzODA1IgxSusBs9mwsXXVJ6uEq3AMzo1cnycYdlGSXTQecz5S8wZ0Zm75TTUlTuPA0gLU%2FUo1arHSuN114m%2B5pgFn4LF9Qr2VxYOTUsYkUfD4vMAzPV3wRk4vh14j9k3HyxH4QUm%2Bg1TU3ETFZT5mPOS0ONsu0Glx4l%2FCr6EFvlF06oibIKbOcKAFtucmTMlGS3XcYNbo7s%2BrjVQ%2FPoGArBMgwhLGxGqG8sA8Lb69I8DQ0KnYtmXsB7LapfR2phnMg0VgHKbuPSeaaoVbkRGCcJKWYhUPvRALDO5U6%2B%2BFpl56UmoQlH%2FoPoMTSi6j%2FdB7LWl3xBe4i68I3uF3O9wHbnQdYrIUzh2xU4xbE0KkKuR4V4SYHAsyii9nokx58YZBw12VcwOMbvYMO2ULvJdyEbDC8O0Rtgon6neabAn5GEASeKa08bDK%2BtYCmoT1HE7bxrBmBsoAJF4%2FDTqy3sAXUpcEAMPARckrNlg3tiuEJx%2Bmsxf5Su2l%2BhyfXlkXfokm3fBIi75wpFyA1%2Fqmo%2BNCeCvam2SA1KjhNp0Ih1cA%2FlrUk2%2Bn4B3thUxYsXvsXve1E%2B4g1wL%2FpziKEwtKozWfsMduEVQ%2BzhHQhlpwDSUn7AzNDTti2rDz4H36r1oWEv1ARaQ6jxfrKAEb9Ed3H8hSgUzD5mrzNBjqkASUdGQ4v8mRRb9BY5rXZ9a9iLB3TVZ229xiICyosCLL1HezeNQZzFZ6C30pvW9cwa8i9B9pCsoYR28pG1KHlEzmseN5eHwkV1cfSC4OWoiULeHLAFLStT6ecwOuxDwm9SNDNeMSeUTXQciwiDYfgLTUDlr7hIN%2BysnVHQt%2FGCe3gn3P%2FM8qE6kSq3sJQvp3zfvLhU3%2Fm12CmVzpB%2F8JlanXLXLSw&X-Amz-Signature=5deded2819f11f05d77591ceb4e6756cacaf4e85ce48453067554e14b578a14e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SJTPI6ZG%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193047Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJGMEQCIH61fCRwtEyGWREvGGXQ0FJ%2BtrUlp1%2FjNJfwtYArZqX%2FAiAWaFUIW22bvH3v6ulv%2FoIS%2FEYkp%2FzFesZFU%2FM12S9SfSr%2FAwgzEAAaDDYzNzQyMzE4MzgwNSIMzjZSbds2TrLLpyuaKtwDoeOXL%2F2TTKcpIP13NG0OueOpToa2ET6Ha8RhSFq6fMotKMZFVobmgIt0evBInsOKktFc6MNyT3ahgoF08rnr1xOR8mFDQB8%2BIRzy5agNoSnVRWUJWhIpZcvqoN2jp1yxMieUGlQKMmuF7Zd%2BiFdYc2t3iacOlh4b0%2Br%2BGJV8SAJypQvIgJ72MfkHgUxgBG2QAWZGrjzw8dqE%2BgjXF7R0S8D6UvP74%2F7T72noGGwWkiWmgqQYVXqy1cOPhLPLjGqlJMZWxXMeHNU5mgsZ%2FacYc%2BpYRM7QRANx8NyS9SvleHjnWcmjyRZ887AKDK9Rdwl52Y3Sh7n3DLOBKZrNOjHCk8Sv%2B1lJt8nwmIUH0i5rQgc1KCyErMOHTvj6MNrqeWFnAdoXTBkQfYmicL5aow5mau%2BAb6QWcYOel1O5XWuig7QsEAYl0XibTCZpOgCizaa6aSYXEFiE0MJko9VWQ%2Fm%2BIX0hFHE5q%2Bv9XSPjJDL5sdqYPAndi5Hj4jFPQSaGZX%2FH5fPDU0L2%2BA0rmQiQ%2BliUeQdtkunNiVO6yrbfWA0b5gdELSGJmalTcUooFJYicyQUhKDiOgBQGaJilC33wthH9ExIjZYGaKVMEdyWjCIqP1qaq3bdMbTMOzAM3hAwwpq8zQY6pgFmHp3qreWsHr7EE5p5cUusaOTNUUK0zrmenRy9AxYkAbJ3i5Fi5VUuWIN97rYqmSh2p1l8NRXL7uvV5Z2iJs90opTvCvd4dj10xQlQ8aryVbIn4ik6AR0QFTl1OUwBOkX%2BP6Bupctc9dsmn2u2EY7jte2dw1W0BoXIs880r5bJXi%2BJPju9CmZO385XMAk0Qvze9edNE8Ee%2Bh%2B%2FoIncmCED6ytW60OF&X-Amz-Signature=287993668016935513c5585dbe6bc78ae05dc6f16b60c30ab5db6f650bb1601d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WEC7DRU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQC%2FipDzgzrw71TVceIZAC%2BYcIF5WDILAAjBw34bmaykXQIhAIxu6sb1%2Bcokj8BAh6kA4tnylbDG05DIrxb9fa1x5jriKv8DCDMQABoMNjM3NDIzMTgzODA1IgwMild522keC5oWgyMq3AOwYqaPaaYkAgFRrg7FAvN7Ct5gB5%2FKwRcc92Q9afqsejY99hmEZj%2FEc1HEFsIR9tbeUiEv%2FvN0MspAlSH3j05x2C415WQK7D5nEKCkF2sgT8P6jYsRuaiq0GplFajhwThYFg%2BLOmYruhLjD1yobe1YhhFD26ynZ0IIMoB7FjpPZu%2FiXN%2FFjvCQtotPwwwZFt4%2FV3x%2F581sl5R3ZiEcDSCV2SiQ0fNJUmKZWnchfJRm71nJb%2BTpRsOhlAGVtZmX7rvzCmTAnvv%2FRRaKa4DEEG%2BIQAaZCIXQbG6ex7Z3CIa9Pi4M4CNWZi8fpWb17htrwlkcxWQFMvvo26uAxuM7fIPOs2jGE%2B8djKuB%2FU45u82mkGolAZi7wIKuYWFLRB%2Bd3OXFpiXWMTmbFM7SL%2FATDZkVNU9ksHDTRN4IIhscaPEvn5n9U35LJGx%2BiD6ABpGzYxwAsHVlwSenBdWj7bq3WGxLFR4rQpoORRvQ4A7LS053kDop2GLwsUQ3x%2BvSytD2CCf4juTIP0nhVpr3DP231epmGKI3nqnZpCHvJWSq4U5xRHo8lJdLr%2FopP00XYSMGzm4TZOmTjtZ4GdC3WYhlPPzfLux%2FfJ2wGH14Z5pth%2BLiIqb5%2BDD0GNomUFhF5zDwmbzNBjqkAd2kRGzcFyZin%2FIx4K3ok3hscGGkiTkRVHxasoBEcdAXLzOr82oX2V97qB%2FJVGldFOyoc%2Fy0JsItdn9WGQxLstp7kYvfsIAABx80ZgtZVdR7iMI61tTSaOb3qxrFavlNviEDiOQbAiRCPLhfBqEeOah%2Bs5BRVhXcuIy0NWEWhzPO1Men7EkroGYBsfPYs32E5IlENUxCCtyfl8EaKAsxBHGyIvzS&X-Amz-Signature=2a672e6e4ef3ba0ae7bf7e2796e1b4c736aa159c1f780063c17c1f21bb7514d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665WEC7DRU%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193111Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJIMEYCIQC%2FipDzgzrw71TVceIZAC%2BYcIF5WDILAAjBw34bmaykXQIhAIxu6sb1%2Bcokj8BAh6kA4tnylbDG05DIrxb9fa1x5jriKv8DCDMQABoMNjM3NDIzMTgzODA1IgwMild522keC5oWgyMq3AOwYqaPaaYkAgFRrg7FAvN7Ct5gB5%2FKwRcc92Q9afqsejY99hmEZj%2FEc1HEFsIR9tbeUiEv%2FvN0MspAlSH3j05x2C415WQK7D5nEKCkF2sgT8P6jYsRuaiq0GplFajhwThYFg%2BLOmYruhLjD1yobe1YhhFD26ynZ0IIMoB7FjpPZu%2FiXN%2FFjvCQtotPwwwZFt4%2FV3x%2F581sl5R3ZiEcDSCV2SiQ0fNJUmKZWnchfJRm71nJb%2BTpRsOhlAGVtZmX7rvzCmTAnvv%2FRRaKa4DEEG%2BIQAaZCIXQbG6ex7Z3CIa9Pi4M4CNWZi8fpWb17htrwlkcxWQFMvvo26uAxuM7fIPOs2jGE%2B8djKuB%2FU45u82mkGolAZi7wIKuYWFLRB%2Bd3OXFpiXWMTmbFM7SL%2FATDZkVNU9ksHDTRN4IIhscaPEvn5n9U35LJGx%2BiD6ABpGzYxwAsHVlwSenBdWj7bq3WGxLFR4rQpoORRvQ4A7LS053kDop2GLwsUQ3x%2BvSytD2CCf4juTIP0nhVpr3DP231epmGKI3nqnZpCHvJWSq4U5xRHo8lJdLr%2FopP00XYSMGzm4TZOmTjtZ4GdC3WYhlPPzfLux%2FfJ2wGH14Z5pth%2BLiIqb5%2BDD0GNomUFhF5zDwmbzNBjqkAd2kRGzcFyZin%2FIx4K3ok3hscGGkiTkRVHxasoBEcdAXLzOr82oX2V97qB%2FJVGldFOyoc%2Fy0JsItdn9WGQxLstp7kYvfsIAABx80ZgtZVdR7iMI61tTSaOb3qxrFavlNviEDiOQbAiRCPLhfBqEeOah%2Bs5BRVhXcuIy0NWEWhzPO1Men7EkroGYBsfPYs32E5IlENUxCCtyfl8EaKAsxBHGyIvzS&X-Amz-Signature=2a672e6e4ef3ba0ae7bf7e2796e1b4c736aa159c1f780063c17c1f21bb7514d9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664X7LPBYT%2F20260309%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260309T193112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGoaCXVzLXdlc3QtMiJHMEUCIG0AfVHVED%2BRthYaby4w13EfN%2BBO2J0PpdglNjUiyVJ1AiEAgBQiBHhKsXYL1H%2BUP1gNo8xfNKoCbmWUJa0akfhbKIUq%2FwMIMxAAGgw2Mzc0MjMxODM4MDUiDIuVebFuQiVYOtzLFyrcA7rEIOdK2HsVWSJGUQQksI95i3M%2FKpD94teSCsMChM%2F2REUYFxTqeibiK8VnHtMn%2BbmrWrU6WaWzV5YdnDgLq7L%2B6556xMtB0gIg5tEnQHiuzZf9KSTfCEfpN8W7%2B%2F1J0clMYrcgmFP9yrJzAbW0E2gxhxXHPCOIJhHVrRdJGcqOGxKpg24q8VRkC2HaIFzKy76YWqvPwOJpqEWNIdNCKo5VVip8AkeQNnJWfFPjZZ5LVXgu0NDplxjnc57yJ6jPth363GZ8ia%2Bq1HmM94Cv9oicco0lBOh37SZJnqGoyP%2BJRIWR%2F9f9QaJDEOTI3ihiN65xEdhydW4XTAaG29Z%2FpSn07Y0A0gKTI7%2FtTz45TcxLa5L3XgotVyFPjoLeLNMZQIlGXjHQecZ%2FuS1gFO1a2QXH7xY2gRsHbJPdCFVpxBi9G5lCDzG9U8JlTBb8kWdQwuxbwM4klL4X5bpgOM8VsiE37RhjuZHhmvoT2yY8Wcz9%2Bs%2F8yLC%2FINgtsBBCgswfo%2BPxxjAHlvXFa0kNEWjNP6Y0gfOaoFE2RtppsDJncEJq5nT3Ito7ti0Icl4fwZzhrCYC%2F7FGP3EaJ9mj1kX3cKpLFI2UVOLZYPeu82mLK%2BHJY%2Fj%2BLibL9JB8iopZMPmYvM0GOqUB1u3qKY5O%2BnFglZKGrnT64Pq2siCYFgqYvz%2BOXhQD%2FLVQACyNrrCe8DBZLoaaiutmHAEnZMq5MxHrz1eUfvXtT8QnG0eqD8Kp%2FhrhS%2BW9AXtY6Ie1Ss4ZJmOTmDCGbR12SEHwwxYx9aCokkkxbe1D2moXIbj%2BuL8mA7HacZOM27u3NtceIMn8q5La1lPwLw6ac8d6lE97C6woQhx0s80ujmi2a06E&X-Amz-Signature=f6428ecb84fed4a09ab8c7d5cfc4792ba5a37e6bb1d749adf6e98942abbdace4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

