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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W43I55E4%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQC5c6S%2Bx1rkyrsPBw0u1AeC8xa1ZCUaSgiiCHGgUZvvogIhANyf39BKiqjcfVCciOA7pXmckCx4t5gEO7hrS1LeeGpnKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwRgqCjywVoE2DLdR4q3AN7RVHMuqNE%2BapIrOudMcisBJzGQGPyRFfypdaUnYQDhn8YnXh2PwAA2Kr6vXoZOUpVOpUERmv50xmDMfhDYblZLnxspgIR6K355Ik0AaaXncxLVKSkwNa0s4GyMrllOWTQetXaMPAxEOwrx7N8prJM75KxaPR7m7Dx4b3WhxOs62juYRMPM0MBzzTqLr8PsL8IJv8AOOVpAD48%2FZMZinHePdx5oqNoz40wfPGwDOcb2ks7BvAQ1u7I2OAa5j5Y0zeGPV51jvaFwxLPiSKILHsndkW%2F8yrV%2B7hgWfYifRd0xqsLmzUMQfdAsbqnyKzaopHU8%2Br0dSSvc2mwhZ3TaN%2F9Ukb5hh5HZDcsYjS%2FqDdZ%2FVgI%2FwFv8sHs9NrE9gMdZmwfocspe1Om%2B4FB2kxSlMspQg8XvaFAhLeV6eXZwlV6wOUFRBelhKkTwR%2BNAySGZGlzWkPmg1bTQVyfUN1yuMWZgUTWv%2FpobWo1LwTmsIhEUb9xcbfBBsj1MvxSAhVGsVOhMHpf%2FGpU6WsGQN5jLFsuSDh9RJNQ%2FEGWjIXrsRQxXbj1hG8vxpjWjHqGZwUgZp6f094skgR4TAiu9GbTxyHJkfh5kHpTzOaSsBBXH65jHT37ugwwTG2LD2%2BEFzC26KzNBjqkAVU%2BVJVF5nCdr%2FbUWYzlQHEDOTN8EkMfsN%2BsymFfwNVpoNtqSkXlMpH%2FLPBR9f6GN8p2mgxru27p7CJE%2BlEcTcCiai8tbTpki7rYdvtbbZeqQCEIjfy38ob3hCZL6s3YGbNt1J%2BdpFvNnTM7pxu3NOIKi1FwdpRcc9EyJKU5QridBm%2BZWGAQG3P3VUe1V4Qxi17yb6wqpHkvuaTVf3zp0UgN2JeN&X-Amz-Signature=912d2e985cc0a4874402be3ceb2876030aa51a29c8fbc7b6811990ec91111257&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466W43I55E4%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQC5c6S%2Bx1rkyrsPBw0u1AeC8xa1ZCUaSgiiCHGgUZvvogIhANyf39BKiqjcfVCciOA7pXmckCx4t5gEO7hrS1LeeGpnKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1IgwRgqCjywVoE2DLdR4q3AN7RVHMuqNE%2BapIrOudMcisBJzGQGPyRFfypdaUnYQDhn8YnXh2PwAA2Kr6vXoZOUpVOpUERmv50xmDMfhDYblZLnxspgIR6K355Ik0AaaXncxLVKSkwNa0s4GyMrllOWTQetXaMPAxEOwrx7N8prJM75KxaPR7m7Dx4b3WhxOs62juYRMPM0MBzzTqLr8PsL8IJv8AOOVpAD48%2FZMZinHePdx5oqNoz40wfPGwDOcb2ks7BvAQ1u7I2OAa5j5Y0zeGPV51jvaFwxLPiSKILHsndkW%2F8yrV%2B7hgWfYifRd0xqsLmzUMQfdAsbqnyKzaopHU8%2Br0dSSvc2mwhZ3TaN%2F9Ukb5hh5HZDcsYjS%2FqDdZ%2FVgI%2FwFv8sHs9NrE9gMdZmwfocspe1Om%2B4FB2kxSlMspQg8XvaFAhLeV6eXZwlV6wOUFRBelhKkTwR%2BNAySGZGlzWkPmg1bTQVyfUN1yuMWZgUTWv%2FpobWo1LwTmsIhEUb9xcbfBBsj1MvxSAhVGsVOhMHpf%2FGpU6WsGQN5jLFsuSDh9RJNQ%2FEGWjIXrsRQxXbj1hG8vxpjWjHqGZwUgZp6f094skgR4TAiu9GbTxyHJkfh5kHpTzOaSsBBXH65jHT37ugwwTG2LD2%2BEFzC26KzNBjqkAVU%2BVJVF5nCdr%2FbUWYzlQHEDOTN8EkMfsN%2BsymFfwNVpoNtqSkXlMpH%2FLPBR9f6GN8p2mgxru27p7CJE%2BlEcTcCiai8tbTpki7rYdvtbbZeqQCEIjfy38ob3hCZL6s3YGbNt1J%2BdpFvNnTM7pxu3NOIKi1FwdpRcc9EyJKU5QridBm%2BZWGAQG3P3VUe1V4Qxi17yb6wqpHkvuaTVf3zp0UgN2JeN&X-Amz-Signature=912d2e985cc0a4874402be3ceb2876030aa51a29c8fbc7b6811990ec91111257&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TPFN7MRG%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201705Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIHTMhalJG5skhwXEk86gurlHIUqiS2iiikpbBOW0zMuLAiEApKElZQFg3eijXjqjxap8h3XcSi8xkqnNTkxztBvmDoAqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDFl4FfOB6M2sS9JHfircA%2FyJ5hJjXar8oVVTlccAyKv%2Fk9iA86jiqsoNcY3YN%2BIntafhpdUbkCpAThILy3eqphHajERz4UBW7Ez5%2FuXQBZxGFvhq1jBPzKuId1bbaAKlIHFBM7XEoCp%2B91mkz9G6YJWwB%2FDujtRrC9t7ykg829YUQ7RmITebaFHg4JoEasCnbVmRsfbtjO5xmJejo0GUMacoi2NpGn64%2BoEvWU%2BgUBJZNvvl6uIgHldOWesOGeoVDhuSoxgUsghcOx0VPNuNtzDuk21O0uEeR%2F%2BlzcC3lzVBziNCyCdMUf7iOwNmzJfnQrNV2Gw4GpXqI90rlOPVHCQs53dges8mxQ4pZwB%2F6Nk3UYGP7BLj1M54IQIlJL4%2FD6x0sak%2FvN%2Fbhdzp3q3f1PM1y4tW9rn6cAkSeLK2PDBWzun9%2BpmS5VWoH2qRFCfpwsi8%2BG%2BK%2B94YaAL6wtdEo14At3rjf9NX7vTJPKbcJeP7yFPo6ZriXHVZSnNvRCsqYArqj8O4csGFwbxyc3ZQ4qOSz0lQM7nUX0PEzok7jJisUTzp%2BoD8qVSNuhjX6TuLYqqE0WnuOCWAjuYOHmcc3NjRzliMoKhKU9S8oXXzuU1GpzUbXLOYKVTgk3GXM9YNsBbkzkFCR4bT2HvKMK7orM0GOqUBhDoe9GO54jQEnk2cZ7MK%2FD%2B4SKs3XaGFpLfyEw9SfqZ82wTr7Rouy2ypKmiAacHkyy6JVm%2Bp86dKI9w%2BrvjqLO0FKU0DatAQft65AEN0BG1GrVDUwZehQ2u64AgTDlGA0NyUhuajApHyu1yIsn2Qt3lniumQlnl2EBS2dn58yObMFnR9MRTakPUyffQMNwK%2BfCM2uhSc5ejf%2B5NGvgDVnJdsuvWX&X-Amz-Signature=e942f27c98d623dce308575dd0ed334827707b599427afb720d014fa083e83b2&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YJZA3PU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDssaCMHbPQxJ8ndfB%2BsN0xbETpA5mW%2BiduHE7FahTyhgIgOAVqcE6Xa9wpGlodZcioJoRYYTIsdGxYjvC7ytG9PgsqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD33ZpDYj5Pa%2FaE3cCrcA7zzAM4L5MzfcJOJTDnBrkgrcel1J%2FqvJrc9re36iT5Ms6Y98NwmJ9Qee24LHGTaiHs%2F941a%2B80WcS0tEpl9DBNFTPTwdJAwqZ%2BbWLD%2FkW4TDOSFCZXBlcf7wZcUFITtiylCJ32x4WxkG1spIcbwFK78N1WR62nZVxCr6h%2BRCgHslfEH5s9aiajx1J3njRnr63cYiQHwL7ULCmm3l4tyLGZFiadJvJl27u1fzfe1wzQxCrnBPRypALM67E%2BFXzDkDC8tNE64HI0ss%2BRTdEFQxPs7fUv34oFG0DehWWTqidZ6h8zuZFUrZTAG4SnCyzd1oNO3M8eH%2F6iB0phTcMIBFnClFAqMu%2F9YifWjW6XfZWAKipCREPB4vbikVTNBl0vqFcOXWOFbUqLSc1xbD7wVsLPu8QAfFbE2sUovFbbvW2CnanzsbvsXu6UkVcchaicKpkw7XzPucg2sVf9lI%2B%2Bq6%2BRFQBgHhLHrWUK47ffh8TXcYoHT0KwnqTI83Eah6pkGxVfabKcp%2BX9gToI9JfUfKRD9iKcudWfBo0Q54e%2FWybaK%2Bht830m11PMeoLUh2p7QL7jXpiLTuDh%2FqN6U5o6PdozOuB%2BkccO89azSOXPeFxOrfYKWCxgBnq%2BlBqqjMLHorM0GOqUB9Yd6AcMcbd8A7pySfpHOXG8yRjZyhoX4MaAl9s91v3Z1LxfWukDOVCAtznSZPFQIcHflkqSbDBUDOt3lys2xtPea5XAzqXW%2BpOVlCiaaoAXQQhz9%2BsLuSuZ4UXmuClvBTZD05M8RyAje0iqKlhMUHeDBLPEks7c2wL%2FDMo9GlctsKRtiStMw1%2BC6X7XFNE50leku386Zt6OLch4b900m%2BK%2F56icA&X-Amz-Signature=cc408229f7cf3ceba6cf9e7aa0442674f867476b4099965946d6b2bf235f3e8e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665YJZA3PU%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201710Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIQDssaCMHbPQxJ8ndfB%2BsN0xbETpA5mW%2BiduHE7FahTyhgIgOAVqcE6Xa9wpGlodZcioJoRYYTIsdGxYjvC7ytG9PgsqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD33ZpDYj5Pa%2FaE3cCrcA7zzAM4L5MzfcJOJTDnBrkgrcel1J%2FqvJrc9re36iT5Ms6Y98NwmJ9Qee24LHGTaiHs%2F941a%2B80WcS0tEpl9DBNFTPTwdJAwqZ%2BbWLD%2FkW4TDOSFCZXBlcf7wZcUFITtiylCJ32x4WxkG1spIcbwFK78N1WR62nZVxCr6h%2BRCgHslfEH5s9aiajx1J3njRnr63cYiQHwL7ULCmm3l4tyLGZFiadJvJl27u1fzfe1wzQxCrnBPRypALM67E%2BFXzDkDC8tNE64HI0ss%2BRTdEFQxPs7fUv34oFG0DehWWTqidZ6h8zuZFUrZTAG4SnCyzd1oNO3M8eH%2F6iB0phTcMIBFnClFAqMu%2F9YifWjW6XfZWAKipCREPB4vbikVTNBl0vqFcOXWOFbUqLSc1xbD7wVsLPu8QAfFbE2sUovFbbvW2CnanzsbvsXu6UkVcchaicKpkw7XzPucg2sVf9lI%2B%2Bq6%2BRFQBgHhLHrWUK47ffh8TXcYoHT0KwnqTI83Eah6pkGxVfabKcp%2BX9gToI9JfUfKRD9iKcudWfBo0Q54e%2FWybaK%2Bht830m11PMeoLUh2p7QL7jXpiLTuDh%2FqN6U5o6PdozOuB%2BkccO89azSOXPeFxOrfYKWCxgBnq%2BlBqqjMLHorM0GOqUB9Yd6AcMcbd8A7pySfpHOXG8yRjZyhoX4MaAl9s91v3Z1LxfWukDOVCAtznSZPFQIcHflkqSbDBUDOt3lys2xtPea5XAzqXW%2BpOVlCiaaoAXQQhz9%2BsLuSuZ4UXmuClvBTZD05M8RyAje0iqKlhMUHeDBLPEks7c2wL%2FDMo9GlctsKRtiStMw1%2BC6X7XFNE50leku386Zt6OLch4b900m%2BK%2F56icA&X-Amz-Signature=bb3aed311e6c514963139b4e0dd9b8758ae5e96f17fc69675dc214ca0ee60664&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YSL2LOBC%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIG%2Bm%2F2cco6uiT3XWNjdcezJYPvUuRKqI0G%2BN4asYbMV5AiEAyryaGPQPPYHw7QoTi%2FXFIJrvWUhv9O2evGvuwBD35hUqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDD3MX0k223C6NurjpCrcA%2FfO0gL%2B7dnzcPmY8MmeQg41Vr5cGS9%2BGyG%2FVdVchGogZCa4eA8jq7%2FZFrXexay5GIsiVwlXWuzXiud45RJzxXr4iZgR0cBn7f4Fvn2BMgmKOaloqEBkOhEuJZXHBEt%2FT00e%2Fky5AN0yMon%2Bd7nhzR3PLz2DXuPe2oVbyLFKAB0tfmv20zch928SINRiEk%2BQ2PsJvz6Us%2Bz9xO7pipTPcoMlPLr8%2BU%2FZh8ioAFsrnm5J0BNUWuZAGjEMQDPESFG7Ae%2FmDoDb1JKa%2BAEoVtkMvat%2F5VEu9VFmMYN5yfWGgUVzBF7M4PSG29P7ZtfzvxaddR3azmE7Xx6gXfoUsQ9WExeRpDoREbotay7x6vwcVurKg%2FLQipEmmCSS7p8Lq1iGoabUrf8Q40XwQ8poIc7KG%2FpSeHUmNr%2FAaCmOAHzg75Whk3FdoC%2Fmo%2Bvj%2BrwwDZnIu3%2FOuuG%2F%2BkpbJHvlEYDIo3wG0b2FxTTxm4FCYfAfRqGd%2BToGeKaglIZrfz7%2B7PGPGufwbgFjWjT4z%2F33G9xVIabsyrh2yw1P2SasCAI1orlyJidMefom%2FeIQGnQzNeSfAtbPgqE5%2FeQiro9jsZNIagUokcqpPzVjQYBy2x949%2B7%2BdwRIjgLJDBur47YnMP3nrM0GOqUBwBB6YXU9nEKuUgVD2hDpcAlG%2BVz19c8w5vslVaS6F86RuU8vZUQ7oUu4oaU2oKMusojGSJ8%2FNnSeOVUGpL2FHbXDWMGVpnjeRVM9aEjMx7lEy13J0GVFBOzMipuZN71jXPDEEkJr8fQBYuoXLSTWtxmKJ%2BBStfi42x20N%2F%2FdyZCiq5OSa6aCL%2FnrDh%2F6NMBjOSILPt28j8Y4hoP0InVmHdyoMHR0&X-Amz-Signature=ee188a8c4e568996d9ff75438e0573440a51d41a7bc3542deb6130833ae3cbf5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46656AN3PF3%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201711Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIBt1of7STiSGBKXUPAOkfXOS%2ByjG0SAsikybKtRubESwAiEA2w9JyDmS7%2FuCB06CDBadlwkNs7ynu79e5xvFM6dyDCYqiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDO9wyQQv6AT0GM%2FR3yrcA6S8vW5Rb09X%2FCUR%2FWEp0o2NXOsOL%2F4s%2BHYfN2uA026PzAmskwIPOAbRQQkjxyOUs6KjydV3szW%2Bv%2Bu62Lj7e8Co%2FijmXImaWUQXQkTD%2F2tpJTpNYamsKtfaeUF0QknRtWjEOtJJE0BvC2NUMKwts7NYeWqN9Kmltye%2BOAWAn1QPM2fiZEyuA61BDJwd8uDBj2OkIkoM5WAjm%2BP4RYjyjmYOrj9cP%2FHM53im9qSLzLvQxAQqpHvcV99S1sF4uymJnY7xHhKwX96ku1bWVBW8Fc4FlNghuqrKOB%2Bp8Ey5sZXLxlXDOKkA60C1crQfxJ6gPijIRUdPALuDGY%2FB5jlHjecYF1KSl2rBqMH722X%2F8KcEBIMApdn3rW0lC47bBNvikYhqbA6nDXCi%2B6pQJJrWrYkTK3A1EYkNvuZj3H8JuCLnpOwylCd2E4wb2SgEnBzZxIH9JTB9lIiTHLnwfdryNOELA5Z7h%2B1PWXizAHJpVKXzCmtU2cGtcPGT%2BCAvfD%2B0rpuR%2Bz4BYEFiVsp0b22bggyI6MdE%2BMX%2Bf18XZrhzpfBkFSjJ%2BqtGUnr0QgYrS04%2BkXIvdXbB4PkA5OAempgzgMdRESZWn6Pw%2FIaquNe4sDBG3Auyt00HxC3Yx36kMKPorM0GOqUB6zqxA1z0ntpnMDIyqBzNOIz5T7T4hUn3nYsSD5mC02Sew5AYiIwx%2BEQdwKHDjSG4C8U0JoI2M0X1A0rAxs1jWqmu3JvceiYWyIf3rHxw7DFEtFskByUTgXeg4tKP9SWYIajwhiAtkeTYUSET%2FrHUNj%2FGpXrf5citDWeMvUdy6MtBLUGV9JT2ZM2ojIcSzE%2BjAuaxu%2B3T1wxyBpmRbYZseM8F7TXE&X-Amz-Signature=d7c656cb2cbc00e5283004a7c4299da84ed822870daf235a8217d8c846b75c3a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665EO3MXKK%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201712Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJHMEUCIGdacvhLQUG4NeeztTUOaY7Ub8JMjNBUrBHaWAcSdKM3AiEAoxz8rvKiwspM7sF37N9CVZGhTcCDEOF%2ByBmacBomxa8qiAQI7f%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgw2Mzc0MjMxODM4MDUiDCiJfnPXWRiqyYnPmircAyzSaYXixti%2FiuIc2bmGcHO%2BdxVlZu040pGAS1C34dRVKVQcA6LidIC2CzUU7QKQJyvZe6FsUfuy5C0DKjwzhxhjIhqIPoK51aRwj5fUGqBIaWV9pf2gFSRXvQDRwv0rX8eMTc02In4AniVAl8WLyY8TKtbSw2EV%2BjKd0PRPEse2aaE4hNo0q8DRmDywMJ0eEEH3N8bhcyqtm5Bp%2BctroRh57L5vhHgAxF2ekkZmDxY39BSYkLy3W4LzqWad5mlikq8bCTARDEYWXz4NAaX02iy4zzl5B8nu9z8xFfLGhHQBtdgmjiJgu23GSceiUJjbQ7E9s28sCNOmy4d6b57KeWGhEAYI10V0WFbWh82ENVz725%2BURfKJ4HIHJQmg6mC1RQWwilFseREmQrkLEFzuNDfeueJnclIim%2BSOzGF%2F78%2FWNRhscMT4mVQZ5En8ZBa%2B3C%2FuUoU4HjTm4%2BA9ad2sm7QpgfXl2yWocILY7MjQkEQ%2F%2FZf4y8vAQoJoiKU3fKwu4pBrntBuBbfUksCjD%2BuwJcvx3CIXbx525XUWhYCXmqYy3zr3NobhAlFhirHgEq4Te4BOJlnMvnx%2BZYr3VLLBPGyihrkVTadsJL9a2d4AOQz64hkEZL1C6QH62x7KMJLprM0GOqUBA5pkRqMAJiylCfpC7hAAf1HcvT%2FdHGIICAJ%2BTfXupGq5iE5p9Re15M7xhtt8Ah1677cZRGvH%2FEanwkWRhxV0s5BdkQ1JvAsoMJz1DrYivmWE9l3i57phHxROho1J7fxILGvN%2FidbJD6t6CSp5RyDM8t182QMN4yFs4SXlHqPujs2j%2B6kd%2BD6QvUFY6pYgwqttWY3XpaD25qAAxroztbF60iQc9i6&X-Amz-Signature=84734f8a06036659a8a64fae3b6e0729c1168183fe276aafd31d1a73d0022e91&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ53TXF4%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDT24mmbUYJnzoA8HfX0H4N9GFMPc3BRJOy62jR8AfuPwIhAMskB8Q1zvndmwV0uGips%2B59eDNmxbUT8dvb9lUphIRWKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy30CTew5DP8clnXJEq3AMqjF1oY1Md053z4v36%2B0gX%2B0erAkChnUqAart1bhhP0QUg%2BpJ41G%2Fd%2FRiQx%2BxCA51wz%2BsCnM65ozQK6OjVpc5yfwGN8PF84pQKCl40SH78c1pG9wrMBI0cL4UZl2glUFPsmGBwHmhKtwZX40bPYtNPyZpOiH29rI3ilDyU%2BV1OR24bq8pRN45%2FNqXLV5hrNj0a6PWB6WZtQ%2FqbO%2FsVBBuq5oy62dd62yX3jdUCYCUKw3pRlKbTaYOzUntJDut3WF2NoEaCge9xglVjYg6iBl%2Bm6zJHAZlvkuYfD8Rkptwrp%2BGiJARoCw3vHN8viqZ2UtBU5XYok%2Bhow9lAnH18fo5ay84y92zoPrVZv74CRX%2FIjAH%2BGH%2FgwCnoRan5623u9t9C7SJgk1YpBjaEwZhE6qKSMHzSV6LXNd4QJh%2F9Yc%2FHm%2FwD8bnQ7%2BCDtCAX9vyQ%2BUHcpAakCBsgzp8oOpU%2F8X35ftnTCkeWf23Ocb5h3QtySDsJlMqiSdvTNLfnxyflSzicikHf9WXfm0NDm4G5BVfHdWGptyCA7vZIo4cAYuyIEF0cd3txAQCiF1PN0PL0tW8HwXyiAe9lEQ1qyGW3VMTSVHSVxOhUpa9J%2FjKJSN79sZHtM65L0FpxMOuIDTCI6KzNBjqkAXcdmwyj9nTMzijGnmu1qUrHypX9OHVZzusRvvaqxGFqMQaQXLcilCrphQ3yDrQpMTZSwY%2FU7pblGOHc9kltWQ0mmLhJEErJMUTSWdfc%2F3iLjM01W5WjcbqghSm8mgmHNb68Lp1yM3zEEfF4PGidvzVaSKjKeZJdFUbzwPwBS%2BbQSznZC7YdPKLdITb%2BF0vyamtSfiylywTUWY%2FwTiA4xOqiQxa8&X-Amz-Signature=b7ccaaab46144b7cd52f45e5c5a8c5f0b1a6b1d8d4e8217a5adde6672bfea280&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZQ53TXF4%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201724Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJIMEYCIQDT24mmbUYJnzoA8HfX0H4N9GFMPc3BRJOy62jR8AfuPwIhAMskB8Q1zvndmwV0uGips%2B59eDNmxbUT8dvb9lUphIRWKogECO3%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEQABoMNjM3NDIzMTgzODA1Igy30CTew5DP8clnXJEq3AMqjF1oY1Md053z4v36%2B0gX%2B0erAkChnUqAart1bhhP0QUg%2BpJ41G%2Fd%2FRiQx%2BxCA51wz%2BsCnM65ozQK6OjVpc5yfwGN8PF84pQKCl40SH78c1pG9wrMBI0cL4UZl2glUFPsmGBwHmhKtwZX40bPYtNPyZpOiH29rI3ilDyU%2BV1OR24bq8pRN45%2FNqXLV5hrNj0a6PWB6WZtQ%2FqbO%2FsVBBuq5oy62dd62yX3jdUCYCUKw3pRlKbTaYOzUntJDut3WF2NoEaCge9xglVjYg6iBl%2Bm6zJHAZlvkuYfD8Rkptwrp%2BGiJARoCw3vHN8viqZ2UtBU5XYok%2Bhow9lAnH18fo5ay84y92zoPrVZv74CRX%2FIjAH%2BGH%2FgwCnoRan5623u9t9C7SJgk1YpBjaEwZhE6qKSMHzSV6LXNd4QJh%2F9Yc%2FHm%2FwD8bnQ7%2BCDtCAX9vyQ%2BUHcpAakCBsgzp8oOpU%2F8X35ftnTCkeWf23Ocb5h3QtySDsJlMqiSdvTNLfnxyflSzicikHf9WXfm0NDm4G5BVfHdWGptyCA7vZIo4cAYuyIEF0cd3txAQCiF1PN0PL0tW8HwXyiAe9lEQ1qyGW3VMTSVHSVxOhUpa9J%2FjKJSN79sZHtM65L0FpxMOuIDTCI6KzNBjqkAXcdmwyj9nTMzijGnmu1qUrHypX9OHVZzusRvvaqxGFqMQaQXLcilCrphQ3yDrQpMTZSwY%2FU7pblGOHc9kltWQ0mmLhJEErJMUTSWdfc%2F3iLjM01W5WjcbqghSm8mgmHNb68Lp1yM3zEEfF4PGidvzVaSKjKeZJdFUbzwPwBS%2BbQSznZC7YdPKLdITb%2BF0vyamtSfiylywTUWY%2FwTiA4xOqiQxa8&X-Amz-Signature=4b33cd57b06c8ccf13dd080feb913f78dbd91bc2ca84abb75414d730e076e6ad&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4665ACYJEGH%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201702Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIHrkLAc0Z%2FD9GYSMg3fZj%2F2CDnu4Nj%2F%2B7MwgFjfdUfw4AiACGUNFXE%2F%2F%2BtYdPgVtAtBIx7ECxFmvxAT1h6iNhRai8SqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMOWVIjy3ngQ3KkSopKtwD4PQ%2FhTN9rVA2%2FyCVXliHkmI%2BoNwPaR4akR8WJCCmnenE3VKyoONdqbayNGmU9e8zsIVzKeA2g9f%2BPZPMFkKXz2iT97NKxjnHB9MrJxvITMKmzFPs%2BfeOaiN4pY1Ezb%2BgAt76B%2FYCQnmLn%2FxppXAswiBVChNb3oHudJwIP7gniiscJu3VOvefx%2FPWafJfmtfgs2DPxrnn108n1C45Yx4PvL1d8QS88MIG7ONvzZE7hQ357esf0ft0gKPs9qSr814RHRLrbB%2FclaFGF7M6SCU8Ij%2FA%2FTKWGsF8sm0ZRjOi7tUOGRV2NrATU5D11sM21uadkYwNI%2FMk8XxLiQZnN62MLj8jmflXLYCd8MH9GTxfErd1wCpuK%2FfXbCQGtVYg9iTaBmfoIn8XLqazn2atwEU3Lj0Aa5Pg%2BNSlmjCZL%2BDPaNAAwh6lP8sdEPei3zt9O1DTU7dqPWmqE3c2JV0eA9xT9wWt6u5OxXl6iLb4b7XpOnMPe9JKtfv8URBrUMcM10%2FuKfDK4xgFAu0av4lW9vIpbgKOJ0AYfgM1EYq3tGcgd4e4XoUbbUoKL7OZcIJdKKN8wtRHIlUWhFqFvlEM88pD%2Fwn69l%2FyV2bh%2FIEAIBh2aproig8XsHXSWVNXasAw%2FueszQY6pgHXSfZ88W4edA8QMENDmpHTQXcjaz8fh1%2B3QeTau0TLmoo3VFBVKnIVICTrQkvRZnGRRwzNBJFRGjMtpUATeE4tuAKi%2FTZGAHRHbSLRCjJ1XE2WEOQMjmibW5YEZJjRkT8QrpKOHDebGmBayQwpj53H2qB6hFwuWcWOx5q%2BMkuu3lvOqOpk3oA%2Fa64GaS7KKTNV%2BEqCqNS%2B%2B1Fn3Gadt1Lq26fmkDg0&X-Amz-Signature=8f11d8b1e148d089cb1e6cb37eed6609d3a1bdc6907c69e28be8db4b6f2622a9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JTXVXFG%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIAawHr7aUQBxLCBLFAy0At9dZa6WCCpqElOqUis%2B2mjyAiAC0swr41Rx3SOJAvFipcE8VH7Ucxij0MPdxpxLs%2BqrVCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC%2FYHXycHEnIyYRmFKtwDxYVnOKnfPexIw2lZE0Sjq6zc1gN1OEhl731lrHLRjNq2uvWf%2BsaepeYqQ2fHPk7Fd8dlYzzx8T24ln2OUZGXn67yHEGfxqrg2T3BBKfIyUcjS%2FnQRwLWXk2tTAU%2BB0ePpt%2FN5fdik6nzDy1bN0z3E5Qua5tmGoR9EoqyJf%2Bj72wrfmtA%2BZGBZ11w%2BaRGbTTN%2Bqba8F49kyO5VbNyU9ZUOE71uwXkCGLsR5wmMX8qnU3BQiqCi3EV7D9FlqwLkuG9PBbXniKWr6H0459qRpNW1RNEIuRMLrrr8sbVgBCg1kpIOvz%2B7vNngYSd%2Bj5VguN2o8kGLfFtno95qGUI4Zd7Ocmp3SLAH4ykvIWnjxvElG61r416NuVDuleatjK2YgQ7vWeYdXnYPiG4iZWZfrlJfbj%2F6eL2jYYiZTEDwluVhxi6tTZ5CSpSGXtYJg6iHEbst0mItSpoUAH9IkfulyFeF0cAf%2FdUBr3gf7TctsiBWLHuLkNABO7sdkk%2BHOgNljngr9%2F39H%2B9zDQ8N2YSdbPrM%2BOSGNA%2BG2Un%2FG5b9qqsrJTbdXZ68aMZnyUPM0dfX9Pk2bF1vawUhNk0cU%2BKkwqN4xkgebzxrlCh3mmT7nAH0h6U3Siczbm438J9Z94wvuiszQY6pgETjrsaOniGg9%2BVm0WnUM9yFPyaBiunfYRAzDxUXo27lkzMLhWLxJonoih%2FspAsLAi68X%2Bz09304JNpWCXw6eWuthWJI9VKojdO6z7fqvFmm0wQgYsrSrlKnxLHSq2XnEt3hQC%2FFxCMwn98WzrNo9AUjVdxLWOngvfKzXJ4OAq634jOE9HAdu%2BdF1x6EPyCEqNbhEzgJTdagiU%2FXtQccneVzK9qahGT&X-Amz-Signature=9ee0146fad61cdd9c6b78f9ef5620c387b7419502d7a00eec830ffd059b451f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667JTXVXFG%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201728Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIAawHr7aUQBxLCBLFAy0At9dZa6WCCpqElOqUis%2B2mjyAiAC0swr41Rx3SOJAvFipcE8VH7Ucxij0MPdxpxLs%2BqrVCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIMC%2FYHXycHEnIyYRmFKtwDxYVnOKnfPexIw2lZE0Sjq6zc1gN1OEhl731lrHLRjNq2uvWf%2BsaepeYqQ2fHPk7Fd8dlYzzx8T24ln2OUZGXn67yHEGfxqrg2T3BBKfIyUcjS%2FnQRwLWXk2tTAU%2BB0ePpt%2FN5fdik6nzDy1bN0z3E5Qua5tmGoR9EoqyJf%2Bj72wrfmtA%2BZGBZ11w%2BaRGbTTN%2Bqba8F49kyO5VbNyU9ZUOE71uwXkCGLsR5wmMX8qnU3BQiqCi3EV7D9FlqwLkuG9PBbXniKWr6H0459qRpNW1RNEIuRMLrrr8sbVgBCg1kpIOvz%2B7vNngYSd%2Bj5VguN2o8kGLfFtno95qGUI4Zd7Ocmp3SLAH4ykvIWnjxvElG61r416NuVDuleatjK2YgQ7vWeYdXnYPiG4iZWZfrlJfbj%2F6eL2jYYiZTEDwluVhxi6tTZ5CSpSGXtYJg6iHEbst0mItSpoUAH9IkfulyFeF0cAf%2FdUBr3gf7TctsiBWLHuLkNABO7sdkk%2BHOgNljngr9%2F39H%2B9zDQ8N2YSdbPrM%2BOSGNA%2BG2Un%2FG5b9qqsrJTbdXZ68aMZnyUPM0dfX9Pk2bF1vawUhNk0cU%2BKkwqN4xkgebzxrlCh3mmT7nAH0h6U3Siczbm438J9Z94wvuiszQY6pgETjrsaOniGg9%2BVm0WnUM9yFPyaBiunfYRAzDxUXo27lkzMLhWLxJonoih%2FspAsLAi68X%2Bz09304JNpWCXw6eWuthWJI9VKojdO6z7fqvFmm0wQgYsrSrlKnxLHSq2XnEt3hQC%2FFxCMwn98WzrNo9AUjVdxLWOngvfKzXJ4OAq634jOE9HAdu%2BdF1x6EPyCEqNbhEzgJTdagiU%2FXtQccneVzK9qahGT&X-Amz-Signature=9ee0146fad61cdd9c6b78f9ef5620c387b7419502d7a00eec830ffd059b451f5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466SQWQMXIF%2F20260306%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260306T201729Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjECQaCXVzLXdlc3QtMiJGMEQCIGT63K193J5E78AgzxO5xNS9iaAd4LVXw7whkgsjmqQ7AiBEqUg1aFnQWeG2TZH%2BAbxeNuSVFqeqRxYtyLwQTDQVsCqIBAjt%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAAaDDYzNzQyMzE4MzgwNSIML%2Bshx%2F9VY0BKIjMcKtwD9GXGlJ5tgcI3rcatlCWLZccnxSctzD3tuWE8nFLKb%2BSpFu7DoIeXJnKSDs9qt1m51f3b13YUcGsAM2z79IklppzijCN82cNXenKiRmoqjz2xnIKdfMJ5XpDiWpXwckVJG9bV42m%2B1Aaffg7%2FP%2B%2BBJAJDNCLeloDpKjrFmt8qCeQLodkpkUzx0YTPbB3qxmbeLlb5U2VsUBNCmHmlS6kT10At%2FG8aCMbsacN4VJD%2BwH%2FuSCB%2Bmtkvooh6U8RA56cmT4tUGuEQHstDHFNeI90iKwrEwX8rfRjzM36Dcaqj4c2E%2FzWaeQvcZenHJgf3%2BvvSTJbk6hE9jQIx7BvWL2GdAgy7RthDWgoh8A2oKPFQJ06oLnW4l0lVJ35MHhFpXp5Q1SG2aZlGmuvLAzyjVpb3h8QFqenfoGoa%2BX5uW3hmIf54IHG2SR77CiQZ76QTp3i2Mc5alxQx7fjPQ%2FNLLvRBGKYohb%2FF63Cdo9Fol0GIBXHHOhUA5juUnGBpbXjsKa1lwl8OPkz8z9jabzV63Ib46CefRJHKYDTAqhbNVClRh68IYdaksOrW1gdpaJyilMsplSQvLzFkA85VSgm%2BTX9hBRqdGMPPoXr992sCVGILAKK5sdFWPb5B7o5ipX0wxuiszQY6pgEIk1oOor31Ba9ZMRhbegps36s4dcYnoSVWpFp%2BGFq8gzo%2FJ%2FG08Ci6bqQ1uyuSgw94GnFxtfpbxFo6udWpO9tACDQl6EzSjqIMCR0AANHMB5S8SQFvqyWl%2Bi7T%2BvDMci8ZPE3sVT34XvPVUpfk3xhUrHDl22j85dTuVM3WyqU95jtbv28Ivt8tBewwVaIeGej9xOkrdQj6x08%2BS2weeAnrIM%2BXleB6&X-Amz-Signature=b1683c7e48ad779b55ffe12c31c7deaa8ea5fb7f4d1519a9c613bdba43800949&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

