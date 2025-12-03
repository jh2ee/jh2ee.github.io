---
layout: post
date: 2025-12-02
title: "[논문 리뷰] Deep Multimodal Learning with Missing Modality: A Survey"
tags: [MLMM, Review, Arxiv]
categories: [Paper Review]
---
- Multimodal train/test 에서 modality missing은 성능에 부정적
- missing modality를 처리하도록 설계된 multimodal learning은 model이 robust하게 작동할 수 있게 함

---


---



## Introduction


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UW2HUYW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIAOAlmWZ141A9siOq6utwAKlW4gGHyv921BlpGxxlex7AiEAu0SlH4cS8Bvg3lR1xVOls32q0Cg5kjVAEsyIiKJmRCQq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDO9chj2HEuPKO6ElUSrcA3yJ7XzWchMKtWztpVi6AASXdUmnidd9dVcixPLsKJ3kfTHxeIfFby7z11Im5QFzb1oW4P0ZUO%2Bd6YMGzcmoh3FEZjJCitivUME2ZODWURc937F1NgXhQzHqjDV3aiaVEdUu%2FCjjm4W2iiOhKvzEOFuZMuCAmGcJ%2Fs%2BCHsbI51gKlVvOGevo1IeoGkYB%2FJxgSSfj84XSYTbrLYbqZL0x1jd%2FSdtae%2FkC%2FKancuOXcdv3UViV8P%2B9baTG4XbsZsTZRSEW8nF4S2HfbScae993sw33QApfYDdPQDVLHpRkNjMF9ZJkOZx4RjxI0po0nuVS5DCRwxo8qo7hTbUByQ5eh5UAS1DmsI8l54R5maiTPD2STt1P9y6phNt2Uj2vdZz36x02hDTinu%2FjwpqUkASufqW3KBy4OpUKjk35%2Bv73lOvNJzise1Bgo5ddoS7uHfjNoeTqoAB0yKtK6WO%2F9FugRrzBEeU3JDbt0Mq0o8phwbTzLcxjdKDQLX%2BKvt4amKLqV4S%2FZ8Bw0nIzW4WZpQUy%2B3%2FC7p4Acd76nbgzpqvQKLjQ9NFiT8nY4iBPnoMBpFOampOJQGckQRqdeVzJ%2F30WcalJYDX62TUwK77f3DuKq9mcQDpiCFlv0D269sHdMIfHwskGOqUBUBLh5cwsT%2Fi3Fe1SiFTARaAMeeJXvM8hkDPPj7%2Br%2Bsu93Jrr%2BYyL4V8ilFx%2FjjEENMkESxBP77zWpRJErxOQifvkyIFZ%2BpQRcJfQNA666ba3J69Dnj8iFUpKbILKCSXqYwdFiAb8uCqbzaDPqmR2WMBex7r1jB6%2FWkD3ol5gpXEyQosmR2byCjVTivAqWqXBGv%2FnJwjLhEyDQXQiwJqLQKvYA4dt&X-Amz-Signature=e71852d1d050d4c34a47498f742cb301e69f23e54e93e1e39498986f3f2d06b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/b5bb2d97-9e26-4130-a67d-0876cf0f895d/ee07ef86-39e0-4728-b9b3-b93b966d855d.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB4664UW2HUYW%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIAOAlmWZ141A9siOq6utwAKlW4gGHyv921BlpGxxlex7AiEAu0SlH4cS8Bvg3lR1xVOls32q0Cg5kjVAEsyIiKJmRCQq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDO9chj2HEuPKO6ElUSrcA3yJ7XzWchMKtWztpVi6AASXdUmnidd9dVcixPLsKJ3kfTHxeIfFby7z11Im5QFzb1oW4P0ZUO%2Bd6YMGzcmoh3FEZjJCitivUME2ZODWURc937F1NgXhQzHqjDV3aiaVEdUu%2FCjjm4W2iiOhKvzEOFuZMuCAmGcJ%2Fs%2BCHsbI51gKlVvOGevo1IeoGkYB%2FJxgSSfj84XSYTbrLYbqZL0x1jd%2FSdtae%2FkC%2FKancuOXcdv3UViV8P%2B9baTG4XbsZsTZRSEW8nF4S2HfbScae993sw33QApfYDdPQDVLHpRkNjMF9ZJkOZx4RjxI0po0nuVS5DCRwxo8qo7hTbUByQ5eh5UAS1DmsI8l54R5maiTPD2STt1P9y6phNt2Uj2vdZz36x02hDTinu%2FjwpqUkASufqW3KBy4OpUKjk35%2Bv73lOvNJzise1Bgo5ddoS7uHfjNoeTqoAB0yKtK6WO%2F9FugRrzBEeU3JDbt0Mq0o8phwbTzLcxjdKDQLX%2BKvt4amKLqV4S%2FZ8Bw0nIzW4WZpQUy%2B3%2FC7p4Acd76nbgzpqvQKLjQ9NFiT8nY4iBPnoMBpFOampOJQGckQRqdeVzJ%2F30WcalJYDX62TUwK77f3DuKq9mcQDpiCFlv0D269sHdMIfHwskGOqUBUBLh5cwsT%2Fi3Fe1SiFTARaAMeeJXvM8hkDPPj7%2Br%2Bsu93Jrr%2BYyL4V8ilFx%2FjjEENMkESxBP77zWpRJErxOQifvkyIFZ%2BpQRcJfQNA666ba3J69Dnj8iFUpKbILKCSXqYwdFiAb8uCqbzaDPqmR2WMBex7r1jB6%2FWkD3ol5gpXEyQosmR2byCjVTivAqWqXBGv%2FnJwjLhEyDQXQiwJqLQKvYA4dt&X-Amz-Signature=e71852d1d050d4c34a47498f742cb301e69f23e54e93e1e39498986f3f2d06b7&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- Multimodal은 단일 modality가 감지하지 못하는 복잡한 패턴과 관계 밝힘
- 그러나 Multimodal system은 modality missing 문제에 직면하는 경우 많음 → 관심 커짐
- Missing modality가 발생하는 sample 제거는 단순하나 정보가 낭비되는 문제가 있음

_→ Missing modality에도 robust하게 작동하는 system 개발이 중요_



### Definition


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655TDK25A%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQC1s3TrC%2F51jnleAvdWI%2FzDCqk72nZ7zM%2FYsVWskL6UMgIhAMCK7SlcpSgJHi9rgrmvcQWnKyaXIcsY0wwPtrCYu%2B0FKv8DCDYQABoMNjM3NDIzMTgzODA1IgwwNgBbnNNf4mpNf94q3APeAkbC6ccBev8uwp1HdKbdIp2kmwtdqjnH3W%2FqejuloCoPyBbzeC9zlJ7Jl8Pk3jhk2IZSTVPBdvJFjv%2BeF4rsp8Jzz1QClJoqdJJUF2fYTZMBbZ7MSzLsMmlTKTysHEic9F49PGExSt0DKQcGyU%2FBnn251%2Bmh1RBSLwH1cgQpcuGOHmBc8v2HIsGOeCyd0oqTyWpDwhZc35fQFGmssHI2pE%2F85MbRg1D0IoPHE7r4LzOLDaohBALE16GNFEf0y%2BkOsTBWvEAu7l49yuoesxFBQlK%2BHA%2FYaRlhiRLcKLl4lNZLmxSlIvTVQP41k0yb%2BnL6L5By3Yry2AXeELyaOF1aqJm0je2sYqTeo8M0mUfL5bXODySaKHZfyTS4BaVPYeOJhXm9eThDrnyosuFccQXW0HTPMHbeOfcLSFCRWcV9XVQZVmeGxrJmOeZLX9Vtskbsi6Ji%2Ffxkz2OhsbfXMlYrSJRzT6XasZxwYS%2BllOL9ifgOBKN3PiMBSLs%2FVSVGFGK1YQpAxf8%2BMwZ7B66OLcCi3v7vIr0jXTNLD7pff6TiUOiH2MqjVVn6SkoitEHWaL7a6hhzNHuntMm71nlAeSxbDqOjhyG1IKTnQhfE7h7x3%2BO9XuU2JHV4SWkLAjDaxsLJBjqkAYpLMrsKbzc%2F9dSK%2FnlHQo6QDTfKL0B4zdArTnplD2VYbjMndX5n2Vj7LUMQflP0NVibnMrhVKtpXvKgmle6KSNRh1%2FvHyDS%2BB9J59wv%2B0xq26b7FVsJqukuBlseUhp5P519fbi4hA4erpv%2FPKFEKe2GJzbbA4fPQq%2Fc2SMf%2BjsZQ4h2xJu4lMaXDa1odm5AeDUc1E6TbeyQz3nBqwuxjM6J00Bx&X-Amz-Signature=a8951f29c543b30cdbaa0c1469426a05d5676a9e73cf4a648ee2adcc0eb2da73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/3cf0d1ef-3cd1-433d-ace9-502a2061d49b/8bd66c4f-be6a-4ce6-963e-a632a4f5176a.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB46655TDK25A%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220113Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQC1s3TrC%2F51jnleAvdWI%2FzDCqk72nZ7zM%2FYsVWskL6UMgIhAMCK7SlcpSgJHi9rgrmvcQWnKyaXIcsY0wwPtrCYu%2B0FKv8DCDYQABoMNjM3NDIzMTgzODA1IgwwNgBbnNNf4mpNf94q3APeAkbC6ccBev8uwp1HdKbdIp2kmwtdqjnH3W%2FqejuloCoPyBbzeC9zlJ7Jl8Pk3jhk2IZSTVPBdvJFjv%2BeF4rsp8Jzz1QClJoqdJJUF2fYTZMBbZ7MSzLsMmlTKTysHEic9F49PGExSt0DKQcGyU%2FBnn251%2Bmh1RBSLwH1cgQpcuGOHmBc8v2HIsGOeCyd0oqTyWpDwhZc35fQFGmssHI2pE%2F85MbRg1D0IoPHE7r4LzOLDaohBALE16GNFEf0y%2BkOsTBWvEAu7l49yuoesxFBQlK%2BHA%2FYaRlhiRLcKLl4lNZLmxSlIvTVQP41k0yb%2BnL6L5By3Yry2AXeELyaOF1aqJm0je2sYqTeo8M0mUfL5bXODySaKHZfyTS4BaVPYeOJhXm9eThDrnyosuFccQXW0HTPMHbeOfcLSFCRWcV9XVQZVmeGxrJmOeZLX9Vtskbsi6Ji%2Ffxkz2OhsbfXMlYrSJRzT6XasZxwYS%2BllOL9ifgOBKN3PiMBSLs%2FVSVGFGK1YQpAxf8%2BMwZ7B66OLcCi3v7vIr0jXTNLD7pff6TiUOiH2MqjVVn6SkoitEHWaL7a6hhzNHuntMm71nlAeSxbDqOjhyG1IKTnQhfE7h7x3%2BO9XuU2JHV4SWkLAjDaxsLJBjqkAYpLMrsKbzc%2F9dSK%2FnlHQo6QDTfKL0B4zdArTnplD2VYbjMndX5n2Vj7LUMQflP0NVibnMrhVKtpXvKgmle6KSNRh1%2FvHyDS%2BB9J59wv%2B0xq26b7FVsJqukuBlseUhp5P519fbi4hA4erpv%2FPKFEKe2GJzbbA4fPQq%2Fc2SMf%2BjsZQ4h2xJu4lMaXDa1odm5AeDUc1E6TbeyQz3nBqwuxjM6J00Bx&X-Amz-Signature=a8951f29c543b30cdbaa0c1469426a05d5676a9e73cf4a648ee2adcc0eb2da73&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- **MLMM (Multimodal Learning with Missing Modality) **: Modality missing 문제 해결책
- **MLFM (Multimodal Learning with Full Modality)** : MLMM과 대조되는 모든 modality set 사용하는 방법


### Challenge

- train/test 중에 사용 가능한 modality 수에 관계없이 정보를 dynamic하게 handle/fusion
- Full modality sample 성능과 유사 성능 유지


### Domains

- information retrieval
- remote sensing
- robotic vision
- medical diagnosis
- sentiment analysis
- multi-view clustering

---


---



## Method


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/66502228-d1b0-4790-b025-23bcc5f96d18/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466ZOUJZEWQ%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220112Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJIMEYCIQCNEf8Nk75%2FIeXgtsn%2FAm6At9QjEQe4Q4mi78eLpJaIWQIhAKGCtTHMXemGTU6ZHgEIcDe50JaeCE0kiUaKcuk46qBLKv8DCDYQABoMNjM3NDIzMTgzODA1Igyka%2BM7c12869nyF%2BQq3AMI%2B1gUu3yK%2BVW8L0tJLoJAHazZaFAOOATgXq7M7xJf4Igv0Zs6bWmUQTqXC166uyD7%2BpdYo%2B7jVoi4zauOeVczrGXH%2B0hA1OM5HksSfx%2B7Fx1IQRSQkzqYpv45wlv26MUUKiHsxduYiAOUNPa933CcRBay2KT2EVFH2B865slhbnvxtQUba4UWGsuGQixJpHMkKQFXZXdbvOjgurS279hoAUUbMJjIF4tmV9acyMxz%2B9d1jG2XdV%2FgFQVca2UQpboGMPAJmbnEF8SclWn2jlx7p3kQ82%2FmuDqxYfCEUFtn0DnnbPUmQzxRd9RvHCVFMLA6mcmvGiTtaZZ%2BbbcyjmLWS%2BXPhJx4bQ2I98%2BFkiFjdxXCdxanuM%2BhQSSC9SzR8t2jcpsuv31BnEEsqJp0v1FQPUP7AhRQ4Lap9c%2FYjRtgVlGe5sQA1WPenbfGUz21iOiFqKa315Q4I9ECN9%2FudUDXI1zTZB0DUB5ga6ra4pC7LDdYZ2CscZmAaLtfoVgCqFIS7CIhy4x5EyQqRhkRlRm1LDwfmXfM%2FPejHn3LHYge1HV1caitgIvJMkDg7MsR97Rv1OFK0t5ed9D2Cq61PboF8vJbWhdy%2B6I%2B7bNCQ53XjgxZ%2Fgfnow5WpcQ%2BvzDcxsLJBjqkAc%2FFDNiYdA2veGVWHqVqIe3g67ezd0ldf%2FudtEp7%2FROvbxBbo8LVlMXw9hhCwIfckVp2Y%2FTf1SC56kgpGoUb%2FUYWZlABWthRfBbKWd0MPEhO1nOBu4hKD5q6PW%2FqhJlxRUZ9LZDcONomFKec1X04iTYWj4eylXhalE%2FDz3DN%2B%2BWMX8s2r3dQug5s0%2B4VBnetK3qmxlye3d2vUiNbMlr6wm9iO6cu&X-Amz-Signature=d3ea9d3121c6cb712c671258059edc5b379187ed914061b786e0faf610fbbe47&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)



### Data Processing Aspect


Model의 data processing 방법(시점)에 중점



#### **Modality Imputation**


modality data level에서 missing 처리, missing data 자체를 imputation


_→ modality missing을 정확히 imputation한다면 full modality로 간주_


	**Missing compositing** : 합성

	- `Zero/Random value composition`

		<span class="notion-red">_→ dataset의 다양성 줄임_</span>

	- `Retrieval-based composition` : 유사 분류의 sample에서 데이터 copy / average (KNN)

		<span class="notion-red">_→ pixel-level task에 부적합, KNN의 경우 cost가 높고 불균형 data에 민감_</span>


	**Missing generating** : GAN, Diffusion 통해 missing modality 생성

	- `Individual modality generation` : modality 별 생성 model 학습
	- `Unified modality generation` : 전체 modality 생성 가능한 model 학습

		<span class="notion-red">_→ 고품질 생성 한계, cost 높음_</span>



#### **Representation-Focused Models**


representation level에서 missing 처리


	**Coordinate representation **: 다른 modality의 representation를 semantic space에 align

	- `Regularization`
	- `Correlation`

		→ 두 개 또는 세 개 modality 사용시 성능 높음


	**Missing compositing**

	- `Retrieval-based composition` : 유사 sample의 feature 이용
	- `Arithmetic operation-based representation composition` : 비학습 방식, 단순 pooling 등

	**Missing generating**


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZUBCGXM%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCeIuWmqchBMks%2FMnRRhRTqZIZt2TKIKrMB2rwUgZpbTAIgf%2FQ8qkhXgQICDhGP7U8sGNWEQP5muYx9YSCFXfxYBkwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDN4x6ascEh%2BK6HvZhCrcA%2FyN5kOKyeIZDXB15ch2MYCodPJsB9OHKCMzggnTLohYjpqQiNaLBmK7coviuhKq1UnUVuw3TFSZrgy3flvfpPrCk%2Fcxhfl4KAgROBTom4pxO58W%2BckZoufZlsc3Looojc4eUuBHZfkqcxjWEI7DNMVUfk7DC2DitqnVzUQQ9tj%2FHJxkhym4005DTXLzL4tn%2F9joWwEzxYvVPswJGNQB04HuWSUfzJmEo1cFaU1ldgDY0DX5HEObtPywjgOfYA7l2SuXef6yPuLYAal0YPtMAtaEIfo0Ptc1KKdzbaxycaSOFbySJmtWU6MIkrqgpI3qPtZGO22j2OAr69G0QegaTzK65bFpeowp%2BvxTLfYlmINSrQcT20znulE0wdeeHnofACtpF0Nafg2z6PNjILC%2BoDRETlpBR2yPODohoOU6wSwmyMjpX610kmrCYMm52CC390vFPU0dFzxuNw0JP7VqfhVzbrqFLjOkFHxegnB8vudCzZ5sPwFNK3lrmhdQsQ6sviNKjVizISM%2FBGB3lNnMmFScsh%2BGAYqthyhrxsYAVixZ8ADDeFlR6UbhWEjLxqDWR607iwUgM5an0xn2xZiVg9dGCQ9F1%2BMH%2BkSmLXcQ6gjzcwers2tQq1vHaFOGMLvGwskGOqUBE7scajDwP9ZGDSs2F%2BH4sglZ1QLRzm3W0XEJ%2FGF6TFa%2Bp9B33afQlZ0GitOkiDilGRk81HXNWkhHg%2F1QxYqvAbxJVnhs3WFiJS6DVGC7yp3%2BPbHAa%2BtinpxGcwxqSSgjef45MsWE3ws%2B2A8sG1LS1jP4HFQvFQsJWDI9mD48ATFvJOl%2FwkHb1Fy6To6JBdX9Cvw6Tt6QtnoCG%2FE6DUNQnzCZjy4c&X-Amz-Signature=46f3e27ad543c9185c5f3b2b003da0cbc33d51b9430b2398f6fc7b4659e5cdbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)


![](https://prod-files-secure.s3.us-west-2.amazonaws.com/542b861c-36a8-4051-84e5-8804b6728dba/5116ca66-ded0-4dc2-a7ae-a5bcb44bb6c3/image.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=ASIAZI2LB466QZUBCGXM%2F20251203%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20251203T220116Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEG0aCXVzLXdlc3QtMiJHMEUCIQCeIuWmqchBMks%2FMnRRhRTqZIZt2TKIKrMB2rwUgZpbTAIgf%2FQ8qkhXgQICDhGP7U8sGNWEQP5muYx9YSCFXfxYBkwq%2FwMINhAAGgw2Mzc0MjMxODM4MDUiDN4x6ascEh%2BK6HvZhCrcA%2FyN5kOKyeIZDXB15ch2MYCodPJsB9OHKCMzggnTLohYjpqQiNaLBmK7coviuhKq1UnUVuw3TFSZrgy3flvfpPrCk%2Fcxhfl4KAgROBTom4pxO58W%2BckZoufZlsc3Looojc4eUuBHZfkqcxjWEI7DNMVUfk7DC2DitqnVzUQQ9tj%2FHJxkhym4005DTXLzL4tn%2F9joWwEzxYvVPswJGNQB04HuWSUfzJmEo1cFaU1ldgDY0DX5HEObtPywjgOfYA7l2SuXef6yPuLYAal0YPtMAtaEIfo0Ptc1KKdzbaxycaSOFbySJmtWU6MIkrqgpI3qPtZGO22j2OAr69G0QegaTzK65bFpeowp%2BvxTLfYlmINSrQcT20znulE0wdeeHnofACtpF0Nafg2z6PNjILC%2BoDRETlpBR2yPODohoOU6wSwmyMjpX610kmrCYMm52CC390vFPU0dFzxuNw0JP7VqfhVzbrqFLjOkFHxegnB8vudCzZ5sPwFNK3lrmhdQsQ6sviNKjVizISM%2FBGB3lNnMmFScsh%2BGAYqthyhrxsYAVixZ8ADDeFlR6UbhWEjLxqDWR607iwUgM5an0xn2xZiVg9dGCQ9F1%2BMH%2BkSmLXcQ6gjzcwers2tQq1vHaFOGMLvGwskGOqUBE7scajDwP9ZGDSs2F%2BH4sglZ1QLRzm3W0XEJ%2FGF6TFa%2Bp9B33afQlZ0GitOkiDilGRk81HXNWkhHg%2F1QxYqvAbxJVnhs3WFiJS6DVGC7yp3%2BPbHAa%2BtinpxGcwxqSSgjef45MsWE3ws%2B2A8sG1LS1jP4HFQvFQsJWDI9mD48ATFvJOl%2FwkHb1Fy6To6JBdX9Cvw6Tt6QtnoCG%2FE6DUNQnzCZjy4c&X-Amz-Signature=46f3e27ad543c9185c5f3b2b003da0cbc33d51b9430b2398f6fc7b4659e5cdbf&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject)

- `Indirect-to-task representation generation` : 
modality 학습 시 decoder도 함께 학습, missing에 대해 decoder로 representation 생성
- `Direct-to-task representation generation` : 
가용 modality의 representation으로 missing modality의 representation 생성하는 model 학습


### Strategy Design Aspect



#### **Architecture-Focused Models**


train/inference 단계에서 사용 가능한 modality에 adaptive하도록 설계


	**Attention-based**

	- `Attention fusion` : modality 내 또는 intra modality 에서의 attention fusion

		<span class="notion-red">_→ missing modality 의 정보는 실제 fusion 과정에서 무시, 존재하는 modality로 representation을 잘 만들기 위한 목적_</span>


	**Transformer-based**

	- `Joint representation learning` : modality encoder 의 출력을 transformer 기반의 fusion model에 전달
		- missing modality를  masking처리
	- `Parameter efficient learning` : Full modality sample들로 학습 후 누락 modality sample들로 LoRA 등 추가해 학습

	**Distillation-based** : full modality sample로부터의 distillation / model 내의 branch 통한 distillation

	- `Representation-based` : full modality로 학습된 teacher model로 missing modality로 학습되는 student model 지도
	- `Process-based`
	- `Hybrid` 

	<span class="notion-red">_→ teacher model의 학습 시 결국 full modality 요구_</span>


	**Graph Learning-based**

	- 각 modality `공통 space에 mapping`
	- 가용 modality를 dynamic하게 연결하는 `hyper edge` 도입
	- `graph attention` 

**MLLM **: LLM이 feature processor 역할, encoder feature 통합.



#### **Model Combinations**


architecture 또는 학습 방법을 통해 해결


	**Ensemble** : encoder 결합


	**Dedicated training** : train method 중심


	**Discrete scheduler** : LLM이 controller 역할을 해 task에 따라 적절한 module 선택


---


---


> 💡 <span class="notion-red">최근 MLMM task에 대한 연구가 늘어나고 있고 특히 의료나 비디오 등의 분야에서 주목받고 있는 듯 하다. GAN과 같은 generative model을 이용한 modality imputation 시도와 Auto encoder를 이용한 representation 단에서의 imputation이 주를 이루는 것 같다. Fusion이나 train method를 이용한 시도도 등장하고 있으나 조금 더 연구가 필요해 보인다.</span>

