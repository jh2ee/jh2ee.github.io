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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DKRF6IK%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIAzlpeFQCKjXLeqC%2B%2Fz5zNpsQvYXsC9cT8QSrMsxy6ggAiAwR%2FYPAoKeFoatr4upmRCEv%2BhZTV4sNt68mOaCv19x7ir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMsPLqwwboshjpKkcCKtwD7vGu%2Blkm8trS%2BFztoFC3u1E2MYcRyNC%2B8ix4EumNsfniY7e8L93eOcjZI6ifgkWJxLI6C3o9rc7ByiR%2FZhqBVIJORiI%2BWQBMJNrAx77%2B1YWuhiH2h%2BnQqHMR55Lvm0FlYTFlldiX12klBa%2FZ8M3mQ9HP0nsv4wFSoEyYsrAbr078cpJihDGQb4IXyuFR101qm1WbtfoA0bxQGPVSLgkhXkFKnEMBvodeQpo%2BTLdJImX5vmPSK5vcXinAovt%2FzT8st49Ej7vAyFyG3zUy7G8X8VxjwYPGKVmf0bWzSGQ2xTgITVQP2LyylOUEP4wcJIQHWoAb%2BnPIaju5hCalrHBATKG2nLxm9lIJSn6cM1Q53lc3qXtZJCFpYNCjEGuCzdKWoNOD767XWUMpaM0NVUjQr2PDM0PAxqqz%2BhcynOwa%2FCO2%2BxCCSWc2zjDHyrrhtk2pMcW3nlAS%2BLjVxhK62vCXYMp%2F0uUXTF0%2FB%2Bvb0rBMIAKc7ujDuC9FUxSBB3f4FUWZ4fzGK%2FJ0uIhU0ByvIwiGu5JBtiiRIeMpC0HDEG6ZpR9vwlpve1RBlzkkRuk8Chip1v3lhbc1ZvmlbcRG6D%2BEDIV0h%2BLPXty6sZsPAiVrOkc9%2Fe%2FtquUrcKlHb6EwwcLnzgY6pgEX%2Fo8u9fBSL%2FpCfZerFXl5JXBdr8U5dNTfMHalE3DGMu6RZtsljBtj4iQW6Srnb9cAywVcsx1tFW0FOcCQRalzyZcMjpYNcJMydVdI8aQcjKyFE%2F3R0fITbe8d5pTlJZ0xFTqZ%2B4ti6EHae%2ByyUqGd%2FC1%2Fgn6XGmtIvKWrAg1DtgYoIWvkWIlEfvgjkuyo4yucs9ZaCjCnjGObimiq11Vl29vj31pW&X-Amz-Signature=8c73918cebd3c7d89e18d0360116787269b7b703ac40a6812edd29e8cd4e7f5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662DKRF6IK%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIAzlpeFQCKjXLeqC%2B%2Fz5zNpsQvYXsC9cT8QSrMsxy6ggAiAwR%2FYPAoKeFoatr4upmRCEv%2BhZTV4sNt68mOaCv19x7ir%2FAwg%2FEAAaDDYzNzQyMzE4MzgwNSIMsPLqwwboshjpKkcCKtwD7vGu%2Blkm8trS%2BFztoFC3u1E2MYcRyNC%2B8ix4EumNsfniY7e8L93eOcjZI6ifgkWJxLI6C3o9rc7ByiR%2FZhqBVIJORiI%2BWQBMJNrAx77%2B1YWuhiH2h%2BnQqHMR55Lvm0FlYTFlldiX12klBa%2FZ8M3mQ9HP0nsv4wFSoEyYsrAbr078cpJihDGQb4IXyuFR101qm1WbtfoA0bxQGPVSLgkhXkFKnEMBvodeQpo%2BTLdJImX5vmPSK5vcXinAovt%2FzT8st49Ej7vAyFyG3zUy7G8X8VxjwYPGKVmf0bWzSGQ2xTgITVQP2LyylOUEP4wcJIQHWoAb%2BnPIaju5hCalrHBATKG2nLxm9lIJSn6cM1Q53lc3qXtZJCFpYNCjEGuCzdKWoNOD767XWUMpaM0NVUjQr2PDM0PAxqqz%2BhcynOwa%2FCO2%2BxCCSWc2zjDHyrrhtk2pMcW3nlAS%2BLjVxhK62vCXYMp%2F0uUXTF0%2FB%2Bvb0rBMIAKc7ujDuC9FUxSBB3f4FUWZ4fzGK%2FJ0uIhU0ByvIwiGu5JBtiiRIeMpC0HDEG6ZpR9vwlpve1RBlzkkRuk8Chip1v3lhbc1ZvmlbcRG6D%2BEDIV0h%2BLPXty6sZsPAiVrOkc9%2Fe%2FtquUrcKlHb6EwwcLnzgY6pgEX%2Fo8u9fBSL%2FpCfZerFXl5JXBdr8U5dNTfMHalE3DGMu6RZtsljBtj4iQW6Srnb9cAywVcsx1tFW0FOcCQRalzyZcMjpYNcJMydVdI8aQcjKyFE%2F3R0fITbe8d5pTlJZ0xFTqZ%2B4ti6EHae%2ByyUqGd%2FC1%2Fgn6XGmtIvKWrAg1DtgYoIWvkWIlEfvgjkuyo4yucs9ZaCjCnjGObimiq11Vl29vj31pW&X-Amz-Signature=8c73918cebd3c7d89e18d0360116787269b7b703ac40a6812edd29e8cd4e7f5c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZIWJ4URE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064400Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCCY2tBBW87vfdUsSjm7mJFH8YRTTRTYbzw6DOZ8DNVTAIhAJbBnc%2FLR%2BkDRXtqdKyXvuahEfDPRxT2PWMK%2B%2Fa%2F8B5XKv8DCD8QABoMNjM3NDIzMTgzODA1IgwdoCsjCfgjo4o2EOEq3AP%2FZ504UKxWcgjSF4rPurXcbPzLk7RWMMgLRvIf%2BepYYhX6lSuLrYttSMwaysRJcbFmM3fIcHLSdzfVJCvlrTvCqDOZvnVRZVSZCgkus%2FdB0Dpb2iOUViXYfRrXaiWXuyCZb2T%2BsdFxJbm7Bm9WG7nzwh92Mjbr%2BpvxGji0MbOE2ExrbmQsmu9x1u9GNttkdqe2Z3yQalqVELXiHPBx8hFMyPI8%2BOwMsqG51mMoL%2FQJfmOu%2BjO%2FIPliEv98SOyzw7Hjnx7tfmQrqsRMT80ktktqZRzTqXKCw%2FRrqFYbx7Tntdb531v8CQhsImkdCOnSJXB7msuypW%2BYkldELEHLO224pB6PduE69peSuElCtZcxdbqEweB4kAltvGDQ66WKIO7fbV3CF36eFcAbMf0q4Oh1SYGYv0e0tLmFOiYOQYi9u32Z9oNiH5sfeJjDa2U3ryAffpZMvNyebJroCsGV7UBQvO%2BTfzhHK%2FvYKHkHfxxzRWZgSc16wCR5AzZwYwYT%2FfbCwxWveupriKGrNoBtCdkNqmYgRwIHAi1YV0TMLJnm%2B3dvKoEPa776dwkZG63kujmYDCQcMzs7wNhSJ4jYnDE1zagCe3GR72b1gqud4t4EWmXdbhB3bbigtkIHlDDqwefOBjqkAYlyCP4kb6u%2BEvNzWCwqIaTCbKAl%2F1KSoQhmGT7ZqDy2wSjyz%2BWe2TUlhji6nErK5aWg1sD%2F7ZmpuGBIIJW%2BpwWjdZP5zcBq5Nd9OldT33uzWzx2mESvH8qSx6MgJNI8DSwRTLUwXws7nCVSGTbylgeA4a0U2AlAbwUiJwLAPcRS4Yxv7MCGC9Dg1dx8o2CKQpu%2BHvReHnKysy33CmW9EJ%2FTIQe9&X-Amz-Signature=e2ded90d86417b429845bbb6079dff18f4641eb290d314d8a55b17a9265b0083&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PURSRBR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCLDBq8lbHdpK138XBKRUXIeenrI7EN%2BqDAPKVXgPLuIgIgI1MOOa%2FBFbUUr8oIBxrzavePhejlvzOWz6wm4Bciu%2BYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNXeowCuNqm2rEl2DircAxDqdBx7MiH6QhGPL50jqr4pX4nY%2BuKr5KylFD157rdD3LssIr0W2v2U5IQp4KhytVgB7%2F3NUaohKbP7UABq6l4zE%2BjVOQ%2FDzsFXmb1rpnvBkKKSFFZgWFdGiuolU6w0kKW6ywNgfrRV5LIzvskl5lmVIj8RGfjjh%2B5hcQGWG%2B9MteLzLNb71hfiRv7oYJXDE1PZVuK5df74gEJRZdO6wkrs%2BxODu6TSYuStdqS6hW4U916yqHnZmjZP%2BrMRJdnnVzIDnT5J9bK6TfMebb8u2Vkoe2%2B81AV%2F%2Bvw8PL9%2BCyKLw4RbVjwvQQAaDzgQ54noFvXql7BsQP%2B0pENss6fL%2FfYkb5b05gdp8F%2Fq5OhBXGH08U3UXW0tTilrcnOrlVO9qjOpr9gxk3O8XxhwRnZRioFGJIdRuqM7%2FUOPHrBAz0EcA6YtsS88P5febwDdGplebk2R88SDp8cPSMjX6kyOdQGBAhXe%2FXAJmcBzVycdz0AqRmqQJQn0WgJDipI0Z0nfxouuAvGRR2s5YJvhQcda2yU08yS18s5Cspa2ClrgiUyrfCSZ1kRHc4UNP23GLf8DFoEWxFgxifh0hPNTl9%2FtH%2BKtYWFeGOkyzqlgSGOmKMaWCOP1asv8khTVcFrxMNvB584GOqUBS7hW0pg9BPje0tzticzjhPwPMFbM3EpOhLlGexktvuq%2FLwxR4YhqNoI7UCOXuSO%2BhAi%2FN7tGnBt%2FA6bGBoC1yDX1qfERQu3fVOBXkJsLoxNsb052qB1SxF9il3iok2Jln0wYdpANpe8Tbz6Hk%2BLN3pAVN9ZTGbWDiqt8jo4kokRWkalN00xeaXrkdT2%2FQE3S1DW4hN5VnNs%2FLinFmjw18FSaboiq&X-Amz-Signature=b5571c4761e09d73807bc207abf1a0ac02f4b90c74e43418954152b857caa2d0&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662PURSRBR%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQCLDBq8lbHdpK138XBKRUXIeenrI7EN%2BqDAPKVXgPLuIgIgI1MOOa%2FBFbUUr8oIBxrzavePhejlvzOWz6wm4Bciu%2BYq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDNXeowCuNqm2rEl2DircAxDqdBx7MiH6QhGPL50jqr4pX4nY%2BuKr5KylFD157rdD3LssIr0W2v2U5IQp4KhytVgB7%2F3NUaohKbP7UABq6l4zE%2BjVOQ%2FDzsFXmb1rpnvBkKKSFFZgWFdGiuolU6w0kKW6ywNgfrRV5LIzvskl5lmVIj8RGfjjh%2B5hcQGWG%2B9MteLzLNb71hfiRv7oYJXDE1PZVuK5df74gEJRZdO6wkrs%2BxODu6TSYuStdqS6hW4U916yqHnZmjZP%2BrMRJdnnVzIDnT5J9bK6TfMebb8u2Vkoe2%2B81AV%2F%2Bvw8PL9%2BCyKLw4RbVjwvQQAaDzgQ54noFvXql7BsQP%2B0pENss6fL%2FfYkb5b05gdp8F%2Fq5OhBXGH08U3UXW0tTilrcnOrlVO9qjOpr9gxk3O8XxhwRnZRioFGJIdRuqM7%2FUOPHrBAz0EcA6YtsS88P5febwDdGplebk2R88SDp8cPSMjX6kyOdQGBAhXe%2FXAJmcBzVycdz0AqRmqQJQn0WgJDipI0Z0nfxouuAvGRR2s5YJvhQcda2yU08yS18s5Cspa2ClrgiUyrfCSZ1kRHc4UNP23GLf8DFoEWxFgxifh0hPNTl9%2FtH%2BKtYWFeGOkyzqlgSGOmKMaWCOP1asv8khTVcFrxMNvB584GOqUBS7hW0pg9BPje0tzticzjhPwPMFbM3EpOhLlGexktvuq%2FLwxR4YhqNoI7UCOXuSO%2BhAi%2FN7tGnBt%2FA6bGBoC1yDX1qfERQu3fVOBXkJsLoxNsb052qB1SxF9il3iok2Jln0wYdpANpe8Tbz6Hk%2BLN3pAVN9ZTGbWDiqt8jo4kokRWkalN00xeaXrkdT2%2FQE3S1DW4hN5VnNs%2FLinFmjw18FSaboiq&X-Amz-Signature=67b13b4c4283b6b0706f9ec31d61931e193874277ede82fd7fe6f2dc65a9337a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XY4FQ2GX%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQC%2FXeGiFMAVAtWlsQHpKpUpcWQKaVtkHhfNJA86vsf7qAIgV3M3chF9g6J66FttkmWzC27gIECpUKonagHNIGYh%2F18q%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDBcuzr4QeoP5gfPdzSrcA5xKciBZxAGRX9HwpzjAr8Gb3jGK%2BoKeDHX73BYKNmJki16hBSUFAfAEtoFmF%2BKr%2FWA0q3wey4j9xxFhl1%2Ft6ByoHw3GgOXf9Uz4HpylCDN1FjQ3dJy%2FOLKP5TbHRk3c85rCAIptncisKazkfgMwMtyH4%2BF%2Fj79NlLr5bKPI8KomFKgwhDiUjL1VLzyRfH52f5Nx7f%2Bzy2awnuHBgRuGqIm6uBLBZJk05k6qmfg5Nl942Q3z3OODgyoHJ2c63lPgIM8hjpOd1yCheHKS3RKFo8%2F0UEE8fVSCLMFm2TJrtE54tHsNYVS0f8KnkcEs8bBolEn99PDLYWRFFQAcfcJoIOdh6CPvkARoGV72BylUr5n3owE1eRE9nAFfrX9sh0uxdCIj%2Fb5ONgF1W1%2Fg%2BuCsWkV0mQwrpTh1f6q91MX1VHx6aORpgoidY2%2BuH26QxcoFF2Xav%2FmAvnO3HI88F%2B6il3ryLQ%2Bm4elhYdS6hk3S0y3zZia%2FCvIVR9g2Fa%2F%2FSnfJrkyl9wD%2Fb0MulsBm8Pdu4Z%2FNNVyCviw9f8AlmDxTYWfOBKf%2FBBw4kCQAklXZA3wwfSseiJZ7ep%2FbFS3k5PhT4n6dUjpP3pfUQH0JhKznRbbI2F3MNG70K8o2a%2FuNMLDE584GOqUBQV%2FtklVpl0xyLoYVJu9OPPCAPHk2E2JtcN%2FYLWGJtpqqxSph4vM4BraYSL%2FpJRkNnlXjdy6Qu%2B8ecx9oOdXkneEZ4W81uA6c6IGS9iDtT6Yxi9wRYzR1JHVOa2spHJnQpXqwe5UpVD4r8U8VFEATlmjQ56Tp0r%2FhTkvsZmar%2Bnm0oxeaEXS1cyQhr2ATGXRldr82tuUO%2FbLYzsZzSY0ri6WJZBHQ&X-Amz-Signature=196cac39d76bcbf0657d55a42e277aa80bb77b66bf9ba6313ac4d47607e5c8b1&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466VZMUERJE%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064405Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIErj1nIfy8rzQL3gOJ3Ex7M%2BNeBhWsJpSv7ysFuO2O4lAiEA0ca7KJhWkcPZPJnGFzoK6%2BubFfnRhxPb8Xx6GgNEh4gq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDBEW7Ukfmg51GoFxmCrcA0rbqmxgUCHe5MPCOR8kvrf7qW%2FGv%2BgszHjIZnYc3QRLzXLFf%2FJ2pQX9W6%2FmjfTJvteER8zrqj8rXNKJ35gRoH1OJaSMnbuIxAZIRy%2FVorGUlRMC8rd6XznUcIk07rlzY37SlNrKRvs%2Bk0zsgJDYh4KV09iMsjDGa8bogWotJxi8Yeg5gZyoCaNGogVkxas5cDgaAqARoo9n7Z2SP8WEWQDEnfBlmopOWRvouvoiBknZoCEbhC90MT5RLLESeWYKl6NmW9i8izJrdTNWo7pYIPxU9Gqybads%2BhDriMdiFmVX87xf1FH4I%2FrlbzUYvo4z7jwQWKN2umwoq5g%2FUwg%2Bf6zmWBRvr%2B7oocxejL70TaINs2Wz6OcK61rMYyyrV7%2Fw4Rns1Uxs0w%2BsdMkURaHgjUtSCjhPRBmP5Q9vC7eD8sYyzuWO64zrAfQSJpVcyFcX4r3kQRJfU4Rz6wpBr01QJTTYcFvbnn7nEEXXRgHHQ%2Bu5410j%2FlQ6nh72mg%2FYSljhuyzaS84rBXF%2BbYZpAZvMbQATnw57fFrIVMZ1MNaQZsa7lOrPRjflBpdmTQrmd9SlmpauNbEF0wuy%2Fm6JRYr9zIJSQOEXqUU8Mr%2Blci8JBd2J6VuPnCWgM7OzspBkMNTD584GOqUBAaUMkjWGDhtqAAutuH7PNhimNDgTqFGeEjyuvTj3bo1Ntgs4G7qbW7H4P2Dw%2BFpkOs7dqO1dIxmJcwnM5cV5rycUk9vPAHk1zFKA24C69kNXHXtStW7uNmnG7Vq7pSSYzeuBz8Hr%2B93d2O6%2Bi%2B3BjFeDGhnkZUyNPUmnuX2u09zT11atnsTfs6CVUvItbIltLSx6HAd13%2F9Xpvgi4S0wyESooHji&X-Amz-Signature=434da733b0e1c12d2e9b4318a12c3864f063a79882319499d234c9a1fc6f424e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZUW3WQD2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064407Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQD7tp1eZp66Mr8V3ZROrX6aNpOFBhaX5lydLM5PUgzYdgIhAKfI4HWYa7p%2Fmmh2JvKTS6G5Z187VGPyB4x8DHkAlDA4Kv8DCD8QABoMNjM3NDIzMTgzODA1IgyT8Bd7i5Po6L7Gvcsq3APh1TQGnGUS7qWIyg8bFJptX5gScqo5Y3QrwFy%2FdTknBkl%2Bwsaeq5o9l%2FjRE72mlsAM3Uq1mQA6qavlf%2B%2F2dxZwf0DcDRHQo9Rkm4Q2N%2Bx1JzCCdKhPPFuXjDDeSkB31Nhv0IFowrVdpziJ5UCoRjjxst5S5ajjHlTdkgidXRfDKqgH4VBKhpRAzF0E7BuX49HJu7bIjLXnbmvoTQUYwI6Jzvxlqdb%2BuEsUa158Q9ydZvKvPyOomnDHbtXS7Ftx89qF%2BlOsR9VPRjruLQu6IzIEvwUhnqd2JiUf5Bpon23F4e4AOSoqxZEWzZtMza9XZ%2BQFhYZDttPZQ3r5LjGY7sqmfP469YUqJS9SfSbidZgKCrlinI6IueVeMg%2F4tEQgAASlD45bzv9u8WS6PsuktkNV%2BAhpUWek0op340%2BaFn0HZUrFaFwB9R59dQhpk78ZwK4BM3LdYjHdHawREn%2B0Abts3D2wAQRoq4ddN2et%2BPB20ZC0YOw39%2FIMbuzJRVi7NYfpwJ9cCkudEhSHJUs2as%2FC%2BEXmvQL%2BCNoY3BnJYCxoYEWgAb%2Fice8YbUuCL36EmzBpXbY%2B7ZDjAf0o%2BGwMc0NSaILhqZU57pRk0EfwSW3I6DcKDNrM937T28ohzDDqw%2BfOBjqkAaNTrxxIT6E10Fm%2BNB5eSTXLuAKp%2FaOsRnbJbPLXIV5PfDKKbTVvsM5h5SOgOkEVpKFNh3%2FS6POp%2B5ficm7NJCFCZXlQ2QKUQPjmiUV4mFf7P0gY8NMpWy%2FDHL82%2BRdTg6V1GFRehpUjKwadiamjasTjtAOzVXeDrou%2BN7PPg92ihwQNEpoeoFM%2F6el6C%2B%2BTe4gBdNIGw%2FaHYUF4cZv%2FdeD8y%2Bq0&X-Amz-Signature=672227a6b8daf8ca03bf9813363663eb8c2fb7891bd994334eb788c2eb5b4d34&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIPLAAFG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCxPsar7ZssUFSevNue%2FKaB%2B%2BrdFNg9mCmHViXNlJewHgIhAPPmLVG2Uy%2BCq4lr6YhQCHkkT4MoGz%2BMaTr67our3NjMKv8DCD8QABoMNjM3NDIzMTgzODA1Igw%2B%2B0wz0nC7t02AFqEq3ANyEskNSmATIHfr0mtu1zoulchQeIaMcx%2FUD87QN77cMdeVvlOc5r1h%2B7MT9s9WImzTT2NUaj2b%2FqlHT6uzeOitpd4vrjbvC2JixlNCXrlNmKjO6IIMOpclQfSf7ahWkRIAL6gPfWaHau3Th%2FyIoBQpcsI1Zfu5pkYp%2Bt8NjAjz0EMQq7%2FyUo9Pofg9tUIOuCHGPWutIsxrOT1%2FbiMSIE6iiMpOpPLoz2c7rEiciBFqCkQ55%2FXV13WT75Y7NpSXDFKKl2h3tbPMs36kpsYXlfuzhR7LNO4mq7ge4F%2Fewv8V9Nu0ugAgD%2F4AuCeKE6jWN%2BBZ0oqVXCiLhp%2FEA5fyKpGLk8aZW3%2F1PGVVhxhLtWVkC9XwRxZxqj%2B%2FG0g86z%2BxqjyVa%2BPoxaDRyLBwH3iL5QlCskTTNw3n0IvtHSvPh28Ba9lKKu8PnUDj26lktgceS9xDd6bPmf1X8OVLqZ%2BszkWgP6dNZkCk6A7eoESQp8JkscYDlaS5u5b3l6G387cRDWd%2Br3cTDU55um1Qk7wn5GbmXHvrt6Qkm6xV6sU2FSTgTjEfvTxyGokabHsyDHlgSxSJ0%2B4k0GawNZpJhpMH2HrHklHM7EKrotekVVIeHQbrl8SCuq0Rqh5mUXEk4jDrwefOBjqkAXBtU54%2Fw3LzgMp70xfzQh%2B7o8%2FGes9dpRuWnRwyCYLkurIBmFlZ%2FUWYRnDhhWzvN%2FpWgXIaeYVitZeGcj%2BBea7cBkMIncrSxECoUTro3NIgzQLXw0rmb9xKCczOneMK7pZFeHvM3uBhXpbz9RSWUgWK5I6XnzST0iKNncILkne409b7DQ7YQMu7NS7zEnpNVEgvx6m%2BYdbeMPlDqBL8LN2wruXz&X-Amz-Signature=f87200dc625e1742b292024430c48f39e611dc155f654911a57b4d4749a91d79&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466WIPLAAFG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064409Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQCxPsar7ZssUFSevNue%2FKaB%2B%2BrdFNg9mCmHViXNlJewHgIhAPPmLVG2Uy%2BCq4lr6YhQCHkkT4MoGz%2BMaTr67our3NjMKv8DCD8QABoMNjM3NDIzMTgzODA1Igw%2B%2B0wz0nC7t02AFqEq3ANyEskNSmATIHfr0mtu1zoulchQeIaMcx%2FUD87QN77cMdeVvlOc5r1h%2B7MT9s9WImzTT2NUaj2b%2FqlHT6uzeOitpd4vrjbvC2JixlNCXrlNmKjO6IIMOpclQfSf7ahWkRIAL6gPfWaHau3Th%2FyIoBQpcsI1Zfu5pkYp%2Bt8NjAjz0EMQq7%2FyUo9Pofg9tUIOuCHGPWutIsxrOT1%2FbiMSIE6iiMpOpPLoz2c7rEiciBFqCkQ55%2FXV13WT75Y7NpSXDFKKl2h3tbPMs36kpsYXlfuzhR7LNO4mq7ge4F%2Fewv8V9Nu0ugAgD%2F4AuCeKE6jWN%2BBZ0oqVXCiLhp%2FEA5fyKpGLk8aZW3%2F1PGVVhxhLtWVkC9XwRxZxqj%2B%2FG0g86z%2BxqjyVa%2BPoxaDRyLBwH3iL5QlCskTTNw3n0IvtHSvPh28Ba9lKKu8PnUDj26lktgceS9xDd6bPmf1X8OVLqZ%2BszkWgP6dNZkCk6A7eoESQp8JkscYDlaS5u5b3l6G387cRDWd%2Br3cTDU55um1Qk7wn5GbmXHvrt6Qkm6xV6sU2FSTgTjEfvTxyGokabHsyDHlgSxSJ0%2B4k0GawNZpJhpMH2HrHklHM7EKrotekVVIeHQbrl8SCuq0Rqh5mUXEk4jDrwefOBjqkAXBtU54%2Fw3LzgMp70xfzQh%2B7o8%2FGes9dpRuWnRwyCYLkurIBmFlZ%2FUWYRnDhhWzvN%2FpWgXIaeYVitZeGcj%2BBea7cBkMIncrSxECoUTro3NIgzQLXw0rmb9xKCczOneMK7pZFeHvM3uBhXpbz9RSWUgWK5I6XnzST0iKNncILkne409b7DQ7YQMu7NS7zEnpNVEgvx6m%2BYdbeMPlDqBL8LN2wruXz&X-Amz-Signature=8d67141b55db962f283a0d231c7d275c7af9f9119eb94c9e029c8ceb35073d71&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TRFHJZ4D%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064358Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIF%2FLMg2vi2RllrK%2FtWAdLEbFkKaUaebg%2B1%2F4A4W6PPssAiEAoG4hBRl512LjZS9FqubncufR%2FQXyvmZDPU706conK2Aq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDCWUrkF2WRXArdE4UyrcAyeB5YavdE7JGPhVcbdHJFGaICZdMAjp6XvEw5FTlg9P9vZGjhDybDundcNLly54tO2SCliC4dHM%2Fyr5Rq3HEjl1X792AtFjD5tNkKnSrHfXOB%2BHjymC6swWNrglTBzk8xuBvANqi7OqlidZypRc%2FfzUl95xt7F6SHxlsKXVlfGyFc8iYE7j%2B38h605Tlwwz%2BhLJu7mctQuumppCF8mUBSUycarVTgB0bwVTu%2BKHwQrnv7c%2FhBkKKpWVAlaWg4zTWAj%2BJdGUhuRheDfq5gpQii5UDS6E82Y2iJlcUbwfPSQp7EbR6jLebYlcsb%2Bp1FxNlZkX4YRIME%2BAUPsXmlk7ls5dU3lbdbQb%2FLCquPHthWTCOgjunn7%2BQ3qUcqMCTKDo1H%2BgYNnbYLs%2FHKJlTWgMAUkrrHvcZKx5JUEssH%2Bl84KdxKl96mzScWJ6liOesjaVveTN3WoBHyI3fS4SYBqHN01srIeByYCLdPd1HQJm9unpQ5ebOOBUJSY8uvt4rMP1jUvVZ0i33ocblqSyjW91So9oejSrkIuam1dQERZ53Z8XXPoL4jDxxVtcZafP1JYSPIlp1sTSyuM9peUMjhJ6JSOmv%2FyVe9w9OgQTXOdyVCAcpgdfzzo0UuFU2mGGMN%2FB584GOqUBxdx4VRYZ1WpmWbs%2BeCCzwer1kfALJBrhbI3V83GxGKdDeUZEJO4LSTMa6qI3vevMGEQbmuyZmJnkCSWQ4V1UY46JH3kyueNttj0pQ83xJLVA5Hr92WIj4Y47IXZ3vtb4PXCGvoXYa2uZIWU6ULp8z%2BkqD%2B5mQi%2FxBdYLw%2BQPkq1INkjIJ1zA%2FWIMr3nAKhpWdixHGvXO2LzqenEACQ2DefNaHFFN&X-Amz-Signature=0a19a726646c2fa4ecd9bf7de4fc3f5a7cd61f6f4c7b30ed0db91cb30459df65&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPSD6FUG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDWIoQuM7H88JGctmG%2B1bP84rJWvLwh5%2B%2BrRwNpDZlv%2BwIgaaGu5HgfqdCyyByPFg6YOj6h8XCUTrS6R5E77mCBIOUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDLJSs2nXxoFbxJC3qCrcA%2BcW81zub0N741uTBYY7W%2BjVc5xFoyezJMSiFBsRm%2F5aP1ACI%2Ff0wegsOgxlyETzOxFVTYYk1OzfX3avIOBUiAzjyZlQSREYUsZwHcu1BqwUgx1uEu60Enwy5mMWItksfv%2B7ixIhxlHSpYSzvZxWOcsCOhGMREVIg0odjFt7%2Bgq%2FtyNGjALgb1q5wRbU8v%2BmMdN9YKFhTSCRB81ZG5%2FEdFAB0nBAMN5kuZ2vGPRRWwBahR61gB7B8BBwsgwIKnUrbyvcUJRlXiKpWJnOq19Vj9JV1BOpIcO25Vw9H9V%2B0O15KbMBnlnS99pjGw%2Bq9fLeBcC6d2RpiXYDMXBWGSILtTMfNqRhp11Xp22s5h0bvm7Z73gaAqphIIUNzjJlaN1sCDKXUTkIvhOxjhWhmd8t8CdZ%2BgM7%2BDiNbSz6uaSR0QyImG3972efl3t53fTjgBLXSPTKObt2n5egmOfiHJytp8smEriESn2aRtiX22WdpiOo1ddkIur4LssAKx9lMyb4DOggCGnfmnYrYtvmegJGmm%2BticJK1evol8vxdGGcI0iodu0ZijLyGLpMzaaCb4I%2FPnadqrq7keuz5%2BrLyfnvTcgSTTA562Zxzz4ceZobaHrfqIjAKUAGELJ3yXpAMJjE584GOqUBeclomld54a4XRS3zqM0SrjIBnkMZzbOH9ofyFzpG3LdqCw%2FU5oTngeX4gDZI5DzIkEL%2B7cD%2FVi3Et1EFNUb%2BIcl%2BjKzE3B9XqomKn%2F0%2FEbCD%2BCA51KJBPdb9kvNPbEKCq1Ki5EtvSjKboiNOH7PjT8T0AmlX99%2F%2B3252zhcjeRV%2FmRYmjcTw852ZTrxNM0PLRc6e%2Fjgytqw09OFk8B7UbrxoGw8l&X-Amz-Signature=e45434065acb3ba1875f49b6989030b967ab6ec2ae3cd6f6669a1098c6a4de10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPSD6FUG%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIQDWIoQuM7H88JGctmG%2B1bP84rJWvLwh5%2B%2BrRwNpDZlv%2BwIgaaGu5HgfqdCyyByPFg6YOj6h8XCUTrS6R5E77mCBIOUq%2FwMIPxAAGgw2Mzc0MjMxODM4MDUiDLJSs2nXxoFbxJC3qCrcA%2BcW81zub0N741uTBYY7W%2BjVc5xFoyezJMSiFBsRm%2F5aP1ACI%2Ff0wegsOgxlyETzOxFVTYYk1OzfX3avIOBUiAzjyZlQSREYUsZwHcu1BqwUgx1uEu60Enwy5mMWItksfv%2B7ixIhxlHSpYSzvZxWOcsCOhGMREVIg0odjFt7%2Bgq%2FtyNGjALgb1q5wRbU8v%2BmMdN9YKFhTSCRB81ZG5%2FEdFAB0nBAMN5kuZ2vGPRRWwBahR61gB7B8BBwsgwIKnUrbyvcUJRlXiKpWJnOq19Vj9JV1BOpIcO25Vw9H9V%2B0O15KbMBnlnS99pjGw%2Bq9fLeBcC6d2RpiXYDMXBWGSILtTMfNqRhp11Xp22s5h0bvm7Z73gaAqphIIUNzjJlaN1sCDKXUTkIvhOxjhWhmd8t8CdZ%2BgM7%2BDiNbSz6uaSR0QyImG3972efl3t53fTjgBLXSPTKObt2n5egmOfiHJytp8smEriESn2aRtiX22WdpiOo1ddkIur4LssAKx9lMyb4DOggCGnfmnYrYtvmegJGmm%2BticJK1evol8vxdGGcI0iodu0ZijLyGLpMzaaCb4I%2FPnadqrq7keuz5%2BrLyfnvTcgSTTA562Zxzz4ceZobaHrfqIjAKUAGELJ3yXpAMJjE584GOqUBeclomld54a4XRS3zqM0SrjIBnkMZzbOH9ofyFzpG3LdqCw%2FU5oTngeX4gDZI5DzIkEL%2B7cD%2FVi3Et1EFNUb%2BIcl%2BjKzE3B9XqomKn%2F0%2FEbCD%2BCA51KJBPdb9kvNPbEKCq1Ki5EtvSjKboiNOH7PjT8T0AmlX99%2F%2B3252zhcjeRV%2FmRYmjcTw852ZTrxNM0PLRc6e%2Fjgytqw09OFk8B7UbrxoGw8l&X-Amz-Signature=e45434065acb3ba1875f49b6989030b967ab6ec2ae3cd6f6669a1098c6a4de10&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664C3VY5B2%2F20260411%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260411T064410Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJIMEYCIQDmVviJV9iem%2B2xw%2FGLwz%2FFKeiYkx2QbA39lrGaLYH0AwIhANfsVvU1%2B2s9YNirMWg%2FJZ%2BvSruUtTMO7q6lLa53Oon%2FKv8DCD8QABoMNjM3NDIzMTgzODA1Igw0ADwx%2BC7pCKxr214q3AMLKcfucIUOkw2mZtDPHjM0%2B9JN3Xc3yVD4R1CfXHZYW1g8sPZzcTZ%2BJWg5fHM0WntEvMPZYjGJjOo7gG4wje1dehmdgZah4QAAAGsIuFKjRcwnIzUDj8voCg%2BfRjQMzR9bezu8fQAFmvhqfoI8xAO695wxHnfR%2FsVD8wPZw8MclOTGIPuTL5YCySb%2FBzmS1pGhsSapYB6s9LGMo14umeeAbU0uurTXS0nvaIMrZr5wSGC1SLMxHDqYHgS7IQZsFvWXIduacXZD6moSdr9%2F%2FmgFWLD7iXSQW13M5xpUq7s%2FstN3dv0zYmneiI%2Bzya5wGoClSgWPLDpfJ5C4%2BGsskvwwzYau4Mlzy9ZDsSJvpXDKdovKRRudWx2XzM0gfYG0%2Fpj19KREOOhB1tm0kvsuw%2BwzVrsU9yJ1upq7fVuzozbTggjzgRCtVpP4bw%2BdyoVrkRIKkAOz%2FJdOiK7vVGKNRwekgBjWpOYw4H97cTUDgsa3tzNNkhr7ZOtjIA5TtfEJ%2BvYxYRFM%2Bpm02%2BE1TpALqEvd9ucdt6ljn6qDS%2BiIO%2BomRZKqZu8NxmH6LSs4b6yr5lIG%2BAKiI8HNWPnVYQeUJPUFothsUQ63LajRkwmzmJ6%2FqRObZOQRA%2BwjTsfUvTDFwefOBjqkAeabRJFUeww62zaN3m1NpZqMfS2fCHBbhvqAg0qJrc19JH6sdyqgGXnI4UGDmdtGZVESbpDrTyZ4thJY9c%2FKJJw0WBDRt%2F97xbh9YWofpzv2Ix%2BZF4%2BdALdZad98vURyITbli6nu%2BAi5HwGEZybxPOC4wOs57jk6ACEEMBjYou3Y2xvLHZKVWdPD7Gx9xcamN31pHdv3YINkv8JmS%2BtGM2sadjie&X-Amz-Signature=b9819ddacbeab8016c46a0ce45106d902880b7f07e29db79cddad60436c1e297&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

