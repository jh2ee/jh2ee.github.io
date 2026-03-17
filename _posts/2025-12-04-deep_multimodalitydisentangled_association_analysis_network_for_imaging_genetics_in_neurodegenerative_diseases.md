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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UADFCFQQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCICP1hf4VcvhfHSeLJb2utdTJJPCurjX3RIiUVNWw3Xx3AiEAsgBfBW8bWXVooFtk3hdDcMlIPUl2wJiH14sakftlPC8qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGoS1lqmeMOOEVPzJyrcA4v77yeQ%2BPuo6rLnzRetDxKKYNXSSHwPU57FnCzcE1m%2FCPat7bAXVez8qMqkPjgsIqt2xZ0YaFxlz1JoLFjl0TPt7Xg7JFBjOCX%2B9LMgSV62qT%2BhfiUJtmT5vBoqjfn%2FcRVlrRRa0fDpImw3vZOzDXL4LigBbqK4l0fW3Zma75ykIKdXA0klllXQdOzSxKUN6uJxXE4229WOfr9%2BRyghVPQJNTjL%2BYtJ7c%2Bwd96x4DeG0hOGtjVhkuz8WzmyR7OvtOzIClhoqeWpwZrAxD6MpTZKPgVohp6y1jJNnbK9glGHtK%2B8%2BpEyOmocZVjMHsqRbvanVs0YBKA%2BPwn9eGdPfEfAuFBDVWUQ0vrgGyyw4kM%2BrD8AtwhlWvo1VLcqYBEy06nKLlqGxFd78nLAHexxa0fzOCIG520vvdX4MPVG82JcLXw8RiRK%2FC3kK70l3hDfM7yhlun7vti16vjL4135GHcEGZHB%2B6nlaRXFdrHUoM0rEvGuGw4bWr3ywDx4l1DRNWVlBank5Dd3%2BcvgViny69YSUvGa8KLs1gUaZk7exBPfNIhcMjPRteGOnv6BV8DhzgY%2F8OuddIpa%2BpCVhDk%2F9Y69EzfjOvocImXLudsv%2FjnHm6ed65ydMTjUTemjMLuo5s0GOqUBb7Oq2cEW%2FNfnJkpxN%2BhbJJkc86pCYMp0x62LF76jng6gyP%2BgshUQm814jMV6CDyG8xqxma31%2BTMP4ybGi%2FA4fVH8tXTK0Cd%2F8c%2FVvJ%2FKxU9U17p%2F14lO6I9gRTauM1ZhvRfgFxk1SDQSre7Cr%2F0ihMVOhW3enyP8bC%2B76TizT2ZUmbFBkhU12fTn7mAFzcE57%2BkILgTl%2Fwkj8czvdmIbwZzrV2hM&X-Amz-Signature=91c6dc5d49b96eef3b43403a9f0fa33859099e7081d0c184831d8c00be8ba640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UADFCFQQ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCICP1hf4VcvhfHSeLJb2utdTJJPCurjX3RIiUVNWw3Xx3AiEAsgBfBW8bWXVooFtk3hdDcMlIPUl2wJiH14sakftlPC8qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDGoS1lqmeMOOEVPzJyrcA4v77yeQ%2BPuo6rLnzRetDxKKYNXSSHwPU57FnCzcE1m%2FCPat7bAXVez8qMqkPjgsIqt2xZ0YaFxlz1JoLFjl0TPt7Xg7JFBjOCX%2B9LMgSV62qT%2BhfiUJtmT5vBoqjfn%2FcRVlrRRa0fDpImw3vZOzDXL4LigBbqK4l0fW3Zma75ykIKdXA0klllXQdOzSxKUN6uJxXE4229WOfr9%2BRyghVPQJNTjL%2BYtJ7c%2Bwd96x4DeG0hOGtjVhkuz8WzmyR7OvtOzIClhoqeWpwZrAxD6MpTZKPgVohp6y1jJNnbK9glGHtK%2B8%2BpEyOmocZVjMHsqRbvanVs0YBKA%2BPwn9eGdPfEfAuFBDVWUQ0vrgGyyw4kM%2BrD8AtwhlWvo1VLcqYBEy06nKLlqGxFd78nLAHexxa0fzOCIG520vvdX4MPVG82JcLXw8RiRK%2FC3kK70l3hDfM7yhlun7vti16vjL4135GHcEGZHB%2B6nlaRXFdrHUoM0rEvGuGw4bWr3ywDx4l1DRNWVlBank5Dd3%2BcvgViny69YSUvGa8KLs1gUaZk7exBPfNIhcMjPRteGOnv6BV8DhzgY%2F8OuddIpa%2BpCVhDk%2F9Y69EzfjOvocImXLudsv%2FjnHm6ed65ydMTjUTemjMLuo5s0GOqUBb7Oq2cEW%2FNfnJkpxN%2BhbJJkc86pCYMp0x62LF76jng6gyP%2BgshUQm814jMV6CDyG8xqxma31%2BTMP4ybGi%2FA4fVH8tXTK0Cd%2F8c%2FVvJ%2FKxU9U17p%2F14lO6I9gRTauM1ZhvRfgFxk1SDQSre7Cr%2F0ihMVOhW3enyP8bC%2B76TizT2ZUmbFBkhU12fTn7mAFzcE57%2BkILgTl%2Fwkj8czvdmIbwZzrV2hM&X-Amz-Signature=91c6dc5d49b96eef3b43403a9f0fa33859099e7081d0c184831d8c00be8ba640&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466342ONF6G%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184124Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQCV5bNJR%2BebSi5BLiyJitwvJDRdoVWeW%2Bs10j5H%2BYTSQAIgUCvkUAtWpS4x6R%2B%2FHTW6Vwx0KNa0nY3xElHEq1tqohUqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDF5YCCW2fQbaCqxt9yrcA4yAi%2BSIPUwvwU9s7n9kehcnTvpvsHGqKLwY7wXl0VAesjCM9pfZBqbZQoRuHKDtU34hfZs5kMsyWfAHnk7x%2FGPVv3gl53KxGzJcgzNhwpFR6pGXYa2%2FW3c%2BghUBfi2j52QTZnMv3XUjVqBiZnP2lpaBUmeg8iAifSDpyoSKd7zxwO7Dzd0EIcTj1EL%2B9YbiraEaY6y2wLaZCLM6AXk0%2FpDyeTmuZYJmz6%2FQrCug4FN9k6Jtc6bwg8%2FEzIKTfjeDD1PRlKiv6n5nzGYh5T9AeQU7umxY1N95kc75%2FkyKxR%2B63z9wpVq6KJe4%2F14n42f9C%2F1WGMCf2SBymURjt%2FXTPRVeQqskT9HeTPRpzPQ0n2k7XMntWb4J5jsAcIRB%2FZIqhPRJV54Db9our0PQ88Xt8tllFhq2QWpSSkdIs6Hx0aOWgcZ4%2Bq7yj4wfHEk1V0kih6SU8RnMVTG1yU580VIRSRJJYDp%2Bz31chgK0zls8a0i3HQq%2BdzO1YX2ZXskL0tqvFqFXUsPpza%2Fnf%2BTIxHO1fb84nRyg9XPgUnUIY5TWVA2BrsYO5sFucLIN6ZUCoWaQc5gVmct2x0RVGF3WCXUn15U8W2HzQYfHLYPbFmBheSp%2Fyd93Dcnj4u361dUpMJ%2Bn5s0GOqUBtKid%2FE4nj1KqD70Q5hnr66RButshfMyo%2FuEBkojviQbd6Rp1vR5vWIRBHCmRZOFClAq7VnAoLNIpiEGETZk4qnrmSoOPuar%2B3TB%2F5YjpWskwU0BQSJxmVQCyJLfQ8CktmlmRRpxoUyzsBdC85Wc%2FDcHorIVVPdEBkDcp1vHE4EZgDGjjnOPD3UiWVEgTNeepr9XVQmWz20BC6Si8d%2F9ntRdJwXHL&X-Amz-Signature=d0db4e6b33fffb3dc49bd039cd82e4006382f699d3af99dc66e97a26bce3058c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3A47RQC%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIBwSLl8162sQDUDl4QlN8EDfE1FAx2BIFGCg8UW0h2%2B6AiBtHzgklz7kevZgFriI9uB26pVa3ln7FAIeMuEAUj8r3yqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Bde6YHPUzJ5NxCCIKtwDcGk3NID5bvmGM%2B968MV2GIaQl%2B7Obn5WF3xiCXbDcw6ZVFoJsblEMS19pHvMRuOVNtWA7CRg5Is6MyZ9yhrmVIGmj9mJYt8sCpkY4OHqF9HZS9uL%2F7NMving0SOWAHWoFmoSHsulRajYBU%2F8FPqQIEWmiVGGt%2BfXPNOYeLCe9k7YK97KoqXFt2YAh3KB8JHMMzd0Z6%2B9Jn4kAyjzKShZk828WyBRUh4UuxDS8SFtAragiaA4vnhqxbO5AyWsULj59dhiP6%2Frx4nib6glc3NRHTXRaOLYeobjds9GNV9Lajoo6W8HWOOWlsRa4qoLb026ipzKuZc%2FlwPWOiJHx3lv4irs65pZFbB0qIQ2btfjvA4%2FAkB6kfFLflskVSVilSPhLDOZUHY5QklDr6TpQlrSCYzN6FCgQwlTP7gCAXALruCWHFZjB69jS4IkaguhOB9hHmC5ddWNT9F5zGulVHdYkQ%2FZu5YIEiaJciGI6WNrJIuTWgsPO3b4kpInlm3snuE4SND8FFHfCtusV1yReG0im4qlfc%2Fd4Gr6w3jO0HioudSntYt%2Fg3qJqkB6vo6pI4LkatrC4GJaTDGMk24NAP979soItIYZSyrTEDBVU%2Fmu0uWf4xqwtUjE9CQi34EwrKfmzQY6pgHk3WxwJBP6XvZKzIDqmMzlBOQTxN2ObZHrCuF9UKq3lBzRep8eu2ugilDlakgnyzUAs1Do3VgHwbdyE%2BQV6lQYfEKsDJRLBZQH2JNZ5ZN1ProwUP62aGciX00pC94DoQgFhNI%2FOt%2F52TpJxH6ZWw4AA4p41J%2B%2F2LUnaPJCB60EdeDhmdQE3rbmri0olmxZDu33MYOzPXEN%2FaFK10g0S2zlpMuKIFGc&X-Amz-Signature=cdb38f786dc1c5b435ad9ed505346213c06e703c117c48374d1dfe789775d586&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466S3A47RQC%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIBwSLl8162sQDUDl4QlN8EDfE1FAx2BIFGCg8UW0h2%2B6AiBtHzgklz7kevZgFriI9uB26pVa3ln7FAIeMuEAUj8r3yqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM%2Bde6YHPUzJ5NxCCIKtwDcGk3NID5bvmGM%2B968MV2GIaQl%2B7Obn5WF3xiCXbDcw6ZVFoJsblEMS19pHvMRuOVNtWA7CRg5Is6MyZ9yhrmVIGmj9mJYt8sCpkY4OHqF9HZS9uL%2F7NMving0SOWAHWoFmoSHsulRajYBU%2F8FPqQIEWmiVGGt%2BfXPNOYeLCe9k7YK97KoqXFt2YAh3KB8JHMMzd0Z6%2B9Jn4kAyjzKShZk828WyBRUh4UuxDS8SFtAragiaA4vnhqxbO5AyWsULj59dhiP6%2Frx4nib6glc3NRHTXRaOLYeobjds9GNV9Lajoo6W8HWOOWlsRa4qoLb026ipzKuZc%2FlwPWOiJHx3lv4irs65pZFbB0qIQ2btfjvA4%2FAkB6kfFLflskVSVilSPhLDOZUHY5QklDr6TpQlrSCYzN6FCgQwlTP7gCAXALruCWHFZjB69jS4IkaguhOB9hHmC5ddWNT9F5zGulVHdYkQ%2FZu5YIEiaJciGI6WNrJIuTWgsPO3b4kpInlm3snuE4SND8FFHfCtusV1yReG0im4qlfc%2Fd4Gr6w3jO0HioudSntYt%2Fg3qJqkB6vo6pI4LkatrC4GJaTDGMk24NAP979soItIYZSyrTEDBVU%2Fmu0uWf4xqwtUjE9CQi34EwrKfmzQY6pgHk3WxwJBP6XvZKzIDqmMzlBOQTxN2ObZHrCuF9UKq3lBzRep8eu2ugilDlakgnyzUAs1Do3VgHwbdyE%2BQV6lQYfEKsDJRLBZQH2JNZ5ZN1ProwUP62aGciX00pC94DoQgFhNI%2FOt%2F52TpJxH6ZWw4AA4p41J%2B%2F2LUnaPJCB60EdeDhmdQE3rbmri0olmxZDu33MYOzPXEN%2FaFK10g0S2zlpMuKIFGc&X-Amz-Signature=12f02b0d68e87f9a5c80b0bed47824b2f9569ff8e91fd08988ea17fe22f00686&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662CQAUKGJ%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQDR4jzR9GWEDpxq1DkFW4HAZ7T2cQ7uf0EMDgOjq502ZAIgG%2BfbHFXZxNFje9epL0SU6o%2FGqCDInqPg5wvWxbV7k0QqiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDKN2HOfB7WKSHBATZyrcAwlio1c9zL0M6eEOX3CYaNlaBwMpBWk%2BfjBfz7KHXSZnetQF3rtF03tE6ckwZCyyyA3LK5D8StxGI0MUKc5UJuIgnXZ4B9mjJWb4nphd0L2Dvd8iRUJHyaQptKAVOU2PAc51NtMyBWRuH11RBppcpYe7AENozxYFIR3c%2BC39o7XfRcbEPn6UD1HTQt%2BNPb5X%2FfQHF6awxFaefWi2mWQ24ZsZmKGIbLo8WNnLe3i2ojhjN4rmfVZqmBhQLTHLIh%2BVEJycdPw%2BaBqON1gdrAqDluk5MeItebmzo5PCD1xn7MyteirrH%2B8g%2BvmsJfJcMcsOzuK3eufPohLrWVw3yjZW0uaNKSswwupoDrusNBuHR%2BFcdXXkGH3lbVwANmD6h3H%2F%2B1B7CDDmDQ1EKKjWs0kiBj7wZyCTIVol3YScPHlfzlwaOMJAB4ycCpczagCsfwd2FF2sMk8T2uMleS%2BEzddAPHhFP53vQJg3tp1MAfCen9KhEDPabhLsVIaokO8fPLRVxXYh5h4iqfNVaeZ5Uno%2B3n%2BzcBpiuQq4zzd5d5%2B3y%2BoRUfk6wIioBrl%2BhvFAAcMfYlR%2BgHcJsmWj4S%2BUySXo5Hp%2BaKldzaHzpVeXWcdk0W3QrG%2FMqzBBL29Gju2hMM6o5s0GOqUBr0ejQEKRXnhlDjHfX5snLsi3hPi8nsmE4bG09Hn0MjILw2hdybbPRIOwwQoSHFNcNTpoMcxm1YGUsK9RY5rUYxISoG6i15yniFBgIkdCB5zo4HL8wdi%2FGoiDDOWDkABmpXOiDLb%2BW0gnjT09ZL62Ti1jm111T8wQPpyQWlJceM63wtW7bW8%2FsP9eGvkFQRLwa%2BgOCEW%2B3ibhx7dSsYR0vAc%2Fd22E&X-Amz-Signature=2a72657359c9fba9206298698ee15663682f43c9d264c4116a76b60a9fff50b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VWB7N4EF%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184127Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJHMEUCIQCcXUvzLRyHpEfanLStgf1pSkoDXDADNbuN0m0z7Q7isgIgX3sXu7OMD7XiinD0ZhSYFpq0pLKgj7373w4UK%2Fo8fe4qiAQI8%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDJjdyR42I5J9WsxotSrcA91ama2696TayvHvnN3FvXwU8xLyqvFOJAj0S%2BQpCnzIfAPpWXaXikkSqT%2BdRZ7xowyZAqgWogM1%2F4nq0YvDOpgOAkTgCroFVsSX8k5YocyEmwor%2Fw0k8T%2FkM%2F5WceBdrwsyarDldQvAT4Ba%2BVySEmz1uR%2BU22Fp4qM%2BRcy%2BSeaWsrezVNNK0SgrCoS%2BH25UCk31h%2FEJbPePmzkPqXpw%2BU5WbXoqidkZ%2FlWrlvd53Fti2AWHCklKvH422V1h%2FTxun5X%2B46T%2Fbjf0Lftyn4UCw1Cl%2BChwK3pSBoNuXega9i3rlFKJ%2FDhfZmyml8kfhJu%2FIq%2FKbdrjboJKDGqyZc7IrEGGKORIbJqL%2Bwh44oFbqm%2FN5B4uGQTFo2q32aS%2FCL59U7jwG2rPW%2FhYPXfVygEc%2B%2FevUecVDucN%2BSmVI5guguNJ63cdKyK10%2B0NmyLTOdW3kztU87WN3PJKYGYieFv1spl8UUvxb33IFlQxGOAycCZk3pFfVY%2FPf1KG8%2BoqJYqA5zLSh%2FSWkmkFB7t1ICj57FLG6jowqy6bD%2BwbVosDy%2FASRSpbp3%2FBXJPAzGm9fx3q7%2FV%2FaZUDts%2F%2BbBX7ZOpFwzA2Za8OhfpdRQkMjFGwXuwnkL8szB7bPr%2FPdf5pMI6n5s0GOqUBp%2FIhJuHd5rH%2F%2B04GPavIoYdFqrB7aVIP%2F1ONIH9AYoyTvEJlj5V8igNSxhuys%2ByFQ%2FvA2jqU%2FHsGlsXEZAqXH%2BMDNJkyjW7pgor%2FItna3E7iGXPgR7A789ZCsInna1BByTbysoSdhFdD9PURq9PjJN90kMN2%2BWgI7qk9wCSn8V%2BtkYHBoUpHEIaLsJrqOIU2xlcIlvx9QHd%2FEHo9PfHYQzeT4WT%2F&X-Amz-Signature=3bf74b9934ae6db7f7694abd2f480bc496df7af60ccf4949c7b2016bb04743ee&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SISCPKW5%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184128Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQC2x2spQLHq72HonGH0kwu13qSgs5y%2FEPtJSZDsYohi5AIhAIwLKzUoFvVzO%2FN96ydDlPWw26oaIweSP6AExugA6sZLKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwtcN0YQ9L6wnxqbJYq3ANT3k5OpcV69CbdVpoe7NJo6e1p2MCJoQdY3%2FPUp0zZStSFcWt7UJx5SPygbElFpqqQFOBi59E4QsxuBMMp5f3yFexH%2BAXA4QOLvZGLA7N84IBoMlbCdTbEthGLauAiaLEquoymykJBzXkELf5Pq6AV0DBAoXDllnAMMnLUv1SwD8%2F0SkjZiis7Pjp9tec3BG4vRYD%2Fci%2BYoCgY3pEBcP5G06MEj7teTXTve%2FtpHSrJuTPpodCxaRbSE2WqW7U2Dojn5KUaCAHw5s8URszyjWpAVZOnAbn3tJ5sD3BEfH6G8OO85TcXr41v3K0%2Bctu24ZEwi5Kk7RCdeYUki9uVIOrtrAHxy%2FspZCHNO4y7WvK1k4acoCFqXnwoL%2FPLYS5DWFst2q9qNpGzfe6Sj3C0UcSxQvKepyJqaLxXN8sG4kBpt8AWC0pG9dLup3ce6Q99PuVZxdJlIQ%2Ft9YDBA6fWDbNfzBhPE7YIayczfnWrfMbeVatAX8B6kPC71XJho0CpIYy0sqjrsKXvgiDTbSJFMjWVtJTH9t84ceEzpilQGSRh5T15KmXPVFuwwSTiqRys%2FQ4ky791mMUlBdHpC4VoxduVVjpKJqrQG9gVbW0FP%2F6ZVjM7pHmg2iwu5JqsGDCkp%2BbNBjqkAfh8hIx3wm6vqD818vz7FDVW0dJf%2F%2FjfihhCmWV6itqBrAoxmGDeFQsgJoXbgfM6TUspvmNkquV8ePJFBqvGc9w4WXjZ773owcbY8r7QRsBm9CY1LZ5Gy63jh9Fsdlbt5232TLm%2FLKBCjBcvvcW1CZEFvKWhgIFw8USKpnZDK6iewRiL2KGtdcJJmJpQzILNBo0y5B8OuGHnOoHdjo%2BfXpDTGTM%2F&X-Amz-Signature=152289f7ef352a2db08c4d40944d3ecf0eaef26d6e47e925769a5e8142d9cd43&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYWBUUKW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDsKVVF5v2f%2BQP%2FrIILn%2FFqx25bz9c9Z4jfLT7F4uzlsQIhAJWmtUDmkqZSDX7AeNNdBcZxcOxjG4VXdb6TjojBc93CKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyoNX%2BcKrgrxHR7XYYq3AMh5AR%2F538jjKIxkPy6ADNuv3kagj6c7xgD9v9CrsuyJgURXQf2VYI%2F5EAY8sq90JVnK8rYdigC5ysC52dSSGj4daEuuq3mjGv5W1e067IBrBskjhJMy%2BRfHGKuYTjfaplnXMLADSx179sFfxjqAbruP978wqjM73L9WwRCAN15LXY7gHmdsqn4n55cO%2FPetUISuqoe87FZayeRFxTDsbI9Nk3p0Fxx%2BXjjbdMDhRhJLElpc9f8uihzKYGO8VlBI9oErgPtSG8dqO3Nt24ZvFeZ%2BL%2BbSL3QqqRk7Jugu4WR0%2FP3oFLJWaDP7yYzb2db%2BVcd4HJCVkL6LEaSG6E%2BaVY2O1YvK1bgqMg5dFRJxt%2FE%2F%2FlzQ%2Fkz9grWUeeMezdUSxvYeNQ6%2Bxt4vRmDduTARy1u%2Fw50PL7E0bULJzKa0%2FoegMXY%2FzOGy1YgHEBw6prdgkzupIp0f44dC4V13rIK26I%2BXXtQazTQ20ibNaI%2FkP8yiCq7KiRm%2BZ8hZYBAPzcnN%2BCuQ8zaZWMBnFJG8BkTjkaATplEHUNHjOCD3iyEuTqXGKqlXLf2Ynu0Odupt5H30x7hFnEgtgKsYjZHdmcuSPlWsQpXZb9SaUfi9Xl%2BkV5zlM5kP%2Fo2nqlcQ%2BSY4jDmp%2BbNBjqkAS4XapZTm0J8gQNEkv6pzwdjfSwuTtmJ39O2UZIuaqJxwqMmhfGltFl0KSx%2F2UNSBXVRIhiws7atKnE6GaCsjThfhtcPURPYE1WUX2DJgXS8waFTq6vLmiikq%2BFJllxSZr4MQvWsd%2BjkUKNy%2FooFW6y80ahZ3bdpK0EQB7y2Z6uh0vpJ4Ca0sOayIwU22U1p5OkjUP%2BpXvsuiRXqSESOyEmtI743&X-Amz-Signature=c72958277e016e8d5fb440ad4b6c73dc39fb55e1e940f7c50396cb1a328a5bfb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WYWBUUKW%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184129Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDsKVVF5v2f%2BQP%2FrIILn%2FFqx25bz9c9Z4jfLT7F4uzlsQIhAJWmtUDmkqZSDX7AeNNdBcZxcOxjG4VXdb6TjojBc93CKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgyoNX%2BcKrgrxHR7XYYq3AMh5AR%2F538jjKIxkPy6ADNuv3kagj6c7xgD9v9CrsuyJgURXQf2VYI%2F5EAY8sq90JVnK8rYdigC5ysC52dSSGj4daEuuq3mjGv5W1e067IBrBskjhJMy%2BRfHGKuYTjfaplnXMLADSx179sFfxjqAbruP978wqjM73L9WwRCAN15LXY7gHmdsqn4n55cO%2FPetUISuqoe87FZayeRFxTDsbI9Nk3p0Fxx%2BXjjbdMDhRhJLElpc9f8uihzKYGO8VlBI9oErgPtSG8dqO3Nt24ZvFeZ%2BL%2BbSL3QqqRk7Jugu4WR0%2FP3oFLJWaDP7yYzb2db%2BVcd4HJCVkL6LEaSG6E%2BaVY2O1YvK1bgqMg5dFRJxt%2FE%2F%2FlzQ%2Fkz9grWUeeMezdUSxvYeNQ6%2Bxt4vRmDduTARy1u%2Fw50PL7E0bULJzKa0%2FoegMXY%2FzOGy1YgHEBw6prdgkzupIp0f44dC4V13rIK26I%2BXXtQazTQ20ibNaI%2FkP8yiCq7KiRm%2BZ8hZYBAPzcnN%2BCuQ8zaZWMBnFJG8BkTjkaATplEHUNHjOCD3iyEuTqXGKqlXLf2Ynu0Odupt5H30x7hFnEgtgKsYjZHdmcuSPlWsQpXZb9SaUfi9Xl%2BkV5zlM5kP%2Fo2nqlcQ%2BSY4jDmp%2BbNBjqkAS4XapZTm0J8gQNEkv6pzwdjfSwuTtmJ39O2UZIuaqJxwqMmhfGltFl0KSx%2F2UNSBXVRIhiws7atKnE6GaCsjThfhtcPURPYE1WUX2DJgXS8waFTq6vLmiikq%2BFJllxSZr4MQvWsd%2BjkUKNy%2FooFW6y80ahZ3bdpK0EQB7y2Z6uh0vpJ4Ca0sOayIwU22U1p5OkjUP%2BpXvsuiRXqSESOyEmtI743&X-Amz-Signature=564805571313971ae933a6d059a801b0c759064bd38c7ed1f20f4e2186a89331&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UBQHZ6XN%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184121Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIH7kSae%2BmgoATPuJAiIm0eQvlP18IHo81blUTjdkdDgsAiB77iyFevWrGySrFQHeq3PjQQmu2CkfBJqIFY25QF94CyqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMnGehqKXnUoIbWsX7KtwDG%2BqypEd1zobRQ1Jld5HWh3ZLuHQEwcBhk7Us6WWDvB2GkINJT7eqAlb2uaXhKPB0F%2FDt5%2FzPaxy2FW0DpullkEl%2FyTx6KCLdOiyPf0DgzvcVeNAU9VVK2OEFshINFgK%2FSX7wVHwxwq1pxNWMRpcDHsF%2BZ2taPYaftIWyOtspu3wHxdNQjHY6FeZQsCuc6%2Fx5pNnqosjibD6oMP1%2B3QnrUzELrmv%2F1IW%2BHmMgzROivdDdwjEwdwJCB4LXqk0P27zxvSndmeUKgdezMjiTi3KU7UU05kLMKpMZDWdYMEdvD%2BkK9AFQey9fKw2S4FsFPTWku8sB4v3jn0hYHKfd50bXY0MFuXLBS2b%2B2ztF5dM8aWSQvCayxvQWt8Fcd2oc643ZmvY5cyXPWLDy2tP9chd8lt6%2Ffshj%2FZt9I69Vl%2BK7%2BkjCTQPKBwisg3ltYP7Nu%2FL6E6YsZIBy5h3CDVsJ%2FoRogTH9cLwv3u3nmuTn3MldmnWPTDYyTYPM5%2BymiH%2BEC7%2BulIP7OQk1TmCYdWNF8HIYRkQQzzx%2BKt1AKbcjIGwqyw7thNiFBWqgqkfE7Gdj%2BaQKhADFRb%2Bipf%2B0wY1nPjj%2BVoTfwqm5HkZlPpkKS7yBrz8canC8ZAwNkL%2FXPQIwq6jmzQY6pgGceB%2BpWzM5%2FUKBrQbYNR2uqwqny%2FKg5twRHofNxN8dX2Vh5U7yjWc%2Bf9eeG6WRG3PMlUa%2Fjd%2BEMMu4%2FLbuMvaUc9hwWHcb0JtAMoIIcgmRK2RRuoXemLwVzXEsSDXq091X3LXvbFnDS4rokwwuJSytlDJ8keh61nPRs5T4QBioftGkSoyHF7ubIfoKzikbnGuy8oHLHTnm1Vqc%2FcstZfWR40kkn%2Fhs&X-Amz-Signature=24b237b351f4e0f1507466cfa8e71134112ea94c8338f56900a206268db67ddb&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RAOI3DI%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDRjU9obWeQwl8JsU0UdhdnwVfpKM0kkwHH4CoCwIkeMwIhAIp5rNFhmLzeLzLNc2vr5GlnQ5PYTuqQA2USh6rdAN3mKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzLHUv9Nzb3Ce9X9vYq3APP43k16DztLVeVDrqOpA35eHGwhDkU87HJFi0ye6AEqI1D%2BQeD%2FmGFPuzQDj9DUURj0fDc1hasbH9orfWuWrPqrH4NxXK%2B0deMAoiGAMoEJJXSLr23vR7Zjv%2BBy911%2BpKi697ZlzOTN0rej4GxUMOP9cZvTSaFbDobPca5ejus8FMFmnTA8M8Gk4WbSXMxhqZIQu%2FTXiyGaNvI8IvAUDT5x9OsPKQ8mGRnaDFnCcYh1NnPOC5ZXBQN%2FBlF3PyBCorxyqssOGLA2m75iWx%2F4SEZNAbQ3k4yMJKYAKUBhfxf3g9I5jT9SREZfmpSrjVhTOeTNzmVdKJr1MLxbg2%2FKx7iS4LDa%2FGFnHncqpkMR4LjzQToPScT3CEDT5XTFdoazS%2FonQvBXxfXLlnVJo%2FeHjxTV5PhcxXmuEwB0j1Hk59QoS7sMBDlI5zhm2Y%2FEO%2FKLd7P%2FrAhF6Zv28xnXBRgyTBCW%2BxZrnk9bJA89d5HbJCdJr%2BB9H6u9Vuoc1fZTKHM9evZdAPiV4YvuEwVA8EPznUmMUvVH7gjTO4tuZKOfIF23LAUgGA37OgTlZKNFSt1TLMdIaPQORBw8sqXFLQyghv50pD5bLTkZEziHdTwrPS6fQHZFRYkh79KpyHsQzC8qObNBjqkASIU4q3eHXSzHMae1KxtkRjjJINJcFQiWbRzZsOTJv%2FQHQ4o1NoV%2FpbRN01sjh6XWSgEWz4Sp8nz49wfEoiYxJHhb7cAa9YkJpqz7a7RdgFeqntc1IsFcTBcZpsLGrpzyqPimwf5XwHUWDcIV0TbN9iyfZajf%2FJQ1APOKpMJ1uVOHwdbyKqOqpz%2Fm4cGP1cdqM%2F7ycQ5si%2F0I0R8oiv2D%2FU8%2BzsD&X-Amz-Signature=966d7152aeb69d33b1cadf2a25d0ed6bbe1159acc484bced76deb037cf7504ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663RAOI3DI%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJIMEYCIQDRjU9obWeQwl8JsU0UdhdnwVfpKM0kkwHH4CoCwIkeMwIhAIp5rNFhmLzeLzLNc2vr5GlnQ5PYTuqQA2USh6rdAN3mKogECPP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgzLHUv9Nzb3Ce9X9vYq3APP43k16DztLVeVDrqOpA35eHGwhDkU87HJFi0ye6AEqI1D%2BQeD%2FmGFPuzQDj9DUURj0fDc1hasbH9orfWuWrPqrH4NxXK%2B0deMAoiGAMoEJJXSLr23vR7Zjv%2BBy911%2BpKi697ZlzOTN0rej4GxUMOP9cZvTSaFbDobPca5ejus8FMFmnTA8M8Gk4WbSXMxhqZIQu%2FTXiyGaNvI8IvAUDT5x9OsPKQ8mGRnaDFnCcYh1NnPOC5ZXBQN%2FBlF3PyBCorxyqssOGLA2m75iWx%2F4SEZNAbQ3k4yMJKYAKUBhfxf3g9I5jT9SREZfmpSrjVhTOeTNzmVdKJr1MLxbg2%2FKx7iS4LDa%2FGFnHncqpkMR4LjzQToPScT3CEDT5XTFdoazS%2FonQvBXxfXLlnVJo%2FeHjxTV5PhcxXmuEwB0j1Hk59QoS7sMBDlI5zhm2Y%2FEO%2FKLd7P%2FrAhF6Zv28xnXBRgyTBCW%2BxZrnk9bJA89d5HbJCdJr%2BB9H6u9Vuoc1fZTKHM9evZdAPiV4YvuEwVA8EPznUmMUvVH7gjTO4tuZKOfIF23LAUgGA37OgTlZKNFSt1TLMdIaPQORBw8sqXFLQyghv50pD5bLTkZEziHdTwrPS6fQHZFRYkh79KpyHsQzC8qObNBjqkASIU4q3eHXSzHMae1KxtkRjjJINJcFQiWbRzZsOTJv%2FQHQ4o1NoV%2FpbRN01sjh6XWSgEWz4Sp8nz49wfEoiYxJHhb7cAa9YkJpqz7a7RdgFeqntc1IsFcTBcZpsLGrpzyqPimwf5XwHUWDcIV0TbN9iyfZajf%2FJQ1APOKpMJ1uVOHwdbyKqOqpz%2Fm4cGP1cdqM%2F7ycQ5si%2F0I0R8oiv2D%2FU8%2BzsD&X-Amz-Signature=966d7152aeb69d33b1cadf2a25d0ed6bbe1159acc484bced76deb037cf7504ac&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466RR2VCNGK%2F20260317%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260317T184131Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECoaCXVzLXdlc3QtMiJGMEQCIEThCoi%2BVmyGi91zUYLA0pakqYQv0hwxsmaXWNunrTxfAiBqzCbrB47ZL%2FU4V2yXLgjBSLJ2J%2B3FX%2FxBReXnzljSrSqIBAjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIM5Ft7lQ%2BAhnm4Z3ZZKtwD0r%2F3%2BSMez6OzW4S1Yx5QUy7ug0%2FTXh48wXYXznFto2EsuZA1yPb1xh%2BTKUsbTMCG%2BNL8v%2FwiZGhP2SysDRHFiJi%2B6GODxJsBfNg9sk8QsCuVqIp1paquWVw5cXKzw0InJbwZFLe3GkiLg3iXK92NY28mh3DrCtkqSVKy35ls%2B50CTUp6ObnVzrxMea1ik4oLj0b%2BJba3jVADjWHIrabBortOW3qoQCuXicB0XmUWCsMHEO4l3wDMq6ft5Zu6Zz8Oat6QCfLMIgxNXSbe7TuOkuwrY4vc%2FvYHDOo4lvpdQ0tF3AGA3cwCXRyZvkv6%2B%2BQX4VaKJ9yod3lLx6wkLyS%2BIhvv1vN4ddygL3A1gGkGJT%2FUh%2Fg4MMucAPx3djFRM0Bl7s%2FsZecBTZF7ZZl%2Bd5tSq0iKz3r5Ga4kbV9UdPtoRH1GvsalUErTX72B40wga6FiIaMrunkzyZVmgwa2WZaDz9OlplKgVE1pyp8njD8hGN8Vl7%2B1YI1qNkguzEwPnfydTkoWGO0JHqyzssfunKy4w9LLyxxPCKA3LArj85gVKbl5y%2FnE%2BC0kHyW7UrPmzhQdf1x4SFvGkzNwk%2F8XUS4QSM3ploWgX18cXWD3gHH7HPg8DpWmmduuawmBFFcwtafmzQY6pgEItWXCdRlc4ARJMJSQPhxfzswshvWyUFZe%2B%2BUM7vLNxRfMwTHhCdnwqvX0YL6Z708IHASm2lyUHS%2F9HEzkHCPiD8A2WMOigVvKJyu4XaXQLIv0%2BHMDG7%2BkTd4wAdpr7XILTsnhgikPmBEWFT%2BEUFjUZFLW4diEK2qP%2FgiKDBZto1iroMQZAQudf23kqHbOLV9v5NuoafpDElXVDdUtL52B9ZUJYuoY&X-Amz-Signature=f716e7b89eb779d8e81bb036b8bdc3dd18bf06e74683cac732fc9d6df5b6af0f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

