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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUOQHSO5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIF2TB778zUEcID%2FXZnFARx2zno269LJ%2F78J76BQwUWDSAiAusIDu%2BhIvNcGOzduMvIJWpG680ZSbM%2BEpwweNEL1NUir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMQGByGe0WqZzBggtEKtwDbIisOsGZq0hbewh3iUBOpuIbxta%2FRVJ0Bp8OfvnmL8CL6WnKdMGYqZ4i0KHt9DmgGFzW654Mr5mWDJiA5mAcdmAN7eebcbpFMSsruypwaN94Gj5M%2BOXVu8t8GOdD9%2BgLGB2VO2xJ9GcSQ4pPFeGD1KT5Pij7EGW4MRx56gAZSK7crQWfQP5HXF%2Fi303ydRK3SLLJ4GNsdFXtdg2Fph5Zl%2BSiSTekZnPqXDI11MM676mddr94hgLHDERYHAupLWNnc9%2F8GdRmlk8mwlMIMi%2FWHuZ4h02K6tNeT3kQMRisacemqdOSB0Mt8xEutTwY0GGQAF7Pt%2F5iK43T0kE9dKdKebAMYFRJOmICVhZyEQ3Uq1yRgmv4j4UWLAugsyU7yVWguI%2B6pDRWaRGePnuBdpSaeB7uXoptniOgNNTux3rrkRyupJU2bM7PDNa3o9N5Kn2X4HIW5VFLl71i4Qp%2FoRfFH%2BdHRUlQ%2FSdO3dp5A%2BWaH2XxVxucQ1gdf8WnpZsH%2Fk4XyrMglqYwT%2BHTaXbgrXs%2BtcRtELekbUiMh4kwlvFkpDTEZ3vTA5IyFiKw69%2BaGxuWoslRHLE1RTz%2FCQaX%2FQsEpT2LflbFdAWGT3dYkBwM%2FncJqk2vkceGNkvOdhswya7nygY6pgG%2BEaSLcUNTxddP8K%2B7nfeaD9oZW3el1ba75yj%2B3yuTR2%2FURhEMrYMeHMUN%2F0VR4nwoxpqq%2BbI6adONyi5Fy0lxchwsGgQQ4oGlhdyn0Lnc8hOIbITtvamdiN5oqDlZ7pTxLlv1MkWhNQxjjaqb%2BRObE6ThgUtkPkSLMl3DNgTA9inXt82xvhrvPq6qgRZukJ%2FcYKCu91Py1ChYgKk746X9%2Fvb7sglJ&X-Amz-Signature=1b43730e9cd1b5e00931b13d21617847a9274d49a4671e76870bf83f66989426&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TUOQHSO5%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051650Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIF2TB778zUEcID%2FXZnFARx2zno269LJ%2F78J76BQwUWDSAiAusIDu%2BhIvNcGOzduMvIJWpG680ZSbM%2BEpwweNEL1NUir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMQGByGe0WqZzBggtEKtwDbIisOsGZq0hbewh3iUBOpuIbxta%2FRVJ0Bp8OfvnmL8CL6WnKdMGYqZ4i0KHt9DmgGFzW654Mr5mWDJiA5mAcdmAN7eebcbpFMSsruypwaN94Gj5M%2BOXVu8t8GOdD9%2BgLGB2VO2xJ9GcSQ4pPFeGD1KT5Pij7EGW4MRx56gAZSK7crQWfQP5HXF%2Fi303ydRK3SLLJ4GNsdFXtdg2Fph5Zl%2BSiSTekZnPqXDI11MM676mddr94hgLHDERYHAupLWNnc9%2F8GdRmlk8mwlMIMi%2FWHuZ4h02K6tNeT3kQMRisacemqdOSB0Mt8xEutTwY0GGQAF7Pt%2F5iK43T0kE9dKdKebAMYFRJOmICVhZyEQ3Uq1yRgmv4j4UWLAugsyU7yVWguI%2B6pDRWaRGePnuBdpSaeB7uXoptniOgNNTux3rrkRyupJU2bM7PDNa3o9N5Kn2X4HIW5VFLl71i4Qp%2FoRfFH%2BdHRUlQ%2FSdO3dp5A%2BWaH2XxVxucQ1gdf8WnpZsH%2Fk4XyrMglqYwT%2BHTaXbgrXs%2BtcRtELekbUiMh4kwlvFkpDTEZ3vTA5IyFiKw69%2BaGxuWoslRHLE1RTz%2FCQaX%2FQsEpT2LflbFdAWGT3dYkBwM%2FncJqk2vkceGNkvOdhswya7nygY6pgG%2BEaSLcUNTxddP8K%2B7nfeaD9oZW3el1ba75yj%2B3yuTR2%2FURhEMrYMeHMUN%2F0VR4nwoxpqq%2BbI6adONyi5Fy0lxchwsGgQQ4oGlhdyn0Lnc8hOIbITtvamdiN5oqDlZ7pTxLlv1MkWhNQxjjaqb%2BRObE6ThgUtkPkSLMl3DNgTA9inXt82xvhrvPq6qgRZukJ%2FcYKCu91Py1ChYgKk746X9%2Fvb7sglJ&X-Amz-Signature=1b43730e9cd1b5e00931b13d21617847a9274d49a4671e76870bf83f66989426&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664IKDJNOC%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051652Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIBvpYQ4kI6fCF%2Fy1CF%2FWF37TOH5I5qYV78KboagRChwpAiBukDrS%2F3%2BFNZErXhTwnl18yfnRd9Jo9w7ydDeuEgEPjSr%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIMbYwG4hbKjBPoQD34KtwD4Hyn6bb%2BMTRzRpXCUeDQavn4Cdstsxg9RWcP7yqvEIG5DXHCrtVy%2BT5oC3idukqbELTikw%2FvvxFcIuEH9ln75fOe6ze%2F1f8Z8uxFjC1XHL20HZ9nNMVMJL2g4SxSxAY95%2F3EhRdCJCkca5UhUmgb2mYaPxvh1%2BSBOyGNAFdq%2FylqgOsLN4UEdalfop5kcMywYf4TBPythZifb4f7oZYYTrlDRvkOJiZ%2BJnjBTJNvI3QMdXpir1RPd8ZX%2FzNSreMBN%2BYbyrbWnAj7UenSa9oPI1O%2F9G3AFZIK56Pr9ls%2BLGrwcGD1z8maiL6nFmh0KSG1UEvLKl1HPK0TCsKiiBrVKIZtGskd3c66obQEMhptH%2BI2o%2BsWoZChfLO64neWRwoSo%2F3911Ow%2FUgq4DQo851cziQ1hwY33SOZvptnP2AAeuNWUY8ThHdvtQpqnBzvmfy%2BciMVChWhRMaqNt9SN%2Bn0NMQIKNaASa8rQoqTTHixpoubUqIiwrsXmFE%2FN6II6%2FUI1TSx5oLWZ6WPdc2sVUW4YCIoXHNzjuXkp4DDZHaWVqsHnsEKmFsEtBOyaTHO8chlZGe%2FCXKZ608RBgJaTVjztoQkIOTruKCJz04%2BDgCvrobTDNPnzddwO16%2Be0Qw9Z%2FnygY6pgHiSt2CkogO9MTdsr%2BPjAH%2FZU06K11ldokV1qq1RSm1BL4PmWqqLbmn%2BRvHL%2FjkwGY0HeBXSNGKPdBmaabSSdCJ%2B0hvZyNnmINFBtNw3lk6eYtVlJ5z7OI%2FxpXqO01a0SvCbe7r07%2FmGr%2FrpO6uqjTJt0LU8VhbNMfvCndUuLGv0tG%2Ft36DBULGrdNESr91987%2Ffy1qmmT97a88xJ8bA55aH5ax6M%2Bi&X-Amz-Signature=f07a0ba511efd0821fc26742133f6e8c04b9a8cd3121cb30dc73141a948718f7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CW6TXJH%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIB7VyDgJurx10zpaDkpbhdPwx8Hgyri9pTD4%2B%2B%2F0tDFLAiA%2Byr37BF8MWOynZCZzcX4CS8WtVGqkIkkyvdNRVkWSdir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIM6AkcpuvXVsFTVwVOKtwDHaeHYahHGJAxqM4Coo4AD%2B4crl5GAjqFUzH%2BnOCzUflwbQEUSgQPvopu4il4R19fEFm9ZbPHkvceOyzDN6h2MG00%2FyTiRqCfX3hvaA0fzO8eyCdFK8KlnMSwEdbpKMR8YRitETM7yVe%2Fw1b8dyXDCZHOjH51u9WY0BjC5LzA8ngUG8IagltVtyY2%2F%2BVlqW64ZK%2FYl1m%2BEbdEjFeYvOb8WhtM4FzHpHts1ciop2UwsdfO%2F8HPF4rT2ciPb6F7a3l9057%2BNxLa59Klw0WzmeEJcfDXDLlTaYGeJXIdmooIYo461USenH28R2dp%2FJMlj26yZrNblwYrdZc4MQZLoFweIBbNquTc48eYExqobDaJU0UDxZoBJZrEa5VzHZyliajgkoBExnCFWOPO9geSPzSlbXWf21eVnW7ZzQ0qpIunxxwyeirZNn72YuIW%2Fhr0aFW9xkIdFQnRHwCjgyA7olMAPtmDB2Lx4jUUHMyg2Jp1xWQC29NVzwVD%2Fz9GJjsgu77DYVHZyDcZoxHNUX7cN7I5Pvh%2FBPgL3rwqGKw0IhUU%2F8UsVsEPclXRx0GclDrgFg1GCMVuT9f2rR1QZWe0FQuYgz%2BHjO8KxggbUPgcrkZoCs01Xv8dGRlhFn9LDKIwmqnnygY6pgG7r%2FCBYz2TKjLTNlH5pSR6dz6ZVZUkifbyigRiSxH0xHWqBjvCv8CNhsBHnSdedav9EaezKPv54%2FE6fQnlHGX%2FBzRY4Ggru9NoIji%2FAuZlqxpV4n2MCr7GHOPgT0vC5aEoaEHRZr8qBjFA%2FHUDWxNhhs8I9W%2F1AMcF9jqniQ9eWWVEdW0DFoDMc1p9268gCq1TKoy3KvcH2Zs94WMKzTwmFxkNpS%2BV&X-Amz-Signature=bc1e73098ebf76afc6ab530154908e9c464bc4966a1e60c9526a8d84f0432193&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665CW6TXJH%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJGMEQCIB7VyDgJurx10zpaDkpbhdPwx8Hgyri9pTD4%2B%2B%2F0tDFLAiA%2Byr37BF8MWOynZCZzcX4CS8WtVGqkIkkyvdNRVkWSdir%2FAwgkEAAaDDYzNzQyMzE4MzgwNSIM6AkcpuvXVsFTVwVOKtwDHaeHYahHGJAxqM4Coo4AD%2B4crl5GAjqFUzH%2BnOCzUflwbQEUSgQPvopu4il4R19fEFm9ZbPHkvceOyzDN6h2MG00%2FyTiRqCfX3hvaA0fzO8eyCdFK8KlnMSwEdbpKMR8YRitETM7yVe%2Fw1b8dyXDCZHOjH51u9WY0BjC5LzA8ngUG8IagltVtyY2%2F%2BVlqW64ZK%2FYl1m%2BEbdEjFeYvOb8WhtM4FzHpHts1ciop2UwsdfO%2F8HPF4rT2ciPb6F7a3l9057%2BNxLa59Klw0WzmeEJcfDXDLlTaYGeJXIdmooIYo461USenH28R2dp%2FJMlj26yZrNblwYrdZc4MQZLoFweIBbNquTc48eYExqobDaJU0UDxZoBJZrEa5VzHZyliajgkoBExnCFWOPO9geSPzSlbXWf21eVnW7ZzQ0qpIunxxwyeirZNn72YuIW%2Fhr0aFW9xkIdFQnRHwCjgyA7olMAPtmDB2Lx4jUUHMyg2Jp1xWQC29NVzwVD%2Fz9GJjsgu77DYVHZyDcZoxHNUX7cN7I5Pvh%2FBPgL3rwqGKw0IhUU%2F8UsVsEPclXRx0GclDrgFg1GCMVuT9f2rR1QZWe0FQuYgz%2BHjO8KxggbUPgcrkZoCs01Xv8dGRlhFn9LDKIwmqnnygY6pgG7r%2FCBYz2TKjLTNlH5pSR6dz6ZVZUkifbyigRiSxH0xHWqBjvCv8CNhsBHnSdedav9EaezKPv54%2FE6fQnlHGX%2FBzRY4Ggru9NoIji%2FAuZlqxpV4n2MCr7GHOPgT0vC5aEoaEHRZr8qBjFA%2FHUDWxNhhs8I9W%2F1AMcF9jqniQ9eWWVEdW0DFoDMc1p9268gCq1TKoy3KvcH2Zs94WMKzTwmFxkNpS%2BV&X-Amz-Signature=a792a3db8abb26f8a282a23220d1f73884114a8496157d156cdd778135d2bc1c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466V7TWOODZ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051653Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCICD2r3jvxLhlzZjXYlar1eORD5PSeZeuhsE%2BFEuapcRmAiEA9HNXZrPKICGeyibbLdeZY2EzDJ%2BHroS3g%2BP%2B20AlN1Uq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDB8e2kqW%2BPaAluIVcircA86d5MqFZkv9ohioIOCp13LTPR7E3DW%2FlDlVkIrgwMDfbo2flpEeGF%2FIOByVLS1QU1A7zW1kuxm0GWJTG41BncMmOsB8iJxyWSX3YCjTLHvAaVK4gpKq9poQnXNVXW%2FbHod6oBne4eA6S%2B35D0ouNt84AIkWAexlMz4JBb6CQ7YAs5QZKLIQVvGtEB0TF8UHtQv8NGbnWio7KWkA5kTNakuQAu%2FY6mArbr2MAYBoIyIrDVxTBW3ZLduZ4G01dvkhixOqoXhTKSWixK4Q4aEceEwCq5%2BPh7Iz5to4OBH8dXgXQDHGvsqPzIICWpuTZ4jxdjwN0n5RaRwXRQisthSNkQgi%2BmDnxdHgsPm%2F4HUIt3lATgEmArObYK59D6vNKBTQHOV%2F7bg88%2BseUeCc9zrHE7woD46Voc8Bb%2BiggxWLZ678nlPaPiVWYQHyVLbckJBCvuqYuuihBcY7UC%2BRFDguSTx7JBDK4Wc2kbA1EfwQHSv9ouJYQsttqofg%2BGfmkgGwx325kr4XhEiDkLITzbcqUnk0n6PI5M5kj%2FjLxgQr5Qq6G5BA30YDSusCGf1NDMz4lBn8T%2FyB1vfkuux4b0q2JSudGEkfKOVOFkNKURN5WZsJSIV7EA7F3DU2eWMfML2u58oGOqUBdkbn4AlQNWmZO%2BoLkN1I43MErXcb3MNxado84SoQi%2FTV44k2ewHeZyi9nwEJdZopKc6w2QjLsJGGz7ENcLKR3LMy0o6AhB8Gv9qMgQqcau3ooiqRwA1%2FcEu2S8gHNDsnHsmeRRjgtcMsSnpAjE8qKLCPQbD0gc25YH2KZkDgdd85JEfHKjYZ2iiWfpLMD%2FJKzjCqrfRTJox5nUuZlMC%2Br4QR731D&X-Amz-Signature=0c22d40c4f995558787dae1a8775bd0472b8584206976524d50ed352d0bb4f86&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SV5SQCT2%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051654Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQCH9PGyzY8AQse8dYJiXnolaLFSxa4gJTjXDT9x0eOQ1AIgIc19pMe0XFOMeb099KzFA4uM9JSQPbPIE62WyrRX1Roq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDFAEn00vuXoZM55EzircAyMMLYQ6EE2RvYfARuM6f266uXxC2UmAqBGawdJ9Jwhc37enAafbG6dqY%2FL5jRJtbsrf8zZwBaefmqGufBNRzLYIMCRGruY6bxUD%2B%2BYFl6PiN3bhD9S9bSC3Xzj3WykYQMB81i%2Fs4AZHjEtB4NpQHh65gkc%2BZkRh02zxHueKcp80nKcSJdIJmeA29Ogvth6D%2BIijM0yrQK%2FOHgkiigiGoyfOTpRJNFENETpsBaREPNNZUwMR8nPePpGV35kggrmgpymUxz%2F0fq2WSXCL%2F31OZgYfKkdQP1XoZZIBi65yZzUo8PgdvinUYpACa2IQT3ZW%2B53ooRkvseClRosgA%2F1%2BS228tf6Nv4L3aex13%2FM5hk7rPlBXpbNNs%2FcH2QUSB82CBkHT7LWApzhwBrzWm%2BSnDcP4FvE1rpBgXrUmTyGEa3cYJeJ5e7%2BZosVLZFEAlawbL%2BTMxVKQuTUUea%2B5BRCTwPvQ4785aagv1LfqEXZG2dWtpGh%2Bu9PKUPwBLxs6JwrDwltEIHSNTbrXdVxY3K3vXMvs7LNmoDblmKjhmqLNiXKRHKP0wLTcFBNDTJVt9%2Fpnc1wkrhmaXqCMaqZ9jVXNlTl%2Fhuq1ly9BGgzvCcLFdo9eu0Pcm4FZmsAjxtcjMPau58oGOqUB05aBQoMRRSyVw6ih8q7cXCgAk4v0pI4UvSzFy6miPLl9vhaQ6QMPS%2FZpKc7ZkPATVfjGNcEqsGEX8ccC32crZ%2FnlmP%2BwLZndcHfD9IX%2FkuL54VETkUf0%2Bab%2B9H%2FVh4Jmp4Hq3Kr274WV9szXkAommNTC6%2BNuWYNYc7UYTOTKnsi02DSPl33BnyMqpci7smYd3ZilRRFFTgmR39chjas4iNRgQkpo&X-Amz-Signature=b26ab6d29023a0fe47b0a79e3a328adbd1309f6d6b795f65e11f979eb89664d2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YBY4WYIG%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051655Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQCBZrgQgsSGkvw%2BMjwZ4A4s8rgT6KMhK%2FNtfYNoK1oN8AIhAImwzuQWd2WiklZ8Xc9wLEr3orlQ6Lc3ZawlkquXP2DJKv8DCCQQABoMNjM3NDIzMTgzODA1IgyqPq2UXf%2BYiSWPP7gq3AP6776hfMcA%2B7pNgng3%2FI9m9kzAxSl8gLfiHSQJr72AizSo%2BElEQUGHbBDwUbHpkt2ii0PQA%2F5hEPvbYCDCg7%2BC3XvWgzWEAMmSe7DZI6TKr6nQdba9bHt949QIPHsjmk2SXhB4aLGMlnn8LPr4cRxhdedrcXi0tvMZc%2B1En775ntW%2BpBeCOUaK09r74xuowTYoaUJ55o2VSN%2BocAO8QNdjWiKpYpU8%2BIW%2Bhz1SP1GPeYD%2BKaUrURzZD%2FYI40RqDJinTbW3g1y3fAfYgRJn9dH1Eas%2BhwNhj6HN7nuhiipju39oeq0wScZv2EFXR1lmUmjGfboToGxoNCctqgvHoeYCc24SgvPMroLCJCVrt33DMEV1CiZl%2BY6hAmRY%2FluQFArz6BV596lszy3AwAn63UAub3Qytv20yglz9xYYni14ZBIQ%2BKIyQrjXR%2FLBzw1KJ2zMZJYasEGrCQFheM7aL9zzSdUgvGFnKzSMvvMbiwiRkhDLSZ2yjodl0S0vdtpZqn2dOeBSk7WzBgvk29WGwL6%2BtQhTzUzC%2B8SycOaMIn6OwT1dWnnbztmeaqze5e1D7ppm1WSS%2B%2B%2BV2XN6rTJwBk%2B1GNwpgZ46Yfc7YrzEV9DD3ndAWAP0JobOh3hGrTCDpefKBjqkAeFuhBFNmglILbaWZlx9JJjE7dgTIsM9BpJdIzH5t20UFHs0Okmkr6mEeas0qNk72xFdf9gR6DXVGs5rzkR%2FNfHXT9ZJmPeHYTKLlp%2FDbeaWxXV1Dh6SREzv9UZNFG9ceNq8w4FBs9BBWpGGFsdo7wpicrtAARTfFrruMtNqJ0r5s%2FxqM4ukDHm9bybvnWJ4ooMZOZc6aZKaiHJT3EcYg95DCxWf&X-Amz-Signature=0696a3ebd3917604f4e25f800906c47ca6e2c652b377038cf85a8e20b81943f2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BL4KIP7%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQD5%2Fybwel3mv7cCJupvHbgd6%2BqLatBBZJPgHXlkZqI%2FdgIgIzK%2F6UXHUCaAd5kRdBytrG6mPmS41B9Jzx2kePp%2Fd9Uq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDOcLhp0l7gnOWILTdCrcA8QHhFPBu8sp6K%2FwKyyLyTC0MhHTJmtXKl%2BmPCC7fkzhIXZSjcMfjN%2FumDdwJLrzRw%2B3aAf8cA6r08B8z57YOqkusj%2F%2B882Sm4Sw0ggcLdQbtgD3k1Kh30aC8AEt00RY1xx3biOcjjmq7QE6IuCaLMxaSXkr2Mv1JjXvIE%2F5H3WNBbAPBqsmczjA7NqAdch8UpSmAdgiqbZVcX8qZ0901rh0%2BDrsmHn%2F%2FVfZXpyWtDtAoLMsJkpXz6L1WZq5xQ1GJwAJABoN8FO7c87B1EJatZB%2FKauc5ciEzvGQJ4bwcFlM1JJ7VLKQ7FR58e5k29GkMs9kRRnpnBSP%2BabRwq0khoIM7RPsdX%2BO2xnKcz1K1fkaz25JgN%2B7v8Yq4%2BlfSdp%2FcddINxAS48Jxgr9XdGzkXjs5NekjD8XAnskuzsxBATgHwkq%2BEZBaTFVNT%2BKLvGc%2BJN%2F4n0JFxw%2FtHDsK3ia%2BMPbzrnfmrz1mpd55pgJKzegiT4HMee1MXzkAChvhO3FrkyCRB7lLP2983O3WyJgU9I2DUbAQyf0TmvNK07S5cnod7Rd0mnCIZIC9qXjEhOiaeSG4TSu1GwI7FHPHUtmG0RsWaUZdfqOY0b8FrAjNOCAIld3EPMGe6Fua%2FQRUMJmf58oGOqUBS1zNa9GvQ5ibWbIohk9g33zMrQocipUvvHd%2Bi1hJdmAchkA5HyovmJ0%2BJFomXD%2FqJ6IiV3uxM3lzQJ2m3Udgs3C%2FPicxVyad7tiZwuqoPPfJt%2B9A4DmRmuEPdkTAfw%2BNbNKIllTXkNUDDkdMgnncrJEA%2F6TBcdpUk0auogS78FoGUbNPAJ9G1EEu0sky9qtzlUMQzqkr67%2FVMoQE07%2B9HNQFRasD&X-Amz-Signature=7390fdbd2cc9615e851d4302fa18a3e483fe31971ed53450bbbced4278679fcb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666BL4KIP7%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051701Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIQD5%2Fybwel3mv7cCJupvHbgd6%2BqLatBBZJPgHXlkZqI%2FdgIgIzK%2F6UXHUCaAd5kRdBytrG6mPmS41B9Jzx2kePp%2Fd9Uq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDOcLhp0l7gnOWILTdCrcA8QHhFPBu8sp6K%2FwKyyLyTC0MhHTJmtXKl%2BmPCC7fkzhIXZSjcMfjN%2FumDdwJLrzRw%2B3aAf8cA6r08B8z57YOqkusj%2F%2B882Sm4Sw0ggcLdQbtgD3k1Kh30aC8AEt00RY1xx3biOcjjmq7QE6IuCaLMxaSXkr2Mv1JjXvIE%2F5H3WNBbAPBqsmczjA7NqAdch8UpSmAdgiqbZVcX8qZ0901rh0%2BDrsmHn%2F%2FVfZXpyWtDtAoLMsJkpXz6L1WZq5xQ1GJwAJABoN8FO7c87B1EJatZB%2FKauc5ciEzvGQJ4bwcFlM1JJ7VLKQ7FR58e5k29GkMs9kRRnpnBSP%2BabRwq0khoIM7RPsdX%2BO2xnKcz1K1fkaz25JgN%2B7v8Yq4%2BlfSdp%2FcddINxAS48Jxgr9XdGzkXjs5NekjD8XAnskuzsxBATgHwkq%2BEZBaTFVNT%2BKLvGc%2BJN%2F4n0JFxw%2FtHDsK3ia%2BMPbzrnfmrz1mpd55pgJKzegiT4HMee1MXzkAChvhO3FrkyCRB7lLP2983O3WyJgU9I2DUbAQyf0TmvNK07S5cnod7Rd0mnCIZIC9qXjEhOiaeSG4TSu1GwI7FHPHUtmG0RsWaUZdfqOY0b8FrAjNOCAIld3EPMGe6Fua%2FQRUMJmf58oGOqUBS1zNa9GvQ5ibWbIohk9g33zMrQocipUvvHd%2Bi1hJdmAchkA5HyovmJ0%2BJFomXD%2FqJ6IiV3uxM3lzQJ2m3Udgs3C%2FPicxVyad7tiZwuqoPPfJt%2B9A4DmRmuEPdkTAfw%2BNbNKIllTXkNUDDkdMgnncrJEA%2F6TBcdpUk0auogS78FoGUbNPAJ9G1EEu0sky9qtzlUMQzqkr67%2FVMoQE07%2B9HNQFRasD&X-Amz-Signature=a1d8291d7d15c9949f6e5c8178149f36a9eb14c9fda81abce635fe1ba049a45f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466X6ANLDO4%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051647Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIEok%2BQ%2B0m%2B9IfYmIvEcae%2BTOpLpC%2Fvd9Jvhva8F7t5URAiEAo9lrRdE37tT90M5N2LhbnInf9vIBZyAing1W9msj%2FSMq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDPgWOx52Zfsjt0ImfCrcA2%2FnjOqXX9Pji7peWyu5rfgJ56gr7o6EE4sUgmOF46tDCaDwsHdHC%2FRvzIP0Jj9s%2FKVzCxhxFZH0loSggb6du%2FjE%2Bb%2BN1EHyLnlFyL93Ws8R9gQ2h6Aqi6zXsbBq72xpK9FY7PVURTVsVw1dTmOErSgg8OHIiFlFG77T%2BcUxad37npDD8FWfCEcnztVvzCowceQdJapogM5wY9881iVNVU2oc0mZef3ATh7jQHhAolrLRI6qPtbDbR6mjHx%2FHJnTwyA7WcxHX99gwA8kwYMRDbS9sKvnW54uF4qt5SQvXoOOFiDUvLu4rLor2UPVA%2F4ntbdD3s8erOykKeHs8Y%2BJdLdaO6B6lRKsGR67iML%2BPV36V7svTMBL%2F8v%2FP88Ajlpj50LaiAEwZmFFYwbJMAIoFEDlejYEqgJ4Dp4wtNCPupm%2BIc4qGOe%2BirdU%2FRy%2B3oU7ALKLFCjis7HdiOW4gsFjoxktYc7dv1FgDp7L0ZPfMSuL7HNGR%2FdKjMPWg0sLWlf0zAysxzBU%2BO8McFUhbda2F2PeUx6M1VVjOeopWdTRgknuJZMG3RKCx9CxRgSl2TLF62THzZJd%2FVXrd54TasWMqax9R1hjUQXgTPNAKfy5XTyI%2BhBMrhQ9Ht%2F56tPPMLa158oGOqUBeIJkhLKGPVZd0e7j1YuN3AXWEDM%2Br4FJwYkirhapTGtqB7dzMSWt7Vysj4QymCwxz%2FeJiZj1cc2bOi%2B4BzK6J3CGabnCAFBSV7PPtcs2q6uDbOc0Zc6%2B5ZdAiOKCNSCnXe%2BD4Y%2Bm%2FnV%2Bcbwcf7V2VjY%2FZGiGjDIp0uJoHHePVUea2rstYbXSJJvLuBRJBOQTfa3QVk6Qnzg52WF0JzYa6lohgdfa&X-Amz-Signature=3100f16b11298f6eee1e5491f99bb77f0823bf1ca3672dd8b8e00e2e1e179136&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLW2M4RQ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIHbK%2FVXbcxrrw6QnL0s2yEIAUNGkhkRVWe8wVHBCzdXFAiEAiZ%2B7vEfpUf3VSLfX8t1wzQw1RerB4mwBTBlURSzG6UAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDEOB2Q%2F7hprwK8OTvCrcA311ov3nxzqxHJhOpWRkqqp%2FfLw%2BhdGj5ZhkD%2BeMpaNRG%2FG4xlx7h7qRrvwX8Dz62HXMOB8umTn1b%2FgoRhJbq4evRwIblt1%2BFNqpBKhFLXvZzF3Aqjtdj1FCa5eXkClB0pcp%2F%2FH2pV6Os%2BVJZ2rhSovNc0I2eRhm2YbV63miQ4ZUlRV3aVNrFoSYcuA7k9J5AzEgSBqL%2BZnLex79PZbBW8l%2FSPzexBgFdThHT418D%2FU7ifF%2BdFqcyDV%2FMD4E2Vv3WcGyi47o%2F89SkC4tRHXL21z18baum5K6OlipbXTE1JROP6pdTeSLMibZhdljP%2B%2FYNlhmdG0wwnMJHp29opJ5uR7B66zl606a78QOCMXIlk60MejnubgkBtHBwCPjjUkNOpTBuGHQ%2FXPPk%2BOb6RItj0Ti7w8oBd0s84hSUNTGUeIZN%2FFNl5fzE9XH88SHovdzSRxqP7QcjFRfg8HBNehmnB2IyfYJFFBwvyqzs09G%2BIOTbMknLC0yCEAQhLCOUyvK9%2BUITH4azSbRG9BtsEcl6rxPK7bYxacC%2BNn5lHadMM5Rwd9hqriAakldbaAtNzeZUhYjMYKfpDNkGBvYNeDKEeJ6TmNmmkpFUGzRX6jsMLzwJT7arvppTVXkZQXoMImq58oGOqUBLoCnc7%2BBYXFR%2FeWImHDmzw09KKgHj%2BZy0XLyGsIVniNDY0spj2UT748ioXroKiEgSPDCM8IN8idRspbUtM0xQ9QoImkY5pMvhssq0suAKi7CbDtQaw9XiB7IHUspch1OXsR97wIg%2FPRFl7pzcjC2sBKvl4sMsyryfHUUPtxh%2BcCbX7rj9oFQYNfUBJ5JkYkuFAQ0495EoDcujTT2AUdMSLy2kahE&X-Amz-Signature=3e852ad3e5c0aab0bacd7cf0959e283ba50ff0c4f194089909be7220c7bd7b57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RLW2M4RQ%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJHMEUCIHbK%2FVXbcxrrw6QnL0s2yEIAUNGkhkRVWe8wVHBCzdXFAiEAiZ%2B7vEfpUf3VSLfX8t1wzQw1RerB4mwBTBlURSzG6UAq%2FwMIJBAAGgw2Mzc0MjMxODM4MDUiDEOB2Q%2F7hprwK8OTvCrcA311ov3nxzqxHJhOpWRkqqp%2FfLw%2BhdGj5ZhkD%2BeMpaNRG%2FG4xlx7h7qRrvwX8Dz62HXMOB8umTn1b%2FgoRhJbq4evRwIblt1%2BFNqpBKhFLXvZzF3Aqjtdj1FCa5eXkClB0pcp%2F%2FH2pV6Os%2BVJZ2rhSovNc0I2eRhm2YbV63miQ4ZUlRV3aVNrFoSYcuA7k9J5AzEgSBqL%2BZnLex79PZbBW8l%2FSPzexBgFdThHT418D%2FU7ifF%2BdFqcyDV%2FMD4E2Vv3WcGyi47o%2F89SkC4tRHXL21z18baum5K6OlipbXTE1JROP6pdTeSLMibZhdljP%2B%2FYNlhmdG0wwnMJHp29opJ5uR7B66zl606a78QOCMXIlk60MejnubgkBtHBwCPjjUkNOpTBuGHQ%2FXPPk%2BOb6RItj0Ti7w8oBd0s84hSUNTGUeIZN%2FFNl5fzE9XH88SHovdzSRxqP7QcjFRfg8HBNehmnB2IyfYJFFBwvyqzs09G%2BIOTbMknLC0yCEAQhLCOUyvK9%2BUITH4azSbRG9BtsEcl6rxPK7bYxacC%2BNn5lHadMM5Rwd9hqriAakldbaAtNzeZUhYjMYKfpDNkGBvYNeDKEeJ6TmNmmkpFUGzRX6jsMLzwJT7arvppTVXkZQXoMImq58oGOqUBLoCnc7%2BBYXFR%2FeWImHDmzw09KKgHj%2BZy0XLyGsIVniNDY0spj2UT748ioXroKiEgSPDCM8IN8idRspbUtM0xQ9QoImkY5pMvhssq0suAKi7CbDtQaw9XiB7IHUspch1OXsR97wIg%2FPRFl7pzcjC2sBKvl4sMsyryfHUUPtxh%2BcCbX7rj9oFQYNfUBJ5JkYkuFAQ0495EoDcujTT2AUdMSLy2kahE&X-Amz-Signature=3e852ad3e5c0aab0bacd7cf0959e283ba50ff0c4f194089909be7220c7bd7b57&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S4RPTUTA%2F20260104%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260104T051708Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFsaCXVzLXdlc3QtMiJIMEYCIQC7yVN3gujQt0eioPXNbe9J5rUenlFHqpuaVK5IdutdlAIhAJjHfbLdeFaPqStHAQXDTvLk%2FkxrdpMBryVK5ZqjF0x0Kv8DCCQQABoMNjM3NDIzMTgzODA1Igx29hdGa4YbTWPc8tAq3ANTqqhUAJLfR3dVysB5mBAV5xkzE2wtCTJiUJAzTZwD6%2FPzUWoP3%2B5nOanLmodXgHt3kd3DWPYIND%2BcswxbRaSd1iroZe4CCbdszcSq151dZlPe98d%2BCOEZhncGcLlqseNd%2FsubOEb1vdlGhlhuzR17YGbA%2F%2FVVHWs3ufuXt1SR%2FxxvsdQsNu0syM2tqb210ZYE1XBCUgNYgevX%2B7AWxZmUIHsAigy8LmmR2tyH4JiaN%2Bo17KUSzW7F6rp4c4%2BxgZHq%2BjVQfzgU2%2B%2FVR%2BLyw1wVrvqjoOy5Pp7FNiT05gka4b0kT2NDEJGjxyHFe%2B8E2y7ZUhYMye%2FE1SAg6psr0dPq%2BlsRkJTUU5AwVa4m0RfsXx%2F6yzDtyhd0OAgG%2B%2FtRR1UOj9vJtWlnD%2FCGVpUhi%2FX6isuSgIg0exgMKeTAMkEKOS1p6lA%2Btx7rvxRzIfBIeCON28%2BGI2VA1gmCcu4BaTzsnBtGxFdvWO4a19gOXkefHL6L9kbK4wV%2BlOEHdxJ%2FizSn5cK5Lr7BQXj%2BRK3BlS74OUKFKPQHYbj3Czf%2FkUTTgbhpDb3JbTp6wD4mmjvTLQu%2Bd7xlqXKZ9k9A%2B52V86ZNfJikHFCDIXV3EHmCj%2F1rGn6a11TtPbIhw2qjCDCFoufKBjqkAVBUo2RPwgntIQZVGp%2F4aFQcY0BOXEs1FS1rQhHt6WXnyg251vEyGrlt8pxZ3w9l%2B9R7YAPg8hLNNRxOqqpmDCnw06TrnpDbSn%2BYT%2Fh18zdcpqPEv6Gn7bAfJxKyNATPR0iPtq6LrbVXcNOFGlTA5IFeCqZ00JzWEHsaloqBaFJmg58cenvqu7%2BmwVDzp8tAXLyGYihDIsWBCRl0cfUwo3hNc4ph&X-Amz-Signature=2e9580ef2ff3c4dcd2237630e2e424dedf1dda315a4f2aafc93ce03f7d9e6f8d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

