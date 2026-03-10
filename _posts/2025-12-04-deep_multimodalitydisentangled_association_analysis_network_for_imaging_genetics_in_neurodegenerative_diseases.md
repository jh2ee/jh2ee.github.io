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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIGWC4EV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCJOD9eLHx4wVmMewf%2B8t66mkDeSs7z7XN8k0PWNjXscAIgeyZzhs7P4pfLiYZGn31Dvb7vzpo7FEaFOiQZoBsQz98q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDJHgp6Q858LyheycyircA2ZGUsrFJwAnoIKSObfxZods0LEnXx75MlRFFRmzygnn25CKaD4Qnk1Y2yPgEr8AAUptTfN1TSHv35aYbLLP4DbFzTEjayt3Lk3U1Ztugni4LQpgYowrObqJVSQexxTjI0HpoIEXUWuF4viFjTTIK6OWXIRkF68g5A4iMOWRT%2FIz6FOiXoLbH%2BN%2Ba8kChpLWPTf0f57XP%2Fa9zuvaKlDYWccvmxqlRjlZi0xxSPpHFwXs9ufZCytYFAwuVrTe5smwRtgRGfaiWKLOprB8V6qDSqVIz7OKxHz9s%2FAGVXqv%2BnIFG3O4Z9nwXfWKy9qNBzM5OzHEVecHz%2FQbkncPKF8TO3xXbNaQZ0OM%2FpAi2mTHkDmHfBFGnZhphPzd0BLuMe6Evdi%2FIfZKKpSpJ9hMTpYeMlOubfljRVmtRxwcAjH9WYWT0WwpbrialV896HdVliEj46qvgdjxiaIuBr0ojPUvKUMNQ68LTdsGtTclLhCp6yYFhtRCEgfMa49dyJMG84SF5kXp9Jsjpo6WPXtiocy4HvRsy5iD3EI6%2B3jvWPcdx9rJS%2BBSY3uD6u7r2vyGQmJtZPX2dtKJEFEXE7qKcIIy%2B5BkML1Apuur%2BhkFDh0CG2Dt3cX6j6%2B8eYrvK%2FFfMJ%2F1vc0GOqUBcqntemVvH2Tfrifaah9Nlj9pAiGBJsg8EPl3UAzVBtPnYknrNQ5gjI4%2B%2FnGyl49Or%2BdYhtIH9hPPN58S%2BaDwE%2Bk%2BR2a%2Fv0f%2BsuKxVR8cz5hmvVKeWCza5fFsHeQ0wAoxB0OLNVhy5HjCmpP%2BhWsR3dC%2B6%2Fdnnh81XWGkhYmJ8enT4%2FQjYkXtLSVn5jexL0KMeJSqU0T7o90AIYlvajPutxR6EHFx&X-Amz-Signature=a02c07b73069ca0554a9dcde50f690530dc893cd6443bb962917e4f6aaaa2122&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VIGWC4EV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031713Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCJOD9eLHx4wVmMewf%2B8t66mkDeSs7z7XN8k0PWNjXscAIgeyZzhs7P4pfLiYZGn31Dvb7vzpo7FEaFOiQZoBsQz98q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDJHgp6Q858LyheycyircA2ZGUsrFJwAnoIKSObfxZods0LEnXx75MlRFFRmzygnn25CKaD4Qnk1Y2yPgEr8AAUptTfN1TSHv35aYbLLP4DbFzTEjayt3Lk3U1Ztugni4LQpgYowrObqJVSQexxTjI0HpoIEXUWuF4viFjTTIK6OWXIRkF68g5A4iMOWRT%2FIz6FOiXoLbH%2BN%2Ba8kChpLWPTf0f57XP%2Fa9zuvaKlDYWccvmxqlRjlZi0xxSPpHFwXs9ufZCytYFAwuVrTe5smwRtgRGfaiWKLOprB8V6qDSqVIz7OKxHz9s%2FAGVXqv%2BnIFG3O4Z9nwXfWKy9qNBzM5OzHEVecHz%2FQbkncPKF8TO3xXbNaQZ0OM%2FpAi2mTHkDmHfBFGnZhphPzd0BLuMe6Evdi%2FIfZKKpSpJ9hMTpYeMlOubfljRVmtRxwcAjH9WYWT0WwpbrialV896HdVliEj46qvgdjxiaIuBr0ojPUvKUMNQ68LTdsGtTclLhCp6yYFhtRCEgfMa49dyJMG84SF5kXp9Jsjpo6WPXtiocy4HvRsy5iD3EI6%2B3jvWPcdx9rJS%2BBSY3uD6u7r2vyGQmJtZPX2dtKJEFEXE7qKcIIy%2B5BkML1Apuur%2BhkFDh0CG2Dt3cX6j6%2B8eYrvK%2FFfMJ%2F1vc0GOqUBcqntemVvH2Tfrifaah9Nlj9pAiGBJsg8EPl3UAzVBtPnYknrNQ5gjI4%2B%2FnGyl49Or%2BdYhtIH9hPPN58S%2BaDwE%2Bk%2BR2a%2Fv0f%2BsuKxVR8cz5hmvVKeWCza5fFsHeQ0wAoxB0OLNVhy5HjCmpP%2BhWsR3dC%2B6%2Fdnnh81XWGkhYmJ8enT4%2FQjYkXtLSVn5jexL0KMeJSqU0T7o90AIYlvajPutxR6EHFx&X-Amz-Signature=a02c07b73069ca0554a9dcde50f690530dc893cd6443bb962917e4f6aaaa2122&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TB3UFP24%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031714Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJIMEYCIQD%2FLNernx%2BatcrSiBTADBGWx3Arn7qfVcxyJKygY6g7pwIhAJXm4yXL2Jm2VgYLShGn0u3btwGTPFMGUY%2BPSmwVn7gNKv8DCDsQABoMNjM3NDIzMTgzODA1Igzi77xpQ8KiCS5yT6Qq3AMK1C5vVSjar4Ske5BZLTZFxL5U7URYlKB4EqFlL8XJz74BYA4AzHquYNHu3MywAYTZwTGIHmJK4xjo4UHmTN7idLtwvPHpJGDxOFJUOjwUuRkdzFOTE1W%2B6wP9cqcqDjMjQPxJWGE4PqKbMymK1LawV9wUejvUrY0LTwpV3%2F7YEhkKMzjdZ2DayZRf6azJexxFL7rGmWbvAC7EZ4gZcOU1HNPUZDka2Iho%2BbrHjoELRBLon7WlDUZ9uuqoGr1BtmGZvk5rgIdqRUmVwJ8nX%2Bq2%2FN5jJNRK%2FI77breyyv%2Fhu1OLszv588qDCc2%2FfapWRFFfG182UwBgHFQVQSuLKl23tp7FtSYgd6U1OGB%2Bs6XpGYNGuHa2IgW9F53VrZjG2SfYg6mDQBE9XRWnmGrJu2JdCv%2BCRrNT5arHkTRo4TArYYhvpITBCFXAkAtRfrzDvffXZl%2FMMg8Ku3jZDawPny94vEwh%2F%2BF7x24WjNIb5bqIk4JAPosoon6PXLQY5OiAnSssOlciUqWxpIzrEBep8S9jsboIu2JwkIE5hyerDSL1kNHFEqn%2Fw%2F1DKT76KH3piVBDmpyA5rgMpAcmR08EtNvRAN3w6gp3PN%2BNwxNTHlQROJex7pNKkdTm5tXx4zD99L3NBjqkAXwK3KGMi3HmugReY2k2cxco3y3MRe04zJdX2ekcAKqwsumKiUNLHrGjisCA5jeW15iRwvRiXHLdjtLqxwEiF9ha86kXwt5p8jYxZ1CHqqJS4lpSLEx%2FYZGlIsqPHuXKZcG%2FwUvqLmV0WoqZqGQ%2B0l0eK9zgJcj1wprlUVj1gET0mFa7dnWvN4ddpVlaXMJHZv8SXdWMJlr%2FP9ekytaVbDx%2B6T%2Fb&X-Amz-Signature=e2e6b98f12c0aa89aca1cd61b21b8d75f7d4bdf7f4217769033dd65b66fa7737&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC665GWI%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIAtXl7R3QWP5%2FrtBzgvKgiq%2FdoQoGtbss%2FzNK%2FLduprDAiAPMljZ%2FBYdD%2Fg8SgAiTX56HOg800R%2BEpd0JGGRs7lTDyr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMNj4UYkItnoUwOZPWKtwDoT0%2B6m0ouaDKgpwC66ncBgv6K4Z%2BdZMHvf%2Fy66GDkNMPsRnZXeojZ8Ggg0bnXACqx3dSU3d6CwuAbenSeQuAHR%2Bf1GbYxdO8Oh4pjnWoyFnwlQ6y3He%2FoYlyNalLR2wkN%2FK6HfqMBSecxwHHMBVILYwpBD5NH1U3Or0U3sDar12zgKVqp7H7U9dX70ls%2BYw7ovI9mqa74Rrt9ICJowzMJkFdzNP7s3YhBSllT02vwlO7X1VzKufeaZYxDAqSfaFV8gTFDcBKDMbP9tWW1ThCNbB6Tv8SSxI6QZoK9Yle3erOYUzPeoaLF3y6ZPkUBewGZeOsUqjW0W24%2FYAraHFuPw1LiEbTSJTfEBIbsntgGsGOQLS%2FXk0lUTjYGDZMSJYyAluNWXUEwTg%2FmrMdcL3B34%2BOkhPMwrGFsa9jS4dkDLI0WlW4w5L7Az8W7%2F9c1bS63eXdEt%2FlEAQyKH8r412U7nwT9QXxVMubDVc2Ik7QWex1s%2BABPeFDZsPLa%2FBrwn98aOjF1I8UISFBgj%2Fph8WVy5pDswvMRMROy5TqP6%2FjnxLvOx4jJ3puzBKQ8xaXFQylTJ5jLm0sAA1DCnwuuZvxnq3SFWZog35CGAIQ0A1wxoC%2Bfg2aJOHqs7KYfG8wu%2FW9zQY6pgEI4HjrtywJizCgul1NVbOlbfjfdzuxq7fpkicdZrAUqheM%2FobaTRSYtTMh1hQS%2FyUB7BhVvkN6mgceueaTXXc0x2DuHieraYpcy3T5mkfyjqiqVHxX3zq6gjOdlTvFF85KPmzyzy8lluAjUj%2BlhQoLr4v0%2BbmjoWxYhyBSpoin%2FexJSCf69VkT9SJXhaMX4lYHTpwE0LKxxognW%2BlpYC8lwcBHH2LU&X-Amz-Signature=7b5611a3e4d9eb7f6d5b9138b886f16cbe78ca84ed4a0507846a90901eeaecc5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VC665GWI%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIAtXl7R3QWP5%2FrtBzgvKgiq%2FdoQoGtbss%2FzNK%2FLduprDAiAPMljZ%2FBYdD%2Fg8SgAiTX56HOg800R%2BEpd0JGGRs7lTDyr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMNj4UYkItnoUwOZPWKtwDoT0%2B6m0ouaDKgpwC66ncBgv6K4Z%2BdZMHvf%2Fy66GDkNMPsRnZXeojZ8Ggg0bnXACqx3dSU3d6CwuAbenSeQuAHR%2Bf1GbYxdO8Oh4pjnWoyFnwlQ6y3He%2FoYlyNalLR2wkN%2FK6HfqMBSecxwHHMBVILYwpBD5NH1U3Or0U3sDar12zgKVqp7H7U9dX70ls%2BYw7ovI9mqa74Rrt9ICJowzMJkFdzNP7s3YhBSllT02vwlO7X1VzKufeaZYxDAqSfaFV8gTFDcBKDMbP9tWW1ThCNbB6Tv8SSxI6QZoK9Yle3erOYUzPeoaLF3y6ZPkUBewGZeOsUqjW0W24%2FYAraHFuPw1LiEbTSJTfEBIbsntgGsGOQLS%2FXk0lUTjYGDZMSJYyAluNWXUEwTg%2FmrMdcL3B34%2BOkhPMwrGFsa9jS4dkDLI0WlW4w5L7Az8W7%2F9c1bS63eXdEt%2FlEAQyKH8r412U7nwT9QXxVMubDVc2Ik7QWex1s%2BABPeFDZsPLa%2FBrwn98aOjF1I8UISFBgj%2Fph8WVy5pDswvMRMROy5TqP6%2FjnxLvOx4jJ3puzBKQ8xaXFQylTJ5jLm0sAA1DCnwuuZvxnq3SFWZog35CGAIQ0A1wxoC%2Bfg2aJOHqs7KYfG8wu%2FW9zQY6pgEI4HjrtywJizCgul1NVbOlbfjfdzuxq7fpkicdZrAUqheM%2FobaTRSYtTMh1hQS%2FyUB7BhVvkN6mgceueaTXXc0x2DuHieraYpcy3T5mkfyjqiqVHxX3zq6gjOdlTvFF85KPmzyzy8lluAjUj%2BlhQoLr4v0%2BbmjoWxYhyBSpoin%2FexJSCf69VkT9SJXhaMX4lYHTpwE0LKxxognW%2BlpYC8lwcBHH2LU&X-Amz-Signature=7855b023e279e9fe743563f03b678b8cfb8ed64dc1bb3f520e3faee8b1e5d8b8&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QWCRYYBV%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031717Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIE4FJ9BNr8%2B8zKLpMExldCjUH4cDjTxKhYudDCi0LNpOAiAgsqgl2zAyb5O%2B0MSrmvXxkvmCqBXDTJ0Ze%2BDXhway9Cr%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMM2EfA8zsaYwx0EkMKtwDQMVnsI5%2F72SyIRb1ihv2%2BQHbn8tUWqnvkdJ92RfVf%2FOtVsv6SJrpeus1IpxC0i54hdqdcX0QnbsvPjB0mNyQWAzgl6ydOy92OXyCnO%2BJ9i5yERMRvaA4uF0erir6SLrkO75ShhqEQ34sSFOmgF0jhGLcMbQw%2FnK4fl%2FTG9MhErbsvOAHOxKD9n83PbPwH5gi04BLVhWhIZn4UERRj4eTonk1P8FAjOeofOEYTOZH8pnjrnU2FGoV0bF%2BxelOqEuvyVuiT6EsK00NAy4ADwPpiVe6B3J8BazzP176%2BAr1FS1pB4DlaWbFsVI4d72k1lrPB%2B0DKxKn%2BZErNiZD8D7LoofulPBRPFviNHXEWAze%2FNsH%2FivFHMqd8iIjochGJRvWhNFZsl%2FVHQ%2Bq0at32OQiql6Xe6k4x36xwSuNwBEW2%2Fj8nimRB4mIhKnLMb28GPha7qUeXR3WmNQIxTskq8G3MK0I%2BFhkdTxoO1QdaV1L71MxSXmL77mgnRj%2Bkxh7zk2GW5TarrNdbwP1b7seEvGSR6gBU6JSl5UHpcmt4O9%2For84aUNa%2Bcbcns13r5wEFuTFMcF8jM0H4b%2BIkXVKsFoUSxTmxW2B%2Fb6R7KNhgpZktWeDl%2BoyCpYlPHseNQ8w3vO9zQY6pgGpU1ImOn%2Ff%2F7i5VjeC3zrOZEEH0jYewR0gI8dNXY40cgfC9MnMxSmyGqdijArEAGlnSOlcv6dpsucMV%2F%2FTD%2FT%2FHrxad%2BvcIux4q5E5z6TUTOf92MG6LrRnUfVqY%2Bv4OcKgr9hFLRIPLptHlfGBtSZlPXuv96cSOUCoa9G6X9DJwV9mHlj8a%2BUz6FlnOTZWvHxPilxWv2%2F5MCWpZTsUfrXDpFBI1%2F6T&X-Amz-Signature=72421043d4e2f7932d4048d9e64fbe079b1c38849af0761be7e3fa5f37b6cb75&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662TEVMW67%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031720Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQD1chrK%2BuFzdrW%2BVE8ct9paMy9fCETBMFPjwmeLHA4JwQIgNvQ3E%2F5jzkDMDcG%2BioNdkUxZAxHi6VFz8sKgwPHwnKYq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDMWD3htu21FsSPnFiSrcA8A%2FIUct7WxW8rQ8rTLvj0%2BOpSM5%2BLyO0QNyTdoWsclUmfYsFO65WrTR535c9Tn7xlczY%2BpDssw5jTOKge6AYe1s2bAPrA%2FVk0qkSlBHh6c4V7ibWwBDoSCaq%2FW9oxYN5dH592Gv%2BT0aEimMOlFhlq7PUGithwfDXLs8viP8RuU%2FN%2BgaWWK5fU412YnEUqbbo1iqu0HcwLUSwuTc%2FiLdNAPJDiFGFHSMrHXhLpNvz6dBRUiESwAt8doDs%2FO4wScQiqyvVfQhsBBTBTdA6X68nuwqZFHo5m71wG4xbQ9S8LZlNmR5uRp6zoNeoyF6SN8XyRQywb%2FBducAuR0OJeS4M2BFN2r8sz%2BOExj0fEVnk0Px%2BH%2FywVOfTyDgkV4V3amHJApr7SljUidx4vXiKNNT68B%2BFNjPLMg4kum%2FGxYyGru1fxQmb2FSxh1zr5XvPGxykkISlhuHcfDUF3NzU3MBQfe29ys3CHuG6r4SbvOJ3sWgPpTtUIm0bSw7EBXETaf6C1gV0Nmh1jKyDlJs8IuPfLEZAQvdVBKSS9iEguJJRRNe34ViYgmuf%2BmYijdI6COiuVq4l8O0pRlaURU4bh3864JroxMOZ91ir1tjml4QpJta7kLgMZVr5wB4T4DGMOrzvc0GOqUBLuC%2F4XrIQvvYAMKDp3bg2%2B%2BZIvI3UWDBGvAfkZoXckATovbKrTuAR0OX8EX1XRXrgV7WxfbxoilYO0sJ%2BcA7Hr8wp6O5agqgnvL6Eof0dT2EEQNDPDuzgWhC5B3bdNUNZONpufME0n%2B%2FYHfETrilwp3lLYfFn66rMhoXtnn%2FdRUe4Q%2BBY7RHIJVmDw8zPw0a2IbNrkr6czpEPXMeYkSFLwYmUaz3&X-Amz-Signature=0c9a0e954c2bcdb25ef41ed37dcfa522245b48007c0f61670aa0c8850c0d8f70&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663T553HES%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031721Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJGMEQCIA77%2F4DMmjmiMMaKed8ehxMAv7H2f7fJBt%2FE%2FaSK0AuDAiAibBfgSUm5mON4FirHQoY52mWU1Crdict3zB5Lx%2Fqepir%2FAwg7EAAaDDYzNzQyMzE4MzgwNSIMC%2F9kOWzd4qfhH6TAKtwD4u4Uz%2FiwCRcdkbWZzrAslvPi13y7vyPy%2FSzW3feHNUJIAze6jkRXRPb%2FeqF7jju2GUvgI7O3N2ZrOaW6PoTrHLQUG1%2BR406utYJA7eft1pW2Xb0nldHTiVt9ryLtV5O%2FjJsEm0gV6NRUY5f2M3dFkNZrpurQ0E5%2Ff4AUK1UaB%2BP%2FIPTGyPdLNBwmzQOgzDvCH7bXoJlkpOs2Cqfirqp4cCl4izbbjkSmuA3kM8iNBaPiVvWAkrP%2BYKZDD7I7vpStaqkvXN3OFOaDqRw%2BkOTKLg8v7DA%2BSnEYnPLzi5RI%2FtH%2B3xVlnQTjF0Y551zdI2YIwvpsOzAz5Ev1%2Fu7reBhSVMd8D0zovx47kALwAaJo2r2RnNQxhT%2Bh5szQx8rya92S75Y4pA7H4F2GXo%2F0GJG%2FPeK9pjB0unNtrafqeufC4jDX3HmNJtDlTPGfiB35v4GsDJes4OE9Aur9Z9L4ecXNH2ZOkBCz8QgPML6Rf7M9CTaZE%2Blr1uGcTowV3koQOXL%2F3jlLAutAdfr13M9QWmf%2B85iVcxKE4VeWFDtQkveye42zRtoakLAcQxpzK%2FWF5zzrlhLfznArxGWMjjLjNniirCnYDVmuoBtFoTbzGAbQ7%2Fm8iQ84dU%2Byd5Ikjk8w4PO9zQY6pgGr6kyREDsIFjSOZodlnpmwtOIv4syP8oMe1Rp41nXdwsTF7Jst1G0UxFXD%2BwV8wTc0kdERVS4v6kPBX7ARP2djAYFxMy%2F1%2BAarCHbccTgAtlv3VZ7qe2KWS0mEKFzASD0sQEu53frUMIO%2FgbfakuZZcmqyrRemCY3VC%2FLyIL68YQ7e2B3%2BD7yxWxeBBKj1vM%2FVVgBumM3ld5zBhYkJKzGcmfswqLKZ&X-Amz-Signature=8c7c86f2ba5641b61710c82584db060175d1a36a616754bf103ce52414fdee77&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCOJ7TKD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCgkpI4%2FQXlR0%2FCEiY6P40tEoToW%2B5fFCfTmQGZCqdvtAIgX8Vc5afIa2dNobRG6zUqhf5%2FMx3T3u9Bo7y%2FUb5BXHIq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDN8NH9QI6%2BSCkCaedSrcA%2BeUS0XlMlSRxwfzjhF4VLIIxMxKHIldH%2Bn%2BPkuSxXf4jRLiyz0x79%2Bkt%2Fg1T4k4yYq%2Bmayfyyq6j4HRTeNV6KaUYvQ4XvcY3hjXF5UofezzdCkXmDMMScN0t7KVV9DHiz6fipUC4hEgxvWVjftXLHlSlAMdjKkCv%2BDuyFtdomo%2FCasQ%2B8ECfLiwCLEBQmofR46Ap9EIFmdw%2BkQbNRrM%2Bh1wzhZiyFoLUo8tDMGmGMk9uzLl%2FBPt4cVrab0s9V5jRqqIvBNxMzqJUzc%2Bn7%2Bth3xl121H7esc7jl2qb2XNJJMwIbYq9gOUHxLAGHD2bdZcr4FauYA8vINNjb%2F8WksKnTsRomKqNr%2FD8pdGzAVH04Z5yQb8g7wE6CU%2F4d3QCm23lSGEXYHzi2u9UQkMMecqDwGxRFvbbnHBrVk4G3UPnhEF5g0MbNrWEuY2cCjH8IkdXU94c18iVFZw79tnqupNm%2F9W3HfF8zgSNq7oV8r52GK440YO%2BBgMM6mf5uXLXR4yzSZrSUmUtWDo8JM9p8OfRwhKDeQFj7onw3VSgSbTBJcY6m9uzLYvO6GXd18XffD8UttiLfcc%2F7tKpvA0407vAsmLCvVdbVz8yZ%2BCwCeh9DqFn4Y7qnOB8GsqC4VMKD0vc0GOqUBRJxbpv6QjXev4wptPxj%2FrKfJC3j%2FJ3YB4sWOJcFO0hX2F6fu%2BnhtZPgsxS6RsBs2aRE2ZYe2YONsXWvUD23X7rl0GBKriCDlMYVy1iA%2BDnc6E%2B318qwh6zYBTiirNdQII%2BwjOWsQQPa27WMJQc5Vmh%2B%2FKJZVGbAN%2FkQRq%2FwWOtHGJEI45VFd13eKTsWJk%2Bt2SuZEQD0pV5ry%2Bey0znhomb9djhYl&X-Amz-Signature=3dee238cf9bbd68ba51ee58516c3fd7635020a8d2e55c7e0b88ff919101d6386&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YCOJ7TKD%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031723Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCgkpI4%2FQXlR0%2FCEiY6P40tEoToW%2B5fFCfTmQGZCqdvtAIgX8Vc5afIa2dNobRG6zUqhf5%2FMx3T3u9Bo7y%2FUb5BXHIq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDN8NH9QI6%2BSCkCaedSrcA%2BeUS0XlMlSRxwfzjhF4VLIIxMxKHIldH%2Bn%2BPkuSxXf4jRLiyz0x79%2Bkt%2Fg1T4k4yYq%2Bmayfyyq6j4HRTeNV6KaUYvQ4XvcY3hjXF5UofezzdCkXmDMMScN0t7KVV9DHiz6fipUC4hEgxvWVjftXLHlSlAMdjKkCv%2BDuyFtdomo%2FCasQ%2B8ECfLiwCLEBQmofR46Ap9EIFmdw%2BkQbNRrM%2Bh1wzhZiyFoLUo8tDMGmGMk9uzLl%2FBPt4cVrab0s9V5jRqqIvBNxMzqJUzc%2Bn7%2Bth3xl121H7esc7jl2qb2XNJJMwIbYq9gOUHxLAGHD2bdZcr4FauYA8vINNjb%2F8WksKnTsRomKqNr%2FD8pdGzAVH04Z5yQb8g7wE6CU%2F4d3QCm23lSGEXYHzi2u9UQkMMecqDwGxRFvbbnHBrVk4G3UPnhEF5g0MbNrWEuY2cCjH8IkdXU94c18iVFZw79tnqupNm%2F9W3HfF8zgSNq7oV8r52GK440YO%2BBgMM6mf5uXLXR4yzSZrSUmUtWDo8JM9p8OfRwhKDeQFj7onw3VSgSbTBJcY6m9uzLYvO6GXd18XffD8UttiLfcc%2F7tKpvA0407vAsmLCvVdbVz8yZ%2BCwCeh9DqFn4Y7qnOB8GsqC4VMKD0vc0GOqUBRJxbpv6QjXev4wptPxj%2FrKfJC3j%2FJ3YB4sWOJcFO0hX2F6fu%2BnhtZPgsxS6RsBs2aRE2ZYe2YONsXWvUD23X7rl0GBKriCDlMYVy1iA%2BDnc6E%2B318qwh6zYBTiirNdQII%2BwjOWsQQPa27WMJQc5Vmh%2B%2FKJZVGbAN%2FkQRq%2FwWOtHGJEI45VFd13eKTsWJk%2Bt2SuZEQD0pV5ry%2Bey0znhomb9djhYl&X-Amz-Signature=52871aa250ca9ad10d4334d7273285e3799efdf7bc1697cb4626f3b663095dc1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46647LDDFJB%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQDTO3IE%2FprNAxBaqMv1lu7CyQHg%2F7smyUfjbYwxdTfxNQIgOeg4NgaHfw6n4bQxHZ%2BdSi6vi2mW%2BztwAq0BQkxBMJQq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDBk6R%2FdX4bPXSgPlqyrcA3%2Fk3epT9H1WoFW%2Bey8Aj97atQl2fYxh4h7x2%2BpZxV4rsGmh%2BUupNTxc5QYZLR2dHJ7%2F7S2zJvoJuSD0bqL5926YE0w4XkHu6v6n1e3iKKP6X%2BeBhv8TyxyPaH4%2B5FGV5Yl7g8RTdrAgYEPF6Fm%2Buapktb5mYoAYQzqCk0eCu3tNGsIVwz95JXTxiLDvfIiiooVx5WUNUz9WNInE7NWibMmVEydSeBTnKclSsq2WuRjqptvta4h0FxP3fG1koRkmfsyOsEisrm2Na9P914kDR8QkqdzqLxWNQGCDVBNTlZ6aA6yNEKBaX1x3nRxlCGUutQs9Rs0BcFM5Nw5uqDc%2BrRZdnLQd2iJBWvaDpp6bMlhtgr7ymfsjS%2F4oxrpE4%2BQBQMhnbQ7NmgGYX81bpsa2SJM%2BnYEc469Vsmy9GXXm%2FSX%2BhV%2F%2BE7sTvvvQ18FqFFeRwixxrMutstRz5KLrgJNvyRahw8QdhU4dp8sizxKrKbdzyoL6wlzaPGTZ7%2BkZoPBC8aNW7uBJkPof%2BXqUDaRy1SlMlXH0ZU%2B2rfEt2UyE9iYUIYsmXLdfFbsreZ9YCkmC%2FxwA6EXtgDJ2XIv%2Frx2L9uK3JTB2ssVkuP3aaMbDJkdDS0FLZkPHEYdBWvn4MJT1vc0GOqUBOzgD2ge6wCWXH5WrtqJGPKjGhz5g%2F5VliBDQ99Kgs3D2BAHE87Pze6NpWn7cl1WDH4z%2BUUSpXBTwQSUJOPYV8F2Rdn7shOqtvoBYGanzVUCOBHd5Y5hrDfhqybCC3UJWad9A18G8s53GGpz9CjcLhPN%2F2isNTyPBQt2Q21Jc2QNGsCYWgIrHI1jlbv0E2hf%2FxzLvngpmd%2BjUTK9F3oQi%2FuuvwWjT&X-Amz-Signature=fa1201d588f7affd12580fc79ede2e29ec0ec6f3739589d0c637d68753835101&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXHZ5KOT%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIF5%2F7aNSRJD80aHWCax3lRq6MAEC39XZZ0MiF8nCxMZDAiEAsWmRl04iWrRPlSqh7qrDOM5GJDOopw%2BCReufe9J7it0q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDEajRYKviITLokv2uircA56mSRomQZ9DhIDp2gRXOjOeYZNQaHJjRo8cPQbzDv%2FMagKBhb%2B8TwjEvY4R1a0yVDdP1uCxXrqCFhMI3q5c%2Bv5NiC58k%2B2x8Ci4wW1ZVqi7AJiWHWcCcK5rkkDTV2KMWBIujRWEEoouND1ZMqwqAZTB4UMOw11Moy%2Bv2yn8IyJCSCBpf%2BuRMjPuxjVi9iSH9Z9FRJxkVuNWYMpmb6tDwG5lLRDWndOK26CuR61oi%2F0au9hgPAL7gvZ9f2nbBDCbT%2FLJz1s%2BKawdwsS5CDLP9YCsC7NfrWzwe1CBJmhc7%2FJW6oA2kBfu1ADJfDkuHnRiEZeg2xZAJZh941W3rhNzqKMo5WDRpG0oZ6wnL6YaFeexRBycFRglVtSIeGoHZ8mIl%2F8B3o1cSs4VmNB5ZTVyYY%2B5NjRK2Bdb2H0UvNybAEi3qD3uqkKKoaM6AlvA66%2F1ddPooP0zXpV1nDrHWKuVcISqAl%2F352MF4DuXz2RQYx6UtMGniOElESGYB5iN%2Bndy6cB9weCiMAwrCJtrquMoWJmrgVfJyZ47Vd34Wu9EWtH6PPuIiBXEoCCR35Ah%2F75BdQ6izQcn2oajmlvpv08SSvOXlbz39KWPVsp%2BZIBom4JhNQTqrPXFeOUv0gu5MIv0vc0GOqUBAj9jUZFM4B6LhY0B%2B2nzJ3wiIzpQuHSVGMT2F5vgHaK0tmncVkKXmHUqF19NxWjWD8u1vpksDg1pVrJVZ%2F78vUT1Y7vBrXMFzJFc6wuZGBZ6S5H57uLYf1FiQWKHGbYLt1hcth6%2FoRvmtq8eJewueCqGpgbzImwqX8Va5KnvQC%2Bx2SkzdDIs%2B7Vzrrc4DZK5rvfYMDVWIapM8UZGdc8kkZYwCh3Z&X-Amz-Signature=f84f5c8c272950f10ced6cac45fa372f04f3a32f5958a9f997928b0464a080d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SXHZ5KOT%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIF5%2F7aNSRJD80aHWCax3lRq6MAEC39XZZ0MiF8nCxMZDAiEAsWmRl04iWrRPlSqh7qrDOM5GJDOopw%2BCReufe9J7it0q%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDEajRYKviITLokv2uircA56mSRomQZ9DhIDp2gRXOjOeYZNQaHJjRo8cPQbzDv%2FMagKBhb%2B8TwjEvY4R1a0yVDdP1uCxXrqCFhMI3q5c%2Bv5NiC58k%2B2x8Ci4wW1ZVqi7AJiWHWcCcK5rkkDTV2KMWBIujRWEEoouND1ZMqwqAZTB4UMOw11Moy%2Bv2yn8IyJCSCBpf%2BuRMjPuxjVi9iSH9Z9FRJxkVuNWYMpmb6tDwG5lLRDWndOK26CuR61oi%2F0au9hgPAL7gvZ9f2nbBDCbT%2FLJz1s%2BKawdwsS5CDLP9YCsC7NfrWzwe1CBJmhc7%2FJW6oA2kBfu1ADJfDkuHnRiEZeg2xZAJZh941W3rhNzqKMo5WDRpG0oZ6wnL6YaFeexRBycFRglVtSIeGoHZ8mIl%2F8B3o1cSs4VmNB5ZTVyYY%2B5NjRK2Bdb2H0UvNybAEi3qD3uqkKKoaM6AlvA66%2F1ddPooP0zXpV1nDrHWKuVcISqAl%2F352MF4DuXz2RQYx6UtMGniOElESGYB5iN%2Bndy6cB9weCiMAwrCJtrquMoWJmrgVfJyZ47Vd34Wu9EWtH6PPuIiBXEoCCR35Ah%2F75BdQ6izQcn2oajmlvpv08SSvOXlbz39KWPVsp%2BZIBom4JhNQTqrPXFeOUv0gu5MIv0vc0GOqUBAj9jUZFM4B6LhY0B%2B2nzJ3wiIzpQuHSVGMT2F5vgHaK0tmncVkKXmHUqF19NxWjWD8u1vpksDg1pVrJVZ%2F78vUT1Y7vBrXMFzJFc6wuZGBZ6S5H57uLYf1FiQWKHGbYLt1hcth6%2FoRvmtq8eJewueCqGpgbzImwqX8Va5KnvQC%2Bx2SkzdDIs%2B7Vzrrc4DZK5rvfYMDVWIapM8UZGdc8kkZYwCh3Z&X-Amz-Signature=f84f5c8c272950f10ced6cac45fa372f04f3a32f5958a9f997928b0464a080d1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663R5GHI7M%2F20260310%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260310T031725Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHIaCXVzLXdlc3QtMiJHMEUCIQCsGJd0l%2BmGfyKXxUUYs%2FSj2vcTs4udc3PjRjNX0k%2FL%2BAIgGGGYWM3v7nwGy9vQ37Dp%2FCKzh5oRYl1ae2mhAJF9UCIq%2FwMIOxAAGgw2Mzc0MjMxODM4MDUiDKXKAvtdp%2F6qV8qH0CrcAztDveF8xQMgUIw6pXLpv%2FylrNcUjivbRj3g0wtqPU3rvHPnroAr3uE4dDieFEgflNN4AaPzvtsiYVicWHhya1VbppFEHqdVcF0qW4%2FD9ORl6mGRl9V3krk3RDpzZ2gLixWK4ozdqTZl5i8EIi9iqWmHWC99ZYxk3OEuUWCrh51WKVZGAt8XXaS5%2FJKlDHyfDPAXzsX4PEE1OA2BKI18X9sGmLrgVri8iPX7cwfwDozMD1EBm%2Fr%2BhZUQIfT%2FUqMPzpxPLQNfcSHCuBv%2FdddId5b6Ls0c4oX0n4MKNodcvwBYlZiIrdPDDfL7FTjYdgEB6HJJcvNaKtneOGxfz8gQBLiFvIj38KOYVK%2B%2BV%2B4J13%2FxswEj6cFTzr6J1W3s6iMH1%2FQlZbGsF6Avq6kT1%2Bpxtv%2Fq0lsToMOcMhqL0mK3VXys60%2BUHB%2FareFw8mdAA%2FJbpmmHicvTWEfdkUlXVRFCh9iQ3oEyi2jOVtHFJ212%2F0Ijb%2FLTd%2B8qjrQi%2BIFQUgOedo10h9Jz070MCN2vWI4IjRWRobXgG6iHnPRbtnP89swLLO3RoFhqBkIDdQSnTo%2FLmfLwc0a4SAIwrELOHN8AL2IJgy3R9QU3kq%2FeAnDI%2F%2FW%2BtHm%2BphLGCcu2XGq5MPv0vc0GOqUBmI6C9OFCOLeVq4IwHPT%2ByYIs1S5DnV9mN4KByB01lCj2IzxR2hC8NMGUC34%2BsFKLxUiQHMr7%2BgY9313SOtNrFkgmVMaZIOKGOtYiTCXITdr93%2BDrN%2BGqP0QWjxMagaQKHT9iKJ9Qnpt2yD6KGng7SMG49rnSBD4D7C12dxmMkJ0RO%2BvUyw2c3sE9FsRjOob7lOM8YqAU3k8SRksrlWu72bcE%2FW8l&X-Amz-Signature=c53d4b2d1334a2517ca56073c4c14f886e6c9073cbe7205d523b0bd415622ae1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

