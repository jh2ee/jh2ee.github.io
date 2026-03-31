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


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UYAUAPW%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIGz2Dn631Q9KhsEZsQ9wfp%2FZV5QPiJ3%2FLVM7V9imhTFpAiEA2kGUeb4j5O1TrWow3jZEBWSMHXQhJE5zvsCIiiD1l7wq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDFlZCPW4yCGsNn90jyrcA4DH3S8cZyZjSr9gab6Vfo3wmKVvJo4mjNdpTEMS5IqIFXMWfHzWVCpf8nr3jg9j7Q03hRBB737oNvWSInbU1WXLa28bonooMM0xN2XtfZKwsHR%2F26S%2FFH2mTlAA9mfY0RvJpqT81J%2B8Vq36zeWiwyIErW4UnH0e1Dv03oeb8CCyAxEebbMfDaf7b4CW92%2BflfcpNqd6DaWBMmG3%2FlImdFbdhD4upA3UVy0ZckGd0g2pU6QEl3ORJG%2BoydtH%2F%2BrOgHCDJNkTm9IQe5L2Wt%2BSl4CvO2PB%2F906gv%2F4yetPei%2FLTMwzO9DAPYRyBeTBMRsdV6gquKK1XLGYZMabRypCltW0iwZRZHWZPdnj%2FPuLMfj1iwe4qDlgJ7dvcS1sFtE%2BpEgTZgYkBfxI0oxCvnVbZtpMYLV6kvf5u0uk%2BTYkTGymoeqQwWORGgzXH7zWUt1%2BZ%2BNQxYLuwzp8Hi02O3Nn7W%2Falio%2F%2BfciGN%2FCRTJmsfB4Xg%2F68M7KU83LBETN6qw5wgNsY2QtPawwjwrgUfhP8KPZUIVJYs7mgOaPcqs%2BPZINuxEc3aoDzfGnmOKc74yfVVL%2FMuX48Q7rNOSKhVIilggTO8QVOOgTmA7WnBaAMOrziG80lfZSAVQqBTOaMLySr84GOqUBwcrbD1j0Ya9t1yPLvpfn5vgOSnQ02sBTIiSpSZxwBEvq%2FZr%2BwN6H8EYFpWT3PE8u671FLRy7yr3m7LTk%2FoGO4nwXtlwmJHK17IjjBtP%2Fj44OOq%2BOzveRL3l%2B3%2BPuUyzsZAJXBfo1MN7HbnMFb44cyFkKDbR28TJzjsgBOizI5ZsvVMsLB7PbMISefP3Am2UQe42z%2BWnA4IyEmvgb39vdqapGao42&X-Amz-Signature=7c4d1d76a8899e45d8fbd6d18edfd1a8792a83dffd3d4baa38c41438d442f465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/4501ba0b-76f6-48e7-be1c-f52178c55270/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4662UYAUAPW%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141928Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIGz2Dn631Q9KhsEZsQ9wfp%2FZV5QPiJ3%2FLVM7V9imhTFpAiEA2kGUeb4j5O1TrWow3jZEBWSMHXQhJE5zvsCIiiD1l7wq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDFlZCPW4yCGsNn90jyrcA4DH3S8cZyZjSr9gab6Vfo3wmKVvJo4mjNdpTEMS5IqIFXMWfHzWVCpf8nr3jg9j7Q03hRBB737oNvWSInbU1WXLa28bonooMM0xN2XtfZKwsHR%2F26S%2FFH2mTlAA9mfY0RvJpqT81J%2B8Vq36zeWiwyIErW4UnH0e1Dv03oeb8CCyAxEebbMfDaf7b4CW92%2BflfcpNqd6DaWBMmG3%2FlImdFbdhD4upA3UVy0ZckGd0g2pU6QEl3ORJG%2BoydtH%2F%2BrOgHCDJNkTm9IQe5L2Wt%2BSl4CvO2PB%2F906gv%2F4yetPei%2FLTMwzO9DAPYRyBeTBMRsdV6gquKK1XLGYZMabRypCltW0iwZRZHWZPdnj%2FPuLMfj1iwe4qDlgJ7dvcS1sFtE%2BpEgTZgYkBfxI0oxCvnVbZtpMYLV6kvf5u0uk%2BTYkTGymoeqQwWORGgzXH7zWUt1%2BZ%2BNQxYLuwzp8Hi02O3Nn7W%2Falio%2F%2BfciGN%2FCRTJmsfB4Xg%2F68M7KU83LBETN6qw5wgNsY2QtPawwjwrgUfhP8KPZUIVJYs7mgOaPcqs%2BPZINuxEc3aoDzfGnmOKc74yfVVL%2FMuX48Q7rNOSKhVIilggTO8QVOOgTmA7WnBaAMOrziG80lfZSAVQqBTOaMLySr84GOqUBwcrbD1j0Ya9t1yPLvpfn5vgOSnQ02sBTIiSpSZxwBEvq%2FZr%2BwN6H8EYFpWT3PE8u671FLRy7yr3m7LTk%2FoGO4nwXtlwmJHK17IjjBtP%2Fj44OOq%2BOzveRL3l%2B3%2BPuUyzsZAJXBfo1MN7HbnMFb44cyFkKDbR28TJzjsgBOizI5ZsvVMsLB7PbMISefP3Am2UQe42z%2BWnA4IyEmvgb39vdqapGao42&X-Amz-Signature=7c4d1d76a8899e45d8fbd6d18edfd1a8792a83dffd3d4baa38c41438d442f465&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Notation


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/868a132c-9e52-4e2c-930d-df95b6f06e60/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466YA6KGZ7R%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141929Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIBTuY4DthxGGfqBPnwJfw7%2BcHbt%2Fo9TKcRWeOu2hZM%2F0AiB%2FPwyzKyhm2leZ5kkcg7OL06JeCeo8yNpQPVT%2B0Cs%2Bhyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMjbFGPHQjzOnQxuSbKtwD634YqhDLSoWkMhTKfCKLnOoFjfVXJILmQcY9wf7tlHU1M%2Fn%2F%2B61JGNNmzNIyB6aWRVHNt5jq2SE4sGg1D4x%2BvyurihQo05wRU5T%2Bw5%2FYRWxSf9hFLHUzIiItoBDwFtilos5ajzsg2lVf%2BXp4Fbj9TLJbn7CglZCt2LPK2pWtAebNOtHuU3PvkdKJqPNuIwaBiP8p2H%2FJRwyNuLbZ6%2B5Xwhin%2F9CnpXa%2BFQuKAPmV5O8PMkmAMJ9iObHRd%2FYOMv6Uezi4Blo3HO%2FTaTye7S1lUkJaSW%2BLyrV8nQSfnK2zlTGj3Ta2o%2FJGXLazf0S7MCjUmeQrI3CaFbnZXtrHaFtuNEmLVuyuldNgRp2EZGOLu%2BmJWQMG%2FzEtsqckDDtiSCW49ZovXSLtizqO%2BkI0gfzkbYVJ9IJ5ocqYH6vP1HpDNkHphaFuVXeMX1uTpZsm02k%2B8nHn3Ry3OEqrxINOJ0Aot8%2FNk%2BemJ2HX823oiD%2FXqDw5YJYPVYNn6GHIXaMxsOszUghMeEHb717DI%2F7JuXy3X1QiKsUxAxF%2BmlmzepKgnIGM92kNWyRJ1xcv6nH5BhCIBrYX4yracaRuFYvIeypQRU2QrO3mCxUpnxMxA5kiONDlCiwua339C8BhyhcwoZOvzgY6pgH%2BfJtjv0y5XfyN1TBAryFhGFAtd7DamDyb8wKXm8aE3trlwmLrsczP%2FNv8viwetmpX0dtQ1VarJTOjTlVkiFuVzgqbNen015QUTaLd6sA0PgJij%2FAghFej3nfURiquA4fYOUtmH%2FiXQB8Kmpuup4SxaAA5AHHutCf%2BbtNDdBU%2FQe7IrHsj8RrA2ECe0DMPSDsQ1fVm0lFV8NXms9wvqRFB3KIZpyFA&X-Amz-Signature=d55fcf4cfc41719651cfbc9e1aa596b98414d946e85e77889e5bb54826e543ca&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/07a56d50-d334-4ceb-a629-ccf2d3b65ea3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TST7AGRF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIFioQjXRwa0Pz%2FvTIfk%2F2J5bG9QQougyuD%2BDGoHNiAqJAiEA7CbMLkFb5G1199uIp%2B%2Fe29JwoE7ZcDLOfOw2CbWuhM0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDFG6g%2Bzg3itinntbxyrcA7zBIjng3a2t7K9CJceh38mQXQd1BSRAi0Fmjq8TPUWUvcmwZPnVmOdLH2GZDVNhCmFmMCm1eiEpFtuFELlcgik6U4SRVTgYWDU0HOpS47k02Va581XeRbuoHpz1fCccAf8TMOgsw4TUY0wOF1F4zCCpWpEwlNCBKi7XLW6mh29QYP0mAMY9jQGv0RrJD0kUr3dm5SDJQq1xzFlcx2RcVGN2aaSI0PPXEucfd6udSfjs3vWVq82QfwaRT7kyS%2Bb8Ew90uybNhazZbULxmZwyCPwWF1iv6LDSRIxJVipBxB7wyMOIkIsz5xLN1kPeWeeW%2FG4JILQIgo4tbOEj7IGPFo70PLViEcySoAeZZtbmy2aN4f189oa7zRjfQ%2Ff53zfVDoNWJxalCDxJxoBzG%2B47Q5gHS1ohTzeRinPBurb1lfYudYMGT7WLjbllMC%2B8uontlWzfCTNKXJMtx%2FazNqdD%2BAore4dnWkrb%2BXQ%2BH6axrzUZG9Uk72rHfCM5gZ6Xxdh2Ocq4pDLPtfoC1HApMyECjCItSKn9qyD%2BtBZiAntcZW%2BRFhO3xa0E%2B0Yy06dTVYMoTOk8hpv%2F16GjbY4mggGfXEQ3QHr7cGgkU8piPJyiR60ZUb11Zew6hhspF%2FwXMNeRr84GOqUBLbCBJdzuiKuCFFVjhiESXM5HVOuPgnx8TP18C28gZcVYXEa%2FhOwAzYo7J9%2B7qUezRz3XF6Y%2BQdZObTm8XFNg2i8sqF%2Fh18ZhcG01h4dehz0y9DOiKOf2Pv9ocFZAhhimtdJ2Q4pacdpEqZf3DwtIkaYordnl3tBr3NuHcAwrRaA9acA0SG3OUK%2FvWdsW1xmnLZzX7LzIk%2FIPT3yqu1ir6%2BLatULF&X-Amz-Signature=88590bf36e972ea4c5b213f4ff202f899b5bc7d90b6314fe87cf260b65b7860f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/620bc79a-8d72-4f64-acc6-959d8cd8f3e2/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TST7AGRF%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIFioQjXRwa0Pz%2FvTIfk%2F2J5bG9QQougyuD%2BDGoHNiAqJAiEA7CbMLkFb5G1199uIp%2B%2Fe29JwoE7ZcDLOfOw2CbWuhM0q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDFG6g%2Bzg3itinntbxyrcA7zBIjng3a2t7K9CJceh38mQXQd1BSRAi0Fmjq8TPUWUvcmwZPnVmOdLH2GZDVNhCmFmMCm1eiEpFtuFELlcgik6U4SRVTgYWDU0HOpS47k02Va581XeRbuoHpz1fCccAf8TMOgsw4TUY0wOF1F4zCCpWpEwlNCBKi7XLW6mh29QYP0mAMY9jQGv0RrJD0kUr3dm5SDJQq1xzFlcx2RcVGN2aaSI0PPXEucfd6udSfjs3vWVq82QfwaRT7kyS%2Bb8Ew90uybNhazZbULxmZwyCPwWF1iv6LDSRIxJVipBxB7wyMOIkIsz5xLN1kPeWeeW%2FG4JILQIgo4tbOEj7IGPFo70PLViEcySoAeZZtbmy2aN4f189oa7zRjfQ%2Ff53zfVDoNWJxalCDxJxoBzG%2B47Q5gHS1ohTzeRinPBurb1lfYudYMGT7WLjbllMC%2B8uontlWzfCTNKXJMtx%2FazNqdD%2BAore4dnWkrb%2BXQ%2BH6axrzUZG9Uk72rHfCM5gZ6Xxdh2Ocq4pDLPtfoC1HApMyECjCItSKn9qyD%2BtBZiAntcZW%2BRFhO3xa0E%2B0Yy06dTVYMoTOk8hpv%2F16GjbY4mggGfXEQ3QHr7cGgkU8piPJyiR60ZUb11Zew6hhspF%2FwXMNeRr84GOqUBLbCBJdzuiKuCFFVjhiESXM5HVOuPgnx8TP18C28gZcVYXEa%2FhOwAzYo7J9%2B7qUezRz3XF6Y%2BQdZObTm8XFNg2i8sqF%2Fh18ZhcG01h4dehz0y9DOiKOf2Pv9ocFZAhhimtdJ2Q4pacdpEqZf3DwtIkaYordnl3tBr3NuHcAwrRaA9acA0SG3OUK%2FvWdsW1xmnLZzX7LzIk%2FIPT3yqu1ir6%2BLatULF&X-Amz-Signature=1e9ee514ea26fac2c3efa00f9af3a4cf6c075dccca87dcfe833fa2dc6a93bccf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Disentangle layer`
	- Adversarial learning 후 FC에 의해 common, specific representation으로 분리
	- Fully connected layer가 disentanglement 수행하는 layer
	- common representation과 specific representation 간 L-2 distance 멀어지도록 학습

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/01a88f7b-1b51-4fe6-b34d-0145135f4ac0/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466Y4BRWSUX%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQC3u8%2BrMyKg4osEisqbuBVtJm9oZ2XmSn7IAUGeMrXY8wIgPQt7mF%2B3FYEIFJj1kVAsp8arBspNMUJYcDXasUwh%2BSYq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDHkPn0BpYSftBAq80SrcA%2Be7rWtZ2kHXiICigK6zxjgYG2nNqdlcjHpRkl0W6pz1w3lcXXJyORUcBr8CeLd5p40WiJGKzED6rGdj%2BrOEPiKg%2Bq0mOs2Aqf%2B03eGFUnqpPA2YWv9xFUXbK%2BqIn9nm1LNA26bQc1wtozrmUQmZxEt2PALY3HUjQiRbOYlLOAWpZOMg5%2FLglB8AbwD%2FvSZqRijCyyBoSxVQhV7HqJPHveotfc14Fi1%2FFe8XRAASgx9KjaEVni80%2FnABbcZXvybmgN64KaMSzMHuUgtIRhvkISwjdJ2z7R5l8TV1ybmJQQrpVySNyZxPnCkcVvY6xw%2BIwtYGOhuw7xHZ15lQUBhii0TwC88NQnCm8RtdKAO%2B7WSXYg8bRyRTJWPf3PX8TTLO3BMZUW1ioCVcwWR3q%2BsgTQMuU0n4LDBQyc9DJPsK7Isj0gvPQi1dEjPkVETkEr7jRMmS2H54TgDg%2FDPeNwJ1uBxmiJssgJxYr9At1y1XiIsye32tM4qmOuLxYnb7YhHKyftkiMkzRZPBSaQBy90xETedt%2B7T9N0bN43B4m8DCJNJmyLFdeASWfKNUH6uMt507CMD1423dXK1Q7kqVjiQFN7L9TpJMruk%2FfC%2BtljHGjua5ZNGStm0orjY9%2Fa8MNmRr84GOqUB4qCLW48AQKDTEB5%2F%2B8godfJhcdmWoK5XY%2FSPQyaIa0A7Dp1b9l%2FDFJbaGDiRP1DTtx2c%2Fw%2FONdUMGEAC%2Bc%2Fcq2E2ghBbtc4s62K3%2BZ2Ki7RfuQ1pNahxx2cLlFEhItiii5fM2CXXWlxKcObzWyPo1b5O6IxMwog6z%2FmNSyZst8k4%2ByYXzXCE5rFXR17XuQm6JkMtmmdgHPxw8iUCdo6lG0NIamHN&X-Amz-Signature=fae3dcfe10bb15496180699f0957426081371cf5acf27e93f6fa75f3d6b0e70e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Decoder`
	- sample 내 모든 modality의 common representation, v^c\_j 와 현재 modality의 specific representation, v^s\_i 로 image reconstruction

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/25fbc355-11fe-4458-be48-3352d5f5e6c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466XAKWGPM2%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141936Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIE5bJ5%2BqFmh42grNzC9SU2sDdJ2LonNg0j6ELmRkq34DAiEA3bRenecowpKDO4EcaYTCUlHsmeY2Z40Hqr0LRUPeDJ4q%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDBNMO8D%2Fmjh%2F90Aj1ircA7VokqgzJ8Fs4RUi%2F1G6q9P%2FAQ%2BcWSY95aXMPV%2B%2FZEj9a%2BLRZcnkD5yJAiVdfcoPi0LiJ7Vi6XyNXWXWlcmb2d%2FpaGJXhCc6S%2BEdRyAOq80Sg0rfXZTDteCTZo12lxQg3YNmghQ%2BE347oGEc2zqsLbgUjjfdqwsKhG%2FZvalJ3JE7l2MUvisnSld%2BR2yNbUqnw5KbViGeq4a0uWxkKSZOrMPPTIF8%2FDiPgehQOjzQnruPHcZWLouiUrTDwP720PsYlFD37%2BrX%2BfXvaX2HQ61dnSa4Fcd3rygUVAG6%2B9Dhu4%2BTLgC%2BrpNx4uQiq3qRVkLyXMA16hbPB9M1IFFYaPrDeF6IbVxN0E6wsTjyA8fTrMVkWDbFGya%2B7WRwLzixswDmeSB2yZodbjYMiqL%2BQOa7nxkpdRgjy%2FcQ1juGeySOZMBvlTV9uXaN0hrwh7bAY6gQSAcXyETH%2Bty3WyShPae0jfdjhRh9VPVFy%2FmuQkCFmBnQWTHpA2r8XPxVrMzq8Z1B4%2BbOlzdKGMVGXPqWg12y69rKqxY4oFbPj6LrkrZQ8km7FlICtP5dutm2cMgmg3DkI5aTPyCIUbLpgUUAFXzLyL43kuQKfeWmnCPrYwNWwp9Pa9NljZysShhxePGDMOyRr84GOqUBv2CteH30GvHEdSFQUNxVUyPWQlGhFRc21jqb0BwoodtXhNrL3z%2FEkqVpbMN0AEGhs5Rn8QkSfJSfiTksHX2OIabzwAe2P5svVViciRTnQ%2FThNMOPiYv6E9ykJVou8EnXe629aBLISzK7DkE0bznFPprReiXX4pdpNey%2B4a2Mt3KrU5Wz1FYQy6ALv%2BNwlk0DjjL4NFEiiogsYErqEq%2F82FaY29uJ&X-Amz-Signature=451c35a9e7eab37aedfef63ccf9ba2c5e65275a7b0637ce651c1bcc0ab0ae1c9&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

		![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/9e59deef-6fb0-4d11-bdf1-05343fcfd2eb/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QMHZWDIM%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141937Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIEHvZVNYFvuRcaXlKKXtkuYqzqp2ptZbmYLSxzgkCX7aAiAN9sFhMkvICMesrruMfjHbqMOmPC%2FgPHSAlYBQxjArjCr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMaFe4X9HJYy7Qtzi4KtwDFgx5hzGu0zXWwK6K%2BLeytax7%2F6ApQJP4%2FncJtVCEMLo5LDIVVe2C4txCbJ0pjoGODq0KgzHyUBOX9xk6JWrFDSacKj2l5RHnfEMjSpcfaxLTncZXw7XY6zI3a3APZsqCjdUZ1kiJwHpcRdV4lM%2BceNoHUF1OEO1FebnnBr%2B2gtmBdRHcTxOmorlUXvqcVBlezMDcWzvBvvKnIyY88cBmZnq37TXyR%2FJYdX2Vcwp1mHKRHt5PPsZONJHnwT5YdFZjYilrbgVCBNSkDManDL%2BNv1pLE7%2FWj%2Bgh6XEpmSZHpZBJ1Tnx7M%2FSB%2BeXsOFmK2O0qtVL5nNnC5%2F29%2FHH5WYh%2FMKi7jDWWwUxDtC%2F%2FB4rRplgx11VluTpinaT62QLQr0T3ia4r0WqlkYCPpU7ridCNW%2FLgeN%2BohZPzb8e2R327zQf7UsgD3w7iPL%2BrQEeEPcywfawdvYALugshjsT4cTXxEx2G2VDzqlrgfbQLkoueh%2BCQW5i8qxOcooq4u6XKkGWFAih1byy%2F7oXtxUGcX1l6Chazysrt1W4ngRH8czDlrsi5XD5r7%2BLXG7UW%2FQKRAwrMQ0Nr4f2TPxPnezt5lau0WcUIDb6wFT1HWA45sBt4nVqVHQXRm5o73WjB8gwv5OvzgY6pgH6kfDOZRe1BEpZNpo1tlWy32xjQbqAPP%2B5eAOATQ38VKO27%2BVsPATc6r%2BM0U0w54ZBcrNTRclyAq6Bban9WdBE%2B7xj0TpxDBixndzygL%2FTWV1EpRKw%2BwlYbvUOMnfN4CNbk9py%2FMhFXzap9ogWtCUMZmr22Qp6Dh5BEcp6dq16h1i4LXOrbk4fUlMEMutZBH5SQee3NYLc0UeWPGHWprCW7hPN8aU6&X-Amz-Signature=1a48d0d60f0d1e308089e3280a6a03a5845cdc680b579c26f41ae3dc9e4a14a7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

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

	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/8e67d0bb-1a2f-4cad-b118-5895cfdaeb75/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X6CPA5D%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIA4b%2FkoTc2isp%2B6xz%2FwTMzcP%2BdVgwZX6bWqHy8okJe1KAiEAuIJ1i0PeX4MMWhwNQurInlJFpemyC7ofCz0chxb%2FOCAq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDDRvwpt%2F6logu1%2Fe5yrcA9A9VN9TDUaF71%2BDRIwEUS2T3vcOEfGvPMru8Yv0IJ6KXHvS50SwKg%2FTXny0oYmwauIt40OYhMOvxENbqIEHh9KgHMvtbxmPfkU9WgSn9twsxBzD8icz7X%2FDvMImhRSITHHt2nU28f%2FzIjxYtSMcdHpaGzyx9Gqw6B916hINvexXzAZpUQkLbntufvyKXfiTZUbg10frki998Hm4bJVdjh3Vfnpyad%2BQPGBowD9pwu9vGbDFGRvZizjg0lB9ueY2tKAtEIIwqPeVCPVmA%2BS6GuBjWjKzqQki%2Blu2XiHb5IFE180NKr4fZ5czG5wTXeUy4rJoxc%2BsC3iPq%2BnmWXoEDO04C61YcnA%2F0sJZ%2FVjN%2FOk%2BY%2BzINr%2Bb4qYurbsBOiLVY5xLIDBz9Cf75F0xJ9laZgmQYJra8yd3nOlMui9IuyVcFfoDwR%2B6bEHnuZKCoXOppfMtBn3QwEUhOus2uE38UZ%2B0Tf9ujT%2FUxFRhalMBgTgBzA%2BVb6zCknJgGIUiHqRQe88gm4PcQQXPkXYa9lz6d%2FuzAY7ElniTA8BrCv9qru%2BctZPJ2vBkdtajbFrJAfvMjqYr7nj%2B3oK3UbPpS%2Fox8GGVvKgBlf599Q2YAmOgo3idb0iWbJD%2FJGjtzX2oMLmTr84GOqUB4PGVvoEga69dib%2FTlsXBzCOgnql0g%2BIaFLdmvQ7SbxQu6f4p5dZgJV%2F4%2BuxVP84v7BBJfxDDfV8n44q1pGNsE9mcSvppFyjnmRE3gKhuZtXReSFbGUgEdLhHaY4ZdL%2FDn0KT17%2FSNtGdKFYzGA3HY%2FrtJCG4Mru7PMkzTAxdOI70JI3etXBmS6e693HMS4%2BCvd8Pc9WMcHcnBI91e0d40wKTs3Py&X-Amz-Signature=c5ef94c3e67deaaea4dda5d188e0197293a79c8979cb9d22691cfdbe79266017&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


	![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/45ba1b74-34fd-4c87-be57-f56e014dc74e/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667X6CPA5D%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141940Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJHMEUCIA4b%2FkoTc2isp%2B6xz%2FwTMzcP%2BdVgwZX6bWqHy8okJe1KAiEAuIJ1i0PeX4MMWhwNQurInlJFpemyC7ofCz0chxb%2FOCAq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDDRvwpt%2F6logu1%2Fe5yrcA9A9VN9TDUaF71%2BDRIwEUS2T3vcOEfGvPMru8Yv0IJ6KXHvS50SwKg%2FTXny0oYmwauIt40OYhMOvxENbqIEHh9KgHMvtbxmPfkU9WgSn9twsxBzD8icz7X%2FDvMImhRSITHHt2nU28f%2FzIjxYtSMcdHpaGzyx9Gqw6B916hINvexXzAZpUQkLbntufvyKXfiTZUbg10frki998Hm4bJVdjh3Vfnpyad%2BQPGBowD9pwu9vGbDFGRvZizjg0lB9ueY2tKAtEIIwqPeVCPVmA%2BS6GuBjWjKzqQki%2Blu2XiHb5IFE180NKr4fZ5czG5wTXeUy4rJoxc%2BsC3iPq%2BnmWXoEDO04C61YcnA%2F0sJZ%2FVjN%2FOk%2BY%2BzINr%2Bb4qYurbsBOiLVY5xLIDBz9Cf75F0xJ9laZgmQYJra8yd3nOlMui9IuyVcFfoDwR%2B6bEHnuZKCoXOppfMtBn3QwEUhOus2uE38UZ%2B0Tf9ujT%2FUxFRhalMBgTgBzA%2BVb6zCknJgGIUiHqRQe88gm4PcQQXPkXYa9lz6d%2FuzAY7ElniTA8BrCv9qru%2BctZPJ2vBkdtajbFrJAfvMjqYr7nj%2B3oK3UbPpS%2Fox8GGVvKgBlf599Q2YAmOgo3idb0iWbJD%2FJGjtzX2oMLmTr84GOqUB4PGVvoEga69dib%2FTlsXBzCOgnql0g%2BIaFLdmvQ7SbxQu6f4p5dZgJV%2F4%2BuxVP84v7BBJfxDDfV8n44q1pGNsE9mcSvppFyjnmRE3gKhuZtXReSFbGUgEdLhHaY4ZdL%2FDn0KT17%2FSNtGdKFYzGA3HY%2FrtJCG4Mru7PMkzTAxdOI70JI3etXBmS6e693HMS4%2BCvd8Pc9WMcHcnBI91e0d40wKTs3Py&X-Amz-Signature=06cd381a275792b276bf303de28f18e4df26582daa0c86b2acc2f8de8a10576c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

1. `Association Network`
	- `Input` : latent representation + age, sex, education year
	- 각 association network는 imaging representation과 유사하도록 representation 생성 → modality missing 발생 시 사용됨
	- diagnosis module에서 사용되는 mask(attention weight) 생성

---


---



## Experiments



### Data


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/97f4a2be-4e8d-4c9b-ab3d-20d3e9e697d1/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466TN6IMHLK%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141926Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJGMEQCIAQTilwr0q6a6NNJQqQ5ML1BxXOygxSGc1T1LPXI47FvAiBsnjaFrRUUYFH%2BiJDsuPHiiQxONqN%2FMADnxhizzK4OoCr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMdgGfUidrTeVj9CdFKtwDaWk%2BbNEebbPHy%2BlrxVnPNbC3rfkpoQ4LObNqwBlAqgelRG4sc%2FZ2qsi%2FgkHlGjaoE8P6FcMTru9q%2FAEvDbHLQ%2BZzSxzE45Os19SXVe3JTIgaTQOfP1gCS806DSfOdAjm9r%2BgyEsLvxTN0JGu1RxXa7mZv5qM5YteHcj1QNygtFNzHVkk71BeuNCOyvh0maJKl9MPAhVGjQJqNv0Q%2F24Gu%2FP%2B8hl5Q9OT74z4NpqRbvqpzpUrIzQZsYNr94siI64HAmKwUvYYOab15Dj4htUuHGNXp2iGYlsYMiQfAFLryF9Mb%2F8ZRuugiX4DTPQrXaPt6DtoBkqMIFdvYjleAm3R%2FH%2FmT1BGmb5D5GqGCMa1jv2jKMnoJSM0Hlf6y7TxVzmanSjGEy3TztkqSIx87pmDZUxMbWdjHnPmLUKCrQXFXV3UQjggfPgn5D9EIDeSFeQwdVDu65YIS%2FBCEioLtp4okAG%2Frg1PrBl0f%2BqgmoIfza1U10EQ%2BPxAE4qYEmroIYj24cLvz%2FAzAimweTklPUi1fykGgBFNv8ue1x1jcZPPLeEB7tWzim8sLwSyuZzcGbublVbeDZn%2FXWVTVjvlkFdkd3Im9nA6MqXGaRUm7NW8LBW7T%2FEE92eqC%2BxumPow%2BZKvzgY6pgGja1Z7acsYglMoGeFem8nS7n63%2Fixn2jfxLCwLXrsY9rKp%2BYwSNa6X7KYZwuXB2VpxIn9TjjMrwgHDn6G3wtiqjtm4jZmE9FVjwoeZa%2BGrs7yFkorpfRO%2FuOFFJt8GxIvhXVKoNGAfucVmb916gH2%2F0DO9qNEdT%2FjFsmw3mT%2Bjks%2BTnJl8CXgXVvhl6Kl%2FsFUcfM5F8aFX3oD27Gm403dMqplZuCY8&X-Amz-Signature=34860195a22ac79c4db313c040d5967d1a46ab4edee2451d9cf437da80c8e41a&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- T1 : 90개의 ROI에서 GM volume 계산
	- MNI template 적용
	- ANTs 이용
	- AAL atlas (90 ROIs)
- FDG-PET : 90개의 ROI에서 평균 intensity 계산
	- T1에 정합 후 동일 atlas 사용
- SNP : 2960 SNP 사용
	- plink 후 screening


### Results


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VLRGTEU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIHeXWIVtedCsOC%2FI9gJneAaJfJ19cRPWpeDR0m0P00wsAiBTQw5dSXJEvtaoDvpN4IQCDc1PRP2Iyg79Twkzomi9Vyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMhJ1r3LG1UGUDHrkgKtwDqp8qYI0GLw9t1F%2Bt8GUvf5gLQZIxRjLX9klBMchUBzueGqJRD3nng0ncsOdUpje7keaf%2FRivLdgvf%2FrlYAD4%2FewwbJbFBWJMZcsZz7Z91SgCmVELw8O1N9s1EopDXBVFY149SgUDSzYh5qM4L4TMx4Yn7iT4coV1dqJDF5rqHnIbcJhnFhX3fbwjodmfcfoj3cMwKScvxKeIEUEM2ej9dyCLsiGUa7HLneqsZ%2FrpCUyWAytfV3pEO1tjDMMCaQfMtDHyAvORmRHBKdDoqW57UmdpvGvaUv0dfQtDaLD5qz3DDf1cDSNuoLlgImc1EMdXXgwbZoun6ht%2B0dUkZBH%2B6he0%2BemYdftxmwmuO48hRRX7ZRu2nF91sOQBU71DkG7jfDTka3m8Q5LFjlllXSFQBh%2BcDrPxI52eBjuvmlSTj2iH09BBrDQCY4Rm337L89GNTT6keHfRWnHYwWM%2BjWM8BlOO7vBl5gUnToio3UkY8L24u6W0HWeewDeA6ypQDgj71Ndw%2FzM7Uuxf%2FEtZci38PQbmaBGiA7EideKoPAmVX33CohsRfyV8GT98PKFPE5dxm166K6YCnjxRI%2FqCNPlIBlkNeLFNmM5nyHNeMp4ND1wCaMPw4bG2QcVac5MwwJOvzgY6pgG6I3PCNueMnwUdP1ubYBVGiKsoGOn1T3Xxe%2BrUtsrc7n4sVkOMdTV00FXiNpErqBtTxUc5ucdH2jn2qq8HtKJc6nYJQ6sxd8ZeMGpWktTeRBHd0QAcZUHkslhZPuUVdy7eLR5oc20hLj%2ByjDwUuOdQFhK2DrLl1dXXjmGp%2FDxy23G6zKDOOAuxsx72PhEGDtBJ21cIP3dkgfVBG1zOa82w7xTt5W%2BC&X-Amz-Signature=d9dafdca71e92beab151f8bb64fbe7e093c8ee3cb1bbbf478c948b4b1e0df15e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/6eaf5c17-40cd-4407-be05-9a1acf759746/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4666VLRGTEU%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141941Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHYaCXVzLXdlc3QtMiJGMEQCIHeXWIVtedCsOC%2FI9gJneAaJfJ19cRPWpeDR0m0P00wsAiBTQw5dSXJEvtaoDvpN4IQCDc1PRP2Iyg79Twkzomi9Vyr%2FAwg%2BEAAaDDYzNzQyMzE4MzgwNSIMhJ1r3LG1UGUDHrkgKtwDqp8qYI0GLw9t1F%2Bt8GUvf5gLQZIxRjLX9klBMchUBzueGqJRD3nng0ncsOdUpje7keaf%2FRivLdgvf%2FrlYAD4%2FewwbJbFBWJMZcsZz7Z91SgCmVELw8O1N9s1EopDXBVFY149SgUDSzYh5qM4L4TMx4Yn7iT4coV1dqJDF5rqHnIbcJhnFhX3fbwjodmfcfoj3cMwKScvxKeIEUEM2ej9dyCLsiGUa7HLneqsZ%2FrpCUyWAytfV3pEO1tjDMMCaQfMtDHyAvORmRHBKdDoqW57UmdpvGvaUv0dfQtDaLD5qz3DDf1cDSNuoLlgImc1EMdXXgwbZoun6ht%2B0dUkZBH%2B6he0%2BemYdftxmwmuO48hRRX7ZRu2nF91sOQBU71DkG7jfDTka3m8Q5LFjlllXSFQBh%2BcDrPxI52eBjuvmlSTj2iH09BBrDQCY4Rm337L89GNTT6keHfRWnHYwWM%2BjWM8BlOO7vBl5gUnToio3UkY8L24u6W0HWeewDeA6ypQDgj71Ndw%2FzM7Uuxf%2FEtZci38PQbmaBGiA7EideKoPAmVX33CohsRfyV8GT98PKFPE5dxm166K6YCnjxRI%2FqCNPlIBlkNeLFNmM5nyHNeMp4ND1wCaMPw4bG2QcVac5MwwJOvzgY6pgG6I3PCNueMnwUdP1ubYBVGiKsoGOn1T3Xxe%2BrUtsrc7n4sVkOMdTV00FXiNpErqBtTxUc5ucdH2jn2qq8HtKJc6nYJQ6sxd8ZeMGpWktTeRBHd0QAcZUHkslhZPuUVdy7eLR5oc20hLj%2ByjDwUuOdQFhK2DrLl1dXXjmGp%2FDxy23G6zKDOOAuxsx72PhEGDtBJ21cIP3dkgfVBG1zOa82w7xTt5W%2BC&X-Amz-Signature=d9dafdca71e92beab151f8bb64fbe7e093c8ee3cb1bbbf478c948b4b1e0df15e&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/94264ffe-219a-499f-82cd-a8a34890c8c6/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4667FUMIOPI%2F20260331%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20260331T141944Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEHUaCXVzLXdlc3QtMiJHMEUCIQDsbjK3MaCGMz4teyxVb2uaAMRAJ8xFdp81QaWNLlw77wIgShFHbAc2HXDphujAnvLzJWneQkJW0AHgNVk4Fxn1ONoq%2FwMIPhAAGgw2Mzc0MjMxODM4MDUiDHck3cdj1keYucp7tSrcAzwlU%2BufAdPNKFzXxfjgvwibuhfzpwxyWa0eKDOGNQpCc87UNr20mNOhXrv2E%2BCZqWJPtmQNxrnrPYYUQGsoeEZS1dDwbqfBUx5m%2BSxHziP2DB23yGIQSl1usN%2FHFOuKXsEZ4ah%2B1MupL2FWjJkXpqri8jSz%2FgsQKwr5X796E7cxN8jC7URicpvjr%2B9ZcH3Z%2FmGfhC%2BCaT%2Fgz8UrfFMt%2FwiFMUdd7F%2B13JmpXIjObg8wf8keWsx%2BBHwnkRyGyqiPhdXUJLFBY04RvfxkrhFuhEXyLdkIUu08%2BbbhmuLr%2F%2FxEckiBwGbhQopkV4Dqqu4xXhOpRKUU47hxiM%2FVuaqBmykukfywed9tCnCAVLgFo96Pk1ADpbEbVqblHmUswb9zG%2Ba79SkYBi9%2FgRK2JjWC%2FG7TBw6Yyu%2B2D7yNNUuCNFrWigT2jNmmwBKCyh35%2BlEleal7OjnvOMiK0P0idvO%2F6xJL4nsqCXrR3jb6wF4xXoYcAqsAt5wu9mmgzxSdswJb%2F3ov%2B%2FcCy512zJWyfxGJ8juxpeKKssoXTcVzHf1996BfICkCgC28U%2FAmAK4XaOOpaRmz2YFImzWyM56EF8UhphMfLHHakH4pkX0HoU0NCyPVx47yZNxUIR6AJPjyMIaSr84GOqUB4aq3H2B6gwCZPleYpZj9eb3wLIQoTtRp%2F3EyNM2sjRJ%2BKImYEDsN1b2oG1hsdxHwxdtGBSv23SFmztcvAtUnPdk%2B9OGTW%2BF3sCv9tOy591NU7vuincu%2F3YhqhoC%2Fd6i%2FNCsE2Oz2%2B41dBdL05uMFky%2Fh7sYSb94dpmVsdzXO8MUB3JQ0XM6h047KfyDyADnuUaaJwnlZ8qxkvJV5dV%2BJgsrL9omr&X-Amz-Signature=da06f4d16bd460f8c994a76c6a451898654a73825a3fe18ab693fa0ce4030203&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

