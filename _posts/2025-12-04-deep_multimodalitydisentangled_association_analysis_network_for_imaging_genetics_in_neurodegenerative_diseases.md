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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I72ADFH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQD%2FYzpqY4U1%2BS5soXC%2Bb%2FlsPolZTF59ftRoy0kvlOPSzQIgJsE98rRir5GT5qD8jFThoTPCnHVW4VfBn4bLIaiFbbkq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDIVMwCNjVhAzWu7MSircA62Ao0diThpfaZrURmY7iKth77VTvKsq8wXjECdStjPD5t6F%2BfpkfW2td0OOSvtqWbXzZ3nLNpBBSPizmGWxEGvLTe4xsrf0FHadocN7pBMhXmVteBJ%2F8uhp3EabRkvqsRWBbP%2FcwDi2%2FtV7vR9W71O1t34%2BrE0puJM0Dj4lL5ZBakxRZs1m0PaS0a3Sh3Ast%2BQO32WcrkkFmL0qPyqzBJLx9yIreQEtXUFtpL%2Fa444dOC%2FxRVIgwU9EuK%2BTJiWah0Z2oMS6QzqfmsWAnsKlZH1RvcIgE4d5pF5G1DbfKJLhnq%2BwpjxAIcffgix6ugoGrLx%2FVAgcu153W%2BB%2BhSiZwiyR4atdsMHTkEVuHEPcZ47DdDinLffW%2BCIUlzOnrK2gFLfDSc7NRWH0Fa11se7Bj7CSSGItCXBzJl7MNWP%2BU%2FU6b1xL0DC5MPLl38IJh%2BMGw%2F5pz5QJ3bCKxSlZfXVxWhmvtUsdc1gMuk5YAeDb0AccU0lHn4XeNJIj7RtkVheZoCMp1%2FGPCLT3OdTezmSPH0q5yeyQAYJngXpSn4xXtwobOd%2FBxu95Wju8C4dZGZE%2BsQ6PNkgX697P%2Ba9onOTsPMYZYJd87GQIWMlcLrsicDO%2BiGzQmuiiHwv7EFurMOyZ18sGOqUB9ALcMMfn53f0gXIAZMUOte9uXFupGsVLbWcSeKFKsALx6EU8UZ3pRXSJtRp9SAKjSb2WfeNoU2C6FNAEnjMrR%2FrJ9ev1X4CBvHdfnLSWGurGR72TLkBsgjJPOTO3Aj0k7G8VRWyg58aXmJeSZf2V9v89Y7btXHCNIkzexNYYZtuhyluPktBq5SRboFlUHUZSnDJ%2FRmqGPZxVjTYsaFJMb14iWCQb&X-Amz-Signature=31931ba22b6083a1531a10c7a5d23a900d2b3ea223976d758cd095c1f3c2342a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667I72ADFH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091003Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQD%2FYzpqY4U1%2BS5soXC%2Bb%2FlsPolZTF59ftRoy0kvlOPSzQIgJsE98rRir5GT5qD8jFThoTPCnHVW4VfBn4bLIaiFbbkq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDIVMwCNjVhAzWu7MSircA62Ao0diThpfaZrURmY7iKth77VTvKsq8wXjECdStjPD5t6F%2BfpkfW2td0OOSvtqWbXzZ3nLNpBBSPizmGWxEGvLTe4xsrf0FHadocN7pBMhXmVteBJ%2F8uhp3EabRkvqsRWBbP%2FcwDi2%2FtV7vR9W71O1t34%2BrE0puJM0Dj4lL5ZBakxRZs1m0PaS0a3Sh3Ast%2BQO32WcrkkFmL0qPyqzBJLx9yIreQEtXUFtpL%2Fa444dOC%2FxRVIgwU9EuK%2BTJiWah0Z2oMS6QzqfmsWAnsKlZH1RvcIgE4d5pF5G1DbfKJLhnq%2BwpjxAIcffgix6ugoGrLx%2FVAgcu153W%2BB%2BhSiZwiyR4atdsMHTkEVuHEPcZ47DdDinLffW%2BCIUlzOnrK2gFLfDSc7NRWH0Fa11se7Bj7CSSGItCXBzJl7MNWP%2BU%2FU6b1xL0DC5MPLl38IJh%2BMGw%2F5pz5QJ3bCKxSlZfXVxWhmvtUsdc1gMuk5YAeDb0AccU0lHn4XeNJIj7RtkVheZoCMp1%2FGPCLT3OdTezmSPH0q5yeyQAYJngXpSn4xXtwobOd%2FBxu95Wju8C4dZGZE%2BsQ6PNkgX697P%2Ba9onOTsPMYZYJd87GQIWMlcLrsicDO%2BiGzQmuiiHwv7EFurMOyZ18sGOqUB9ALcMMfn53f0gXIAZMUOte9uXFupGsVLbWcSeKFKsALx6EU8UZ3pRXSJtRp9SAKjSb2WfeNoU2C6FNAEnjMrR%2FrJ9ev1X4CBvHdfnLSWGurGR72TLkBsgjJPOTO3Aj0k7G8VRWyg58aXmJeSZf2V9v89Y7btXHCNIkzexNYYZtuhyluPktBq5SRboFlUHUZSnDJ%2FRmqGPZxVjTYsaFJMb14iWCQb&X-Amz-Signature=31931ba22b6083a1531a10c7a5d23a900d2b3ea223976d758cd095c1f3c2342a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZEZF62YH%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091005Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDVS0FEdBDPU0yMrQWrWzx3OAt3nXzVddoctfJy4DcfxwIgZJL21Yo%2B19DwaS6y5A1A1dyeLGXCqkX%2F85UXgw7aCjoq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDAion1OIvZ%2FHQBfS9SrcA%2BiDljwwMmCg8TkSTi5VhKeAEBERsm8OZZCrWap%2BOV71GM5CsoWQ%2BpjOjVKXQjWDYllIEeaCCEJZsya7NqG%2Bcy3%2FUlXgEAaxS7N6u94yMJwknnXy85vk1HkOGIw3gGRk5gix1vgX2l7g7v1rz8U3%2FVhL7lrP%2BukylIP8G%2B86pnHVHm7PuRg3hH0x81cuReNbbA6kc3VjsX1pJy6kLt2PhWAfAEITPYQJP9cCT30ASOA%2BnuMUBOw%2FrwuOzu6sTs9PxX0Ia9RdOB20snDFuNN39r5NCHrLsz6unvROqtZLA43DqIONbtdEQgXr7cBFk6rr0NL2XyW3JkxoxhxEjH2gVmYrw84Xs3qxzjzHj%2FevKJNkSwaCt5lobYvs12bM7tQrOtrnFUMjFzScp%2FJJQgjS58d8gCPmgechDN%2B5ddJfUi9Qte3dCKCXtb5pomqnPC0PLPn4MWM%2BXX4tRv%2BB4QMf45APZST9r%2FLg%2FreYirYXwA1zEVPYbkRqLG4XRwhdoE2Y%2FYguQyidjj8cX%2BwN6AkZ2EuMTQflNGM9DWqW3BXXYabrCM3s9Sm6SrPGic1StjcOFCwllceJllrlD9yYoFbBboePcipl3gp1Jj%2BzPXP%2BeNCyTcf6Fc2iBWNf%2BXF6MNaY18sGOqUBF5ibxrEZRyc1%2F1vgIG62r7LSyN%2BTRa16vBojQQ5TDkamBKCIjLmo3HRFwtxZLr2jQDisvtFLX1EELzft%2B4hR7qF8XuGvACoDipx8I0e%2Byp4D6QHaWCzKnZlZsSTwYUQDBWoYIH21CVL3N9MrAoKx8fUMexfnhoOXmOE6EFhHh%2FFjKeoAAqiDmfZienUeFkI52t%2B7LRDA7%2FU8kCN5ZjuU7QNLCMTO&X-Amz-Signature=1862de3c3cd260ea092d64ba57267d60ebb4dce1e802b7f3578040992570004f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNWLLWW6%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGy%2BWg2xb9NHfWNQgF%2FzbCLv5ePVrLufvItJ9Lqz66VzAiEAyEu9VWFxP%2FiGXTnj3X%2FrXMDZTIkNYZOhYusMrEirXoYq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDCD%2Fy9oUQVtc4CbHMCrcAyLtZ37pnr%2F8Jf20BDthjmPkeJbcRCbnrtFSMICgPMlkc%2FN8pXfPd%2F2tXwWh%2FhMffa8uFM0UjlJX0MIX3ArxsPxMOmWdFDk51Ed5Aq6rcZkHKkEmntx5QOpKaBJxZYl5MRORmPdL0xzT75WMCOUepZMqfBkIudhQ%2F7edxFCaEfRe1vgLjlFuut3PJgOLTBwrnzfve6XHiLDdFgcRWdqtLj5Z0ar51I0LCZgqXtmwftrkDjKy7ABJNLNtCeDFLShtLe2lpX2fltbo%2B4%2BdlaI5P8%2BMHD8K47Th7JEs%2BJ6bHkf3JVgrmujIWlACjHKRYO%2FBLdrZGRJDCxfgEDGiUlrE8%2FZMrrva77XddbMrYqbhIv9bUV9yuJfcvLeoPh0%2Bi2GmMCxV4gAjlCKywcgL2imrNUSbxJTEIg6VrG9CZ78bozCJX0fsAL7lOZK%2FefqjtlgaYCuVBqoMG8Pmgno3SyeCFmvs1L76uIYD0KKmelAuVJUGM3d0s8THVUpoZmtNEmvbhhEWyB%2BXXtKcpH6ZeDJMZdblG2dgz68G9Vn4ft96wafSiywp8ykIcyPGNSdbsfPkW0vAxhn4H2jIGdt4h5lfHj1hrxidAJU8mOBNO8pdehZmAH8nJeOpxb%2BzXq8eMOyZ18sGOqUBT8c1G6V9ne5qIzatpuWRqgPQlcwpsypPzEYsx0c0FWb2Yfy7ufCvXiUtxew536XWdHMw1PU%2BPfazBYum1H7%2Ft3jqwke46ziFBLlR6qiuc37FaXMvd3XlVKIk7p4ZwVBgmI3XdsorcTaUxGsLfykaDCvOvTeAYCpDs3vxz7ZhrUOPweMZdUM522IqUNhLSnEgvF7DYJ5ixGAOEIqj4tcd3a%2BOrK0U&X-Amz-Signature=cfffb9c188cdb252c47ec360d7aa3b6bff32e414eb68d9ca25ca45a36066904f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YNWLLWW6%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091007Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGy%2BWg2xb9NHfWNQgF%2FzbCLv5ePVrLufvItJ9Lqz66VzAiEAyEu9VWFxP%2FiGXTnj3X%2FrXMDZTIkNYZOhYusMrEirXoYq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDCD%2Fy9oUQVtc4CbHMCrcAyLtZ37pnr%2F8Jf20BDthjmPkeJbcRCbnrtFSMICgPMlkc%2FN8pXfPd%2F2tXwWh%2FhMffa8uFM0UjlJX0MIX3ArxsPxMOmWdFDk51Ed5Aq6rcZkHKkEmntx5QOpKaBJxZYl5MRORmPdL0xzT75WMCOUepZMqfBkIudhQ%2F7edxFCaEfRe1vgLjlFuut3PJgOLTBwrnzfve6XHiLDdFgcRWdqtLj5Z0ar51I0LCZgqXtmwftrkDjKy7ABJNLNtCeDFLShtLe2lpX2fltbo%2B4%2BdlaI5P8%2BMHD8K47Th7JEs%2BJ6bHkf3JVgrmujIWlACjHKRYO%2FBLdrZGRJDCxfgEDGiUlrE8%2FZMrrva77XddbMrYqbhIv9bUV9yuJfcvLeoPh0%2Bi2GmMCxV4gAjlCKywcgL2imrNUSbxJTEIg6VrG9CZ78bozCJX0fsAL7lOZK%2FefqjtlgaYCuVBqoMG8Pmgno3SyeCFmvs1L76uIYD0KKmelAuVJUGM3d0s8THVUpoZmtNEmvbhhEWyB%2BXXtKcpH6ZeDJMZdblG2dgz68G9Vn4ft96wafSiywp8ykIcyPGNSdbsfPkW0vAxhn4H2jIGdt4h5lfHj1hrxidAJU8mOBNO8pdehZmAH8nJeOpxb%2BzXq8eMOyZ18sGOqUBT8c1G6V9ne5qIzatpuWRqgPQlcwpsypPzEYsx0c0FWb2Yfy7ufCvXiUtxew536XWdHMw1PU%2BPfazBYum1H7%2Ft3jqwke46ziFBLlR6qiuc37FaXMvd3XlVKIk7p4ZwVBgmI3XdsorcTaUxGsLfykaDCvOvTeAYCpDs3vxz7ZhrUOPweMZdUM522IqUNhLSnEgvF7DYJ5ixGAOEIqj4tcd3a%2BOrK0U&X-Amz-Signature=30254b89c45946f02a66b54f02239206c810b0f5c69064cb01a812cfbd3dc19c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Q6SV5XNR%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDgeCLSZPCCKFYgmaJBY1SA7aSv4phdeLwDi8LgMh2rJgIgPV7%2FXqWT%2BTc3AMG3UDL8%2FUT6nvY%2ByS4de09ThUh9j6Yq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDF%2FAC9V68XS1nLxKPircA7nhLHxJ6u7X%2BwWnd6hntCpt3HDQNTOi9Bcz6scB5nhY53qQBEfWn53OjyLULekG7CsA33zO03NxXbh2alF%2BCeHnWASDygntHBNh41TyZRc8NnG1dkpVgpU06Ao491tFa9VVAyDfBNBvIqxxwYuzoCaRt5qH7hvePAHB7XIQuQwgHTWM%2FR57zYisaH0lNx2pB2aSWWl6uz%2FOk%2Bw1VP5AoHoO9Sb46HoHnNmDfY3nLD2E0hqpajAuEsxHYjE6%2FrLBktL8lPqeqGfm6ilPzwPXt8xSF4LauyEkdowON%2BYDnMzkL%2B3JR5cVUnSnH%2BEmrPm8KIUmNLWvtaUt8T1FaJ93GQYX1nJyIl7VsFJzfAVw6XoVahR0ltTd9lpS%2FFLAwlLx98DIXXjnjTy1PUW1nC4UnBhj1FCIUl3kN3b5iIwIH8h90q1I0VvGs1O3fZxct6Pj60pX4kCvQyOa575WXk7gRVJA1Sdqx0zr7lpINuCDl9HIATHnjrubdob88b%2FBuaERj0dUpszIzaRbi30JhTQ6KwFLceH0ywPDF%2FLKWW9YEUCnosSfbR6JeaEBVcK81dy74nrBSjP%2FLfqFvFWjsLClzZAAqeyaMb8XtsaVIopigjWpdKrcL0omrM0q4I39MK6Z18sGOqUByqL9wMuWZKdLK9KNX1W89Cf0kjT66I6u9tkEfaZ3yvC5kbN71ltXir75Cy8p2VeUFuYEGAcwHGfLY0qn8vKGgdhx13e69brgPYUD3tqpCGAfjo9desoOCfxkX1YljtFXGu0%2Fr0brNyhdGWpNlJiXW%2FOM4UiEe4gJn97ux1u1%2Fxt89iKZRsY5PUQ2I%2F%2BcIe6f%2FXF3ZaaBkYcyayNmjHqgPBIllHw5&X-Amz-Signature=6f375593785bb73a37303acabc1a38e3d0128b3cece5d03bbf7f92633a54d44a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662ZYZZCMF%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091010Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJIMEYCIQCE6ZjFfBeJGdVxwMmQSveS7sP%2FwE3icvfbqjI6%2B3CiYwIhAKm02JbfKgTtfLIl3YNehJaTN4nMe%2BoYYKGGyra1Hc8rKv8DCCEQABoMNjM3NDIzMTgzODA1IgxGC6L34xn902eufV0q3AOjKyZL3%2B6Q2JZP%2FRu6Hvuc0Daq03wlcVdnrez9u%2BR8MRY4gZdC45LInHhaNUWxSUPm99DVLhKOEAfHhW24s8daF3dGef6vRS0tpdqXaRu2x6v9iHZ%2FgL%2BTCk7J%2Bb5Z7fXPNzgqpWr3Yfa2j220I6vjC2IETFLfbVW%2F17qJtiJoRxgxO2%2FSRoneUc4IvkhIt4h0CbdwP8eZeQxQX77JwAmxGd9P7Azq90Jt2t%2F5MMM9mwEfbM7B%2BceqdZ7KoRS0d2xNiqoaTL5oaPZQSEFeaU51%2FvhCF%2B0MIqA6Jy5AH2HJXywh%2FMqe7EHZz04cpyo1LVCNQjRmwMtx9H3XU8fmhYujJaTb4k14QvxD9e2itPDJgPqUNrprCN%2FzfGJroSMZWJX0fn7rtt%2FBupz5rMehRUIFeaKw%2FKxjS4bUiGR%2BfFXVAe%2FO9leXz5vYMfoTyn%2BWn7FSFJxcDJNMf3NqcxEu1vl2Hk7m6YkDCuz8XqXCJYmScFDtONsvHPUC%2FHC1TrxRNNlaP2qDonMRdNH7lnSnMrY27RJTRPtbHe%2BE2R%2FSy36t%2BUmb4g9fZp3k0f6plVNY8i7yiSaMKe1t0Ve%2Bfer3TczNvMv51YzCHPSbi0z%2BbrDxn58YsWY4548uQVdEmjDzmNfLBjqkAWP%2BxDPobZRJEP69chBzZQpEzeEX83ElX%2B5gNEdEr8tE%2FcD3mKre%2B1DC6kITx4u2VamCQzlssQ5EjQ3d%2B5UA62mFDrDaS5UE0EoRWBfkabs5o2zqb2aeS7RrOlSH4LaZZs%2FhntrmOyGI8y2YAkXA4CsZ%2FhcZTcIjn%2FISyH0RonyDPxmPk34IUni%2BBsIh%2FwXj2HJyTF2%2BIbo83eaHolMwQkf%2Bp%2FlI&X-Amz-Signature=5a1c8dbc0a69e7b75b7f5e6b58e6adba78aeb47d0c26583cf27f4e8239fafc3f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4663XM25FJA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091012Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQCM1mT5pATxtKRUvJmPawrjN8eqP3AKuXNFhXrzyFdPWwIgSJ6CxvZa2WjlVoEZFu8ACG3ahYz8ZHvA3SOVnApDEKUq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDFlAlnNRPm%2BN4f2VdircAzm%2B32%2F07BTBcdnjUmpeJqkOeIIzdKGIxXH600HAOPG5v8gg1v%2B6Iuhos242VKjYJISWQd3TPc9Ikn9AmQLnDbVLJ9kWAUrtMqOeYcFH%2B3OUwHl3NC8e9%2F1jO9fr8kVfsP1ECqXkjUc0ZuqWrp%2FZLP9EmFuesGT%2Bh39RQ%2By%2FT8edQNyMhdu9RX1A1kezpVawuMTcgkzgMujmKyCVP9P4E6LO0fvxbPKlvB1yChCv1ijEIHMNHvCT6VWLdG9OBeKVqW20ynVe4qYIknIrn6w6OMRWOe4AxArrIyc1RA44yPuIkBVuou%2BeV0nUreO27l92u%2BZHLJowrRmiYcfk%2FfHgpp4FQCtUE2f2QCLZrWNiqCNDJaMBPwHzKgz3ilLU3uuGVZaCK2L0i5N2AcXWTUgzQHblfhjXLXrJGmOQEs%2BRkPqBPYXum2iIYaZv6muEwyWacrmRMbUI%2B6rTMP3XkWanmLXYB6WPR%2FQr7wg864Z2Q0npqir900P6QghNxlrsJ6YvW%2BO8HmccdgBlQ4Sz%2FuhAzt7IbSRS9%2FJVnEbbuiRY7esDCA2NdbUnWTcr9ou7%2BxS0GvBLncy5CHTN9uCvby0hkkP%2F5xSnwG4TBu5%2BUJkYKaKM%2BfoDDVa5a7J5a%2FYpMJ6Z18sGOqUBmjivJscbfe1%2Fii3KW7SJwvogoia21qo4hmbidfVxVUzkBtL8kp1rVAA8e1qBzfJgSKkGizrxNN9TS3nWuo7TV0%2F393ZWJ5SDD%2B%2Fz4zO7kmZhcjI5HIyzmhF4CoIyY2gRHPXrmrjzo%2BkANt15u89Qx8QpA8KD6daPRBkbKLHTXhI2Z0Ne2iiAcH98z%2BeMxJFzPqJN6pL%2FZ%2F6nLkhsKDWqRx7oGpVK&X-Amz-Signature=87bea2b07335962ac6ce65ac54e3f8d8e38d2c605e88118acc25cd616476b19a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEUIBFB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDRCSoy7jVpmv0XDXimjosFpEGa9F%2FW2mMEicprxiXtVAIgfVHOU9XV5uILg3j%2B0J%2B8Vk5MQAwRdvzxnNyt%2BUDAjXEq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDCK0aaCWtKFP5mFCKircAx0xdDGPlIZpcVTK0O0Q1zaNChi8GcPORUZIShEqm7KmmVv5UMuG3%2FRAsCWrXCw7zs6dmE3cclt2YJmkY5p2wpDun%2BK2GIZOg0CQ7SpxMDH8D7mMM75sYFciu2zWZeeyzZ7q0GV5Rzr8AYQwKpoQH0uB7q44BbQgJnlql9NV3X3Y3gteRxwdO7QsapEaACAUyzy5tbCEl4XZPuUIzBAy4ksh4tOuvsPClQWFqFYPQaxQw%2BH8JGk%2BZoHbgq8of5Ms6g4tdDZKTue8WKpa7oaY6%2FW45v5BBYQOsyYnk%2FBF624ic0knFEJTBbAkiExcN25rFfLRwGNVq%2B0sHdMBOWBbUqZHEvm3rm8BFt5ojJERWvFLdVESAuRk4Gponh74j3ctNcp3FbEMGzOyOntTbO8sRjm8TsHlOoSTXF10Oe5UzUCltmoS%2B%2FgAkW2tLMOMjI2nnyGgErUhrChyZMsXYC2CJ3tPJudlW8qI87urpM7SHY93%2BOVA%2FUNv0liDAS4bZcY85BqoGfyuyYU8pMa%2BXdkyhIx65J3PGSefySbzcYbtMwpGgX68w4rS1mGS5oIqX6fwDBZwtUB%2FM9vCdYkBlIe9uT46jCEfUJhT%2BDU1VqgpUVirqY6O4sfZ2UOOPMIEMIya18sGOqUBBDSKyIFLqxVb5EnvukbL6c3LcTW1e9w4BawdpquuRFdsswk1577CczDu%2FJLqct6FiqEqiA8kYifVH7HuKnKEBMiSc1X8OjTqZruHllBOHQ7BQXX70Vzfrz82nAFclpZlbwON2ykC0gkkJfntJoyTZ3F36TIWf0j7a3bPzy2Yp7NyC6uWY6GKNonVHPAPSB%2Ft%2B3FBGhDRi2UVtz1R5EPUNBMmlYK7&X-Amz-Signature=65b8e05887f0c042b77f9daf4f1d957db9d01176a701b557ed03f33c53263c44&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466UKEUIBFB%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091014Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIQDRCSoy7jVpmv0XDXimjosFpEGa9F%2FW2mMEicprxiXtVAIgfVHOU9XV5uILg3j%2B0J%2B8Vk5MQAwRdvzxnNyt%2BUDAjXEq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDCK0aaCWtKFP5mFCKircAx0xdDGPlIZpcVTK0O0Q1zaNChi8GcPORUZIShEqm7KmmVv5UMuG3%2FRAsCWrXCw7zs6dmE3cclt2YJmkY5p2wpDun%2BK2GIZOg0CQ7SpxMDH8D7mMM75sYFciu2zWZeeyzZ7q0GV5Rzr8AYQwKpoQH0uB7q44BbQgJnlql9NV3X3Y3gteRxwdO7QsapEaACAUyzy5tbCEl4XZPuUIzBAy4ksh4tOuvsPClQWFqFYPQaxQw%2BH8JGk%2BZoHbgq8of5Ms6g4tdDZKTue8WKpa7oaY6%2FW45v5BBYQOsyYnk%2FBF624ic0knFEJTBbAkiExcN25rFfLRwGNVq%2B0sHdMBOWBbUqZHEvm3rm8BFt5ojJERWvFLdVESAuRk4Gponh74j3ctNcp3FbEMGzOyOntTbO8sRjm8TsHlOoSTXF10Oe5UzUCltmoS%2B%2FgAkW2tLMOMjI2nnyGgErUhrChyZMsXYC2CJ3tPJudlW8qI87urpM7SHY93%2BOVA%2FUNv0liDAS4bZcY85BqoGfyuyYU8pMa%2BXdkyhIx65J3PGSefySbzcYbtMwpGgX68w4rS1mGS5oIqX6fwDBZwtUB%2FM9vCdYkBlIe9uT46jCEfUJhT%2BDU1VqgpUVirqY6O4sfZ2UOOPMIEMIya18sGOqUBBDSKyIFLqxVb5EnvukbL6c3LcTW1e9w4BawdpquuRFdsswk1577CczDu%2FJLqct6FiqEqiA8kYifVH7HuKnKEBMiSc1X8OjTqZruHllBOHQ7BQXX70Vzfrz82nAFclpZlbwON2ykC0gkkJfntJoyTZ3F36TIWf0j7a3bPzy2Yp7NyC6uWY6GKNonVHPAPSB%2Ft%2B3FBGhDRi2UVtz1R5EPUNBMmlYK7&X-Amz-Signature=04dd8d9e39f33157648a90248ce39fa543fea86b8713bbcd6bbede60f01b80cc&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VSOAQXEA%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091000Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIGL1k9w4oXrKB6epfelV%2FAmBTYjPvLYNeKzUzK8vdmQqAiEA%2BgFRh6kL80cOYVTuwt%2BXlxLtOygKNNc9XR116CpbmxEq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDDAczfAMIOSsDSIbByrcAyZ40WczUwNj9eCOlNVqCrMMOzXJQwUa1J4WRj1a%2BxAlni%2FZu4oM37YAZkjyaitRHg9OK4GfXSv2SIzFeWgi2NvzPMYjJmMrGEdVMtN7zOnJwj7sftt%2B19KjDzxTqgSDXu3CRMi69NRfm2VxL1HoDY5PMs0HwxvyfM9bUHkh5K8MWq2B5AEN70GX3XuOJuzTzd6CElPv%2FtspIwblzte%2FL%2Bjl92yCcjI5zOLeSJRdFr7Lyj5DmyMXyIiChuRpbIh8jZKu0XEkx85gLQdIkPsG5Ijog5LTWT3vEqMYccO31nVhw2yYmZo8PwhJ6JSBsMP%2BoLVYYfvjHbbWHx0BRufuOdM84X4a64MjewFNAyPLbm2Nk3MQ9XyCMBe6%2BCJixSiYcMJEu%2BiLZ9s6s5OGoyKmyW%2FxiodVXKIT0DuzczO8dPAYx9lOvoRUG1kMOR%2F7r9TEsCj2bFklSFqTypqTfNBwJDoaC1swhsV5Y97C7nDNDrpF2TUoTUm75N0xfjPfbSvo97loraMOw%2FbIua3XEt%2BtAdF%2FL4v7UscZsbL6XSTiYR7G9L%2FVrTuBrIa7PFqc84%2Fvf3K1g7q%2FkTF405SLBrUOlNsIwECHDtAjFEpJHO1mvdARrduP0mtvJtG1K9XeMN%2BY18sGOqUBNwUCyNjJ7MMSIP1uMfMiGDIW6H%2FyBGeXAVkTKdOB%2BWJojAaQxVTGK0mNUNf6I2f3pRI%2FdT1FHtxGxPc3%2FiCIlRKVShhQhOc4fTvlVxynOM%2FNNBA%2BYJ9tLFuibN6aHqt%2BG1U%2B1a%2F1AZmNilIVH902ILXKBOQzhDP%2FzSYP0Sn8OVep%2B9qaLr19wzh56t0HfAgC85esWV82cf24zAQXyL6lt8mnJsVK&X-Amz-Signature=cade22619a54de984a98f9e8563798ea8ac3cd40ccff00e4dc4ec389b96dd288&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQTELKQ5%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIF5t3yRCGPEU72YOlFIT3cGX%2BrqZg4BOvpP%2F4n2%2FbbBUAiEAs1EH1R0mXzJfLKPiEFCJmn151AZyZqT2LMpYvmBGdhMq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDARGAkcsLaUtHhQdlircA%2FArrPCnNc91BmzB4qgKm6EHfnpmwb8K7dtZNWzF9XmwXP7MAGILfTimdQ8n9z7G7kaumYD9zss2i4IlIdkFbsQAMrGmgvkJjcb%2FyZB8xwzbzZaGiMnRHvheUKFBBT2BdDywamvsvWNVfBPrDv7ChmSW20B91rcY%2BHoPNaKkMqwAJk9bugqW5xhSwSuU56M6v3rJly8jpvRAaPjaR3X4%2F%2BXPJv%2F7VreESFokOfBsoMvJ1bVEoo32ZYrYt4PtteoUrbriMSoYLcpyw8%2FYu%2BzJuwur7PMXb3NnwJZeZxR5%2F%2BcWbAgsyBi43YCcBcg39QbrvrTu2Opsb22VthQJzptwBTUONGuZEYxzklzQrT6F6px35%2Fy0xGEAeMWw4W3TJtQfvqSysSid063o2TnRmy8ynnLL5ocT7Bwpoh%2FTTQUzumy0nQpuqRe3SOO2DtSDEYuDDwVM%2FFr%2FLVT1ae1fO7EUzhrjTwnL24bE7VqtLsESRqQncnmqT2K78beIk6%2B0YCMzsKrDWodB%2BmsGsBvmVFdxAQdRbobZICK4R65j0D0BaCAUGwL0Zg7WGLh28I8vKlcinjSnerLd2yx8ergcQdPlBA9%2FHH%2BFekdRaGPdpIf5l6KlwD7Mu5S2QGYU6ztlMNmY18sGOqUBItY7AiPf0rUgfOJ4Sf6SguoM0xqsKJ1Ol9rD5VPgd%2BHUgRFOFSok%2BN7pBIWJLh2hyDL%2FLBQvzoTNEDqcpd3ArYzL9vlehYCGyhhpRgtMHNSdURnyenFhW9J1KOZUbN3DjhkJ4hegERru2yIOhHyvBXoFUDLV%2FP%2BDqNMSlXyqQheYbE2GESnQV8kyhZJxz5f5jn4CCzCMerGPaOvWa7aayBCV4Ksf&X-Amz-Signature=3b4d9fd2295ea7523f84186a0c387c2446d0047c2b238202b7087e3a938d05ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQTELKQ5%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJHMEUCIF5t3yRCGPEU72YOlFIT3cGX%2BrqZg4BOvpP%2F4n2%2FbbBUAiEAs1EH1R0mXzJfLKPiEFCJmn151AZyZqT2LMpYvmBGdhMq%2FwMIIRAAGgw2Mzc0MjMxODM4MDUiDARGAkcsLaUtHhQdlircA%2FArrPCnNc91BmzB4qgKm6EHfnpmwb8K7dtZNWzF9XmwXP7MAGILfTimdQ8n9z7G7kaumYD9zss2i4IlIdkFbsQAMrGmgvkJjcb%2FyZB8xwzbzZaGiMnRHvheUKFBBT2BdDywamvsvWNVfBPrDv7ChmSW20B91rcY%2BHoPNaKkMqwAJk9bugqW5xhSwSuU56M6v3rJly8jpvRAaPjaR3X4%2F%2BXPJv%2F7VreESFokOfBsoMvJ1bVEoo32ZYrYt4PtteoUrbriMSoYLcpyw8%2FYu%2BzJuwur7PMXb3NnwJZeZxR5%2F%2BcWbAgsyBi43YCcBcg39QbrvrTu2Opsb22VthQJzptwBTUONGuZEYxzklzQrT6F6px35%2Fy0xGEAeMWw4W3TJtQfvqSysSid063o2TnRmy8ynnLL5ocT7Bwpoh%2FTTQUzumy0nQpuqRe3SOO2DtSDEYuDDwVM%2FFr%2FLVT1ae1fO7EUzhrjTwnL24bE7VqtLsESRqQncnmqT2K78beIk6%2B0YCMzsKrDWodB%2BmsGsBvmVFdxAQdRbobZICK4R65j0D0BaCAUGwL0Zg7WGLh28I8vKlcinjSnerLd2yx8ergcQdPlBA9%2FHH%2BFekdRaGPdpIf5l6KlwD7Mu5S2QGYU6ztlMNmY18sGOqUBItY7AiPf0rUgfOJ4Sf6SguoM0xqsKJ1Ol9rD5VPgd%2BHUgRFOFSok%2BN7pBIWJLh2hyDL%2FLBQvzoTNEDqcpd3ArYzL9vlehYCGyhhpRgtMHNSdURnyenFhW9J1KOZUbN3DjhkJ4hegERru2yIOhHyvBXoFUDLV%2FP%2BDqNMSlXyqQheYbE2GESnQV8kyhZJxz5f5jn4CCzCMerGPaOvWa7aayBCV4Ksf&X-Amz-Signature=3b4d9fd2295ea7523f84186a0c387c2446d0047c2b238202b7087e3a938d05ed&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W5LGNGA3%2F20260125%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260125T091015Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEFgaCXVzLXdlc3QtMiJGMEQCIAGEoYIFcK1H1L%2FzO7izKBSVQPxBo1ZcFLPVijQdV7eeAiBTFQ6S9mKIURkPjnINFTbwDMHBVCIU4g5U8xjpcdY8ZSr%2FAwghEAAaDDYzNzQyMzE4MzgwNSIMuRhvAMdnMvtrYgmAKtwD17%2BeYqQuin%2BF9LpwRz%2B2eHDns5UKzGTwMW3RjX9sWL7uAnH5vsp5WCvznSUJOZaOMvMlwZj2qMpXR5Z7oRgW6HLa9r7HWWEqh%2BFv4TNLWsRTYEfcDC1X57CqFsB%2F%2FrxUVAwFWvlrBYWChkxsscldK%2BPfW0%2FDbO%2BflPBqU4GN2ZnScVUkExVkD1j9ifDqVjDksgvQTGIkC31fK0Dtg%2B%2F5BgTOTceRR8xax4Nwn0G2jSaPz9TkgCOMzaU420HzxjX5T07VG6PvGTdqghlUw83hCJ3ehc74LT9Gtp2KRNfKeblEsFGONkdKY8PIU3gyBOchvC6wHayYfxxGUOHjandZlV535LBCakhYP%2Bjbp5qfCW2z4UaGgevK6OIMiVjPbGZUCHO46iUIutUhCNL556S9z432s%2FGVdTatyhbJI3o2220xQ6pSzcPQs6OnAAMEMjeE5rf1VvPi2zJ7Xupl8ezwpeKrNaXknFcd%2BJaNvuDAYBZWBW5sqlsX5jGEE%2FIEbqwcYJyURL7EK6oXHmEW8EXyn3F8bk7l4W%2B%2BjBNY93tz9p5eOBlH38qi0XUTfGEIV3h3eMVPWll0Iqfph6bRlx%2FRvM3WoWdtW3JAYe3nF6R7rGKdaSPxWjlKGKgTUvMwg5rXywY6pgF%2FiQiXy7lW6M1WyzMph04XfiVoVbUg73gwTh5gzChm4PYptFmIgMOw90bG3Op9mV5ste7QDMWoz7BoVmD%2FrORypOcFK1ADeciBUsYsLUhljxdwqqyeM%2BiV7kr4lKfJP%2FqzX8Z613RBybBjtB%2BocXqj%2FAmR211XOsmMj1%2FXdQJAeogTCKeTIYPcNp9DsAs3dveOPL5oK9e4MFy1iAMBlZgU55DE7Ink&X-Amz-Signature=32574a31aca473f5fd817b2a61109d1068be04383e35385c1f8a021be3929961&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

